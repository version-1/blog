require 'csv'
require 'fileutils'
require 'byebug'
require 'active_support'
require 'active_support/core_ext'
require 'open-uri'

file_path = ARGV[0]
output_path = ARGV[1]

exit unless file_path && output_path

class Downloader
  attr_accessor :input
  attr_accessor :output

  class << self
    def save(url, output)
      path = [File.dirname(output), '/thumbnail', File.extname(output)].join('')
      File.open(path, 'wb') do |file|
        puts url
        URI.parse(URI.encode(url))
        open(URI.encode(url)) do |data|
          file.write(data.read)
        end
      end
    end
  end
end

class FileWriter
  HEADER_DIVIDER = '---'.freeze
  attr_accessor :file
  attr_accessor :headers
  attr_accessor :thumbnail
  attr_accessor :content

  def initialize(file, md)
    self.file = file
    self.headers = md.headers
    self.content = md.content
    self.thumbnail = md.post_thumbnail
  end

  def write
    write_header
    write_content
    write_images
  end

  def write_header
    file.puts HEADER_DIVIDER
    headers.each do |header|
      file.puts header
    end
    file.puts HEADER_DIVIDER
  end

  def write_content
    file.puts "\n"
    content.transformed.each do |line|
      file.puts line.gsub("\r\n", "\n")
    end
  end

  def write_images
    images = content.images || []
    (images + [thumbnail]).each do |url|
      output = File.dirname(file) + '/' + File.basename(url)
      Downloader.save(url, output)
    end
  end
end

class Content
  attr_accessor :content
  attr_accessor :images

  def initialize(content)
    self.content = content
    self.images = []
  end

  def transformed
    lines = content.split("\n")
    lines = parse_image_tags(lines)
    transform_precode_tag(lines)
  end

  # imageの取得
  def parse_image_tags(lines)
    lines.map do |line|
      m = line.match(/<img.+src=\"(?<src>http.+ver-1-0\.net\/wp-content\/uploads.+(png|jpg|jpeg|gif))\".+>/)
      if m.present?
        self.images << m[:src] # parseしたイメージを保存
        filename = m[:src].split('/').last
        image = './' + filename
        "<img class=\"post-image\" src=\"#{image}\" alt=\"#{filename}\"/>"
      else
        line
      end
    end
  end

  # <pre><code></code></pre>の変換
  def transform_precode_tag(lines)
    lines.map do |line|
      m = line.match(/<pre><code class=\"language-(?<lang>.+)\">/)
      transformed_line = line
      if m.present?
        transformed_line = transformed_line.gsub(/<pre><code class=\"language-.+\">/, "```#{m[:lang]}\n")
      end
      transformed_line = transformed_line.gsub(/<pre><code>/, "```\n")
      transformed_line = transformed_line.gsub(/<\/code><\/pre>/, "\n```")
      transformed_line = transformed_line.gsub(/&gt;/, '>')
      transformed_line.gsub(/&lt;/, '<')
    end
  end

end

class Markdown
  attr_accessor :post_date
  attr_accessor :post_modified
  attr_accessor :post_title
  attr_accessor :post_name
  attr_accessor :post_thumbnail
  attr_accessor :category_list
  attr_accessor :post_content

  CATEGORY_SEPARATOR = '::::'.freeze
  HEADER_KEYS = %i[template_key title slug created_at updated_at thumbnail categories].freeze

  def initialize(params)
    attributes = params.to_h.symbolize_keys
    self.post_date = attributes[:post_date]
    self.post_modified = attributes[:post_modified]
    self.post_title = attributes[:post_title]
    self.post_name = attributes[:post_name]
    self.post_thumbnail = attributes[:thumbnail]
    self.category_list = attributes[:categories]
    self.post_content = attributes[:post_content]
  end

  def headers
    HEADER_KEYS.map do |key|
      "#{key.to_s.camelize(:lower)}: #{send(key)}"
    end
  end

  def template_key
    'blog-post'
  end

  def title
    post_title.gsub(/\[/, "\\[").gsub(/\]/, "\\]").gsub("\【", "\\[").gsub("\】", "\\]")
  end

  def created_at
    post_date
  end

  def updated_at
    post_modified
  end

  def categories
    body = category_list.split(CATEGORY_SEPARATOR).map do |category|
      "  - #{category}"
    end
    "\n" + body.join("\n")
  end

  def slug
    date = Time.parse(post_date)
    '/' + [date.year, zero_pad(date.month), zero_pad(date.day), post_name].join('/')
  end

  def path
    [base_path, filename].join('/')
  end

  def filename
    date = Time.parse(post_date)
    [date.strftime('%Y%m%d'), post_name].join('_')
  end

  def base_path
    date = Time.parse(post_date)
    [date.year, zero_pad(date.month)].join('/')
  end

  def content
    Content.new(post_content)
  end

  def thumbnail
    './thumbnail' + File.extname(post_thumbnail.split('/').last)
  end

  private

  def zero_pad(str)
    str.to_s.rjust(2, '0')
  end
end

puts "file_path : #{file_path}"
puts "output_path : #{output_path}"

mds = []
CSV.foreach(file_path, headers: true) do |row|
  mds << Markdown.new(row)
end

puts "-----------> load #{mds.length} files .."

mds.each do |md|
  new_post_dir = output_path + md.path
  puts '-----------> write file ..'
  puts "=> #{new_post_dir}/"
  FileUtils.mkdir_p(new_post_dir)
  File.open(new_post_dir + '/index.md', 'w') do |file|
    fw = FileWriter.new(file, md)
    fw.write
  end
end

puts "######### end  ##########"

