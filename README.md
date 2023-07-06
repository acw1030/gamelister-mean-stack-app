# GameLister MEAN Stack Application
<img src="https://github.com/monowarden/gamelister-mean-stack-app/blob/8bd5eb9f7561584a15638801addd18f9cc7a2001/screen0.png" width="450"><img src="https://github.com/monowarden/gamelister-mean-stack-app/blob/8bd5eb9f7561584a15638801addd18f9cc7a2001/screen1.png" width="450">

"GameLister" is a simple web application that was created for a university project. This application supports multiple user roles, data types, and makes calls to a third-party API.

## Usage
Users are able to browse a database of video games and view detailed information. Registered users may add games to custom user-created lists.

## Testing Notes
- Login for the test administrator account is `email: admin@test.com` and  `password: password`.
- Administrators have a different settings panel than regular users.
- Use the server endpoint `/api/init` to completely initialize database.

## RAWG API
This project uses the RAWG API to populate a database of video games. More details can be found [here](https://rawg.io/apidocs).
