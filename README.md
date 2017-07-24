# Application Rest CRUD

## List of users routes:

|      **Route**     | **HTTP** |       **Description**         |
|--------------------|---------- |-------------------------------|
|  /api/signup  | POST | Sign up with new user info  |
|  /api/signin  | POST |  Sign in while get ac access token based on credentials  |
|  api/users  | GET  |   Get All the users info(admin only) |
|  /api/users/:id  | GET |  Get a single user(admin and authenticated user) |
|  /api/users/  | POST |  create users (admin only) |
|  /api/users/:id  | DELETE |  Delete User(admin only) |
|  /api/users/:id  |  PUT  |  Update a user with new info(admin and authenticated user) |

## Tech Usage
  * Node Js
  * Express Js
  * Postgres
  * Sequelize
  * Postman

## Usage
With only nodemon:
```
nodemon
```
Access the website via http://localhost:3000/users
