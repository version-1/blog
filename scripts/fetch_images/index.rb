require 'csv'
require 'fileutils'
require 'byebug'
require 'active_support'
require 'active_support/core_ext'
require 'open-uri'
require 'nokogiri'

file_path = ARGV[0]
output_path = ARGV[1]

exit unless file_path && output_path

class Downloader
  attr_accessor :input
  attr_accessor :output

  class << self
    def save(url, output)
      File.open(output, 'wb') do |file|
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
  attr_accessor :dirname
  attr_accessor :headers
  attr_accessor :thumbnail
  attr_accessor :content

  def initialize(dirname, md)
    self.dirname = dirname
    self.headers = md.headers
    self.content = md.content
    self.thumbnail = md.post_thumbnail
  end

  def write
    write_images
  end

  def write_images
    content.parse
    images = content.images || []
    result = []
    thumbnail_path = [dirname, '/thumbnail', File.extname(thumbnail)].join('')
    Downloader.save(thumbnail, thumbnail_path)
    result << { before: thumbnail, after: thumbnail_path }
    images.each do |url|
      output = dirname + '/' + File.basename(url)
      Downloader.save(url, output)
      result << { before: url, after: output }
    end
    puts result
  end
end

class Content
  attr_accessor :content
  attr_accessor :images

  def initialize(content)
    self.content = content
    self.images = []
  end

  def parse
    lines = content.split("\n")
    parse_image_tags(lines)
  end

  # imageの取得
  def parse_image_tags(lines)
    lines.each do |line|
      m = line.match(/<img/)
      if m.present?
        dom = Nokogiri::HTML.parse(line)
        dom.css('img').each do |img|
          if img.attributes["src"].to_s.match(/^(https|http):\/\/ver-1-0\.net\/wp-content\/uploads/)
            self.images << img.attributes["src"].to_s
          end
        end
      end
    end.compact
  end
end

class Markdown
  attr_accessor :post_name
  attr_accessor :post_date
  attr_accessor :post_thumbnail
  attr_accessor :post_content

  HEADER_KEYS = %i[thumbnail].freeze

  def initialize(params)
    attributes = params.to_h.symbolize_keys
    self.post_date = attributes[:post_date]
    self.post_name = attributes[:post_name]
    self.post_thumbnail = attributes[:thumbnail]
    self.post_content = attributes[:post_content]
  end

  def headers
    HEADER_KEYS.map do |key|
      "#{key.to_s.camelize(:lower)}: #{send(key)}"
    end
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
    content ||= Content.new(post_content)
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
  fw = FileWriter.new(new_post_dir, md)
  fw.write
end

puts "######### end  ##########"

