# Simple CRUD-API

Task is [here](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md).

## How to download

```
git clone {repository URL}
```

## How to install NPM modules

```
npm install
```

## How to run the application

Run the application in development mode

```
npm run start:dev
```

Run tests scenarios for API

```
npm run test
```

Run the application in production mode

```
npm run start:prod
```

## PORT

Value of `port` is stored in `.env` file, so you can change it if you want.

## API

Implemented endpoint: `api/users`

`GET api/users` - get all users

`GET api/users/${userId}` -  get user by id (uuid)

`POST api/users` - post new user

`PUT api/users/${userId}` - update existing user

`DELETE api/users/${userId}` - delete existing user from database

## User fields

`username` — (string, **required**)

`age` — (number, **required**)

`hobbies` — (array of strings or empty array, **required**)