require_relative '../spec_helper'

describe 'Playing the game' do
  before :each do
    visit '/'
    click_link 'START'
  end

  it 'should not show the title screen' do
    expect(find('#title', :visible=>false).visible?).to be_false
  end

  it 'should show the screen' do
    expect(find('#screen').visible?).to be_true
  end

  it 'should NOT have a START button' do
    expect(page).to_not have_selector('div#start-button', :visible=>true)
  end

  it 'should have a QUIT button' do
    expect(page).to have_selector('div#quit-button')
  end
end