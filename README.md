# Techify system

Techify System is the platform where user can login, edit their profile data and admin can view user profile data and all users.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

* [Node.js 8.X](https://nodejs.org/en/download/)
* [PostgreSql](https://www.postgresql.org/download/)
** not required for development.
** Developers may choose to do this for convenience only.

## Database Setup

Create a user nikita: 
`createuser nikita`

Login into postgres as postgres user:
`sudo -i -u postgres psql`

Set password for nikita user:
`\password nikita`

Create Database:
`CREATE DATABASE techify;`

Grant privileges to nikita:
`GRANT ALL PRIVILEGES ON DATABASE techify TO nikita;`

Go to techify folder and Run database migrations and seeds:
`npm run db-migrate`

Go to techify folder and populate database seeds:
`npm run run-seeds`

## Start Server

Start the development server:
`npm start`
Start the server in debug mode:
`npm run debug`

Server is running at http://localhost:5000
For Swagger documentation, go to http://localhost:5000/api-docs


## Running lint

Verifying code style and practices.

`npm run lint`

Fix Lint issues

`npm run lint-fix`

This will verify that all code matches the lint guidelines.