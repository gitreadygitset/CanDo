require 'rails_helper'

feature 'user signs out' do
  
  scenario 'authenticated user signs out' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Username', with: user.username
    fill_in 'Password', with: user.password

    click_button 'Log in'

    expect(page).to have_content('Sign Out')

    click_link 'Sign Out'
    expect(page).to have_content('Welcome')
  end

  scenario 'unauthenticated user attempts to sign out' do
    visit '/'
    expect(page).to_not have_content('Sign Out')
  end
end
