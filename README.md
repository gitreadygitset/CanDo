# About CanDo

CanDo is a tool for creating custom video-based teaching materials. Tailored particularly for making video models and video prompts to assist people with learning differences and disabilities in acquiring new skills. 

## Demo Site

The best way to see what it's all about is to visit [the Heroku site](https://can-do.herokuapp.com/users/sign_in). Create your own account, or log in with the following credentials to see some sample videos: 

- To see an "independent user" account:

*Username:* demo

*Password:* password

- To see a "supported user" account:

 *Username:* demo-supported
 
 *Password:* password

## Run CanDo locally

To set up CanDo on your machine:

You will need to have Ruby(v2.7.3), Rails, and PostegreSQL installed. 

1. Clone this repository
2. From your local repository, run `bundle install` in your CLI to install Ruby backend dependencies
3. Run `yarn` to install frontend Javascript dependencies
4. Run `bundle exec rake db:create` and then `bundle exec rake db:migrate` to set up the PostgreSQL database 
5. Start the rails server with `rails server`
6. In your browser, navigate to localhost:3000
7. Create a user account, upload a video, and see what you can do! (see use instructions and notes below).
 
## Technical notes

As of now, this CanDo reliably supports .mov and .mp4 video files encoded with the H.264 codec. Please encode any H.265/HEVC high-definition videos to the H.264 standard before uploading to ensure cross-browser compatibility. On an iPhone, change your camera > settings > formats option to "Most compatible" before taking your video. Or, use your computer's video processing tool to change your high-def file's encoding (on a Mac, right-click the file and choose "Encode selected video files").

Text-to-speech is available on browsers that support the Web Audio API. Please make sure your browser is up to date to use the text-to-speech feature. This feature is not supported on Safari versions prior to 14.5 (released April 2021). 

Please note that after hitting a video pause point one time on a video, you will need to refresh the page to hit it again (will not trigger if video playback time is manually reset.)

## Features coming soon

CanDo is designed to be small and easy to use, and everything you need to start making materials for your learners is ready to go! That said, there are still a few more exciting features in the works, including options to:
- Embed videos from an external source like YouTube
- Organize your videos by topic or learner, and search by title
- Use the site on small-screen mobile devices
- Activate and deactivate specific saved questions/pauses
- Add answer choices to questions


### Known Issues - fixes in progress for:
- Thumbnail capture for portrait-orientation videos. 
- File attachment field display does not clear after upload
- Form errors persist after closing the form, until page refresh
- When adding multiple timestamps at once to a video, user needs to click play several times to "clear" the previously added pause points before the video will resume playing. 
- User sees a blank stub page when manually entering the URL of a deleted video
    
### Miscellaneous

Icons provided by Font Awesome, per [license](https://fontawesome.com/license)

 [![Codeship Status for gitreadygitset/Breakable-toy](https://app.codeship.com/projects/287a9f55-522b-4afa-af54-b823b6ce68dc/status?branch=master)](https://app.codeship.com/projects/443301)
