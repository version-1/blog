require 'byebug'
require 'fileutils'
require 'active_support'
require 'active_support/core_ext'

dir = ARGV[0]

list = %w[
  after_intro
  adsense_double_rect
  adsense
  mid_article
]

puts 'start:'
files = Dir.glob(dir + '**/*.md')

files.each do |file|
  tmp = file + '.tmp'
  File.open(file) do |f|
    puts 'file:' + file
    File.open(tmp, 'w') do |ff|
      f.each do |line|
        regexp = /\[(?<class_name>.+)\]/
        str = line.match(regexp)
        if str && list.include?(str[:class_name])
          puts 'hit:' + line
          class_name = str[:class_name].tr('_', '-')
          ff.puts line.gsub(regexp, "<div class=\"#{class_name}\"></div>")
        else
          ff.puts line
        end
      end
    end
  end

  FileUtils.rm(file)
  FileUtils.mv(tmp, file)
end

puts 'end:'
