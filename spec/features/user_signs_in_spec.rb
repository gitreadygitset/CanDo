require 'rails_helper'

feature 'user signs in' do
  scenario 'specify valid credentials' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Username', with: user.username
    fill_in 'Password', with: user.password

    click_button 'Log in'

    expect(page).to_not have_content('Log in')
    expect(page).to have_content('Sign Out')
  end

  scenario 'specify invalid credentials' do
    visit new_user_session_path

    click_button 'Log in'
    expect(page).to have_content('Invalid Username or password')
    expect(page).to_not have_content('Sign Out')
  end
end
