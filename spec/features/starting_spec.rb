require_relative '../spec_helper'
require 'pry'

describe 'Visiting the site fresh' do
  it 'should have a START button' do
    visit '/'
    expect(page.has_link? "START").to be_true
  end
end