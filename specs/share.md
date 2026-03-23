# Share feature spec

The share feature is a way of sharing the result of the calculation.
The application should have a share button that once clicked a url should be copied to the user's clipboard encapsulating the state of the application.
As this is a SPA there's no DB transaction of publish and retrieval, instead the state of the app should be serialized in b64 encoded JSON and appended to the url as a param.

## global specs

- share button functionality
- clicking share should display success (or not) notification on click
- Application route /result/{b64jsonstate} should be implemented

## result page spec

- result page should be ephemeral therefore it shouldn't load state from localstorage like the index.
- if no path param is present display a message
- if path json is invalid or does not match the DTO display a message
- all inputs should be readonly. Hovering should display a message indicating the nature of the result page
- on the bottom of the form there should be a button for the user to start a new session (go to index) and another one to edit the result (save to localstorage and push to index). Pick proper wording for this.
- share button should still be present in the result page

## technical specs

- use `react-hot-toast` package for notifications
- implement runtime type check for decode encode using the typia package
- plan the commits ahead of time to structure them by functionality
