require 'csv'
require 'fileutils'
require 'byebug'
require 'active_support'
require 'active_support/core_ext'

file_path = ARGV[0]
output_path = ARGV[1]

exit unless file_path && output_path

class FileWriter
  HEADER_DIVIDER = '---'.freeze
  attr_accessor :file
  attr_accessor :headers
  attr_accessor :md

  def initialize(file, md)
    self.file = file
    self.md = md
  end

  def write
    write_header
    write_content
  end

  def write_header
    file.puts HEADER_DIVIDER
    md.headers.each do |header|
      file.puts header
    end
    file.puts HEADER_DIVIDER
  end

  def write_content
    file.puts "\n" + md.content
  end
end

class Markdown
  attr_accessor :post_date
  attr_accessor :post_modified
  attr_accessor :post_title
  attr_accessor :post_name
  attr_accessor :thumbnail
  attr_accessor :category_list
  attr_accessor :post_content

  CATEGORY_SEPARATOR = '::::'.freeze
  HEADER_KEYS = %i[template_key title slug description created_at updated_at thumbnail categories].freeze

  def initialize(params)
    attributes = params.to_h.symbolize_keys
    self.post_date = attributes[:post_date]
    self.post_modified = attributes[:post_modified]
    self.post_title = attributes[:post_title]
    self.post_name = attributes[:post_name]
    self.thumbnail = attributes[:thumbnail]
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
    ['/', date.year, zero_pad(date.month), zero_pad(date.day), post_name].join('/')
  end

  def path
    [base_path, filename].join('/')
  end

  def filename
    date = Time.parse(post_date)
    [date.strftime('%Y%m%d'), post_name + '.md'].join('_')
  end

  def base_path
    date = Time.parse(post_date)
    [date.year, zero_pad(date.month)].join('/')
  end

  def content
    post_content.gsub("\r\n", "\n")
  end

  def description
    post_content[0..300]
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
  dir_path = output_path + md.base_path
  new_file_path = output_path + md.path
  puts '-----------> write file ..'
  puts "-----------> #{new_file_path}"
  FileUtils.mkdir_p(dir_path)
  File.open(new_file_path, 'w') do |file|
    fw = FileWriter.new(file, md)
    fw.write
  end
end

puts "######### end  ##########"

