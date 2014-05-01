require_relative '../spec_helper'

describe 'Visiting the site fresh' do
  before :each do
    visit '/'
  end

  it 'should have a title screen' do
    expect(find('#title').visible?).to be_true
  end

  it 'should not show the game screen' do
    expect(find('#screen', :visible=>false).visible?).to be_false
  end

  it 'should have a START button' do
    expect(page.has_link? "START").to be_true
  end

  it 'should NOT have a QUIT button' do
    expect(page).to_not have_selector('div#quit-button', :visible=>true)
  end

  it 'should NOT have a command bar' do
    expect(page).to_not have_selector('div#command-bar', :visible=>true)
  end
end