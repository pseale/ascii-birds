require_relative '../spec_helper'
require 'pry'

describe 'Visiting the site fresh' do
  it 'should have a START button' do
    visit '/'
    expect(page.has_link? "START").to be_true
  end

  it 'should NOT have a QUIT button' do
    visit '/'
    #binding.pry

    expect(page).to_not have_selector('div#quit-button', :visible=>true)
  end
end