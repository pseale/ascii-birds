#there is a lot of awfulness in this file
require_relative '../sinatra_app.rb'
require 'rspec'
require 'capybara/rspec'

RSpec.configure do |config|
  config.include Capybara::DSL 
  Capybara.default_driver = :selenium 
  Capybara.javascript_driver = :webkit

  Capybara.app = AsciiBirdsApp.new
end