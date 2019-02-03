require 'byebug'
require 'fileutils'
require 'active_support'
require 'active_support/core_ext'

dir = ARGV[0]

puts 'start:'
files = Dir.glob(dir + '**/*.md')
BASE_URL = 'http://ver-1-0.net.s3-website-ap-northeast-1.amazonaws.com/uploads'.freeze

files.each do |file|
  tmp = file + '.tmp'
  File.open(file) do |f|
    puts 'file:' + file
    File.open(tmp, 'w') do |ff|
      f.each do |line|
        path = '/' + file.gsub(dir, '')
        thumbnail_path = [File.dirname(path), '/thumbnail'].join('')
        _line = line.gsub(/\.\/thumbnail\.jpg/, thumbnail_path + '.jpg')
        _line = _line.gsub(/\.\/thumbnail\.png/, thumbnail_path + '.png')
        m = line.match(/<img.+src=\"(?<src>\.\/.+(png|jpg|jpeg|gif))\".+>/)
        if m && m[:src]
          puts 'hit:' + m[:src]
          after = _line.gsub(m[:src], [BASE_URL, File.dirname(path), '/', m[:src].gsub(/\.\//, '')].join(''))
          ff.puts after
          puts 'after:' + after
        else
          ff.puts _line
        end
      end
    end
  end

  FileUtils.rm(file)
  FileUtils.mv(tmp, file)
end

puts 'end:'
