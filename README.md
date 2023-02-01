# Social Network API

## Description


This project provides backend functionality for a basic social networking application that just needs an HTML client interface.  The application allows multiple users to create accounts, to connect with friends, share thoughts, and comment on other people's posts.

This project is an exercise in implementing a NoSQL Database into a Model-View-Controller application structure with full CRUD capabilities and relationships between multiple document collections in the database to accommodate nested data structures.

I learned how to implement 3 of the 4 technologies in the MERN stack, using the Mongoose ODM package to combine MongoDB, with Node.js and Express.

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

- Clone the repository to a local computer running VS Code, Node.js, and MongoDB.
- Run 'npm install' to add dependencies.
- Run 'npm start' to start the application.
- Open a web browser and connect to 'http://localhost:3001/'

## Usage

Use an application such as Insomnia to perform CRUD operations on the database.  All URL paths in the following instructions are appended to the end of the URL "http://localhost:3001"

**Users**

- Create a user: submit a JSON-formatted POST request to `/api/users`

    `{
        "username": "YourName",
        "email": "youremail@yourdomain.com"
    }`

- Get all users: submit a GET request to `/api/users`
- Get one user: submit a GET request to `/api/users/userid` (enter the _id of the user)
- Update a user: submit a PUT request to `/api/users/userid`

    `{ 
        "username": "newUserName",
        "email": "newEmail@newDomain.com"
    }`

- Delete a user: submit a DELETE request to `/api/users/userid` (enter the _id of the user)

**Thoughts**

- Create a Thought: submit a JSON-formatted POST request to `/api/thoughts`

    `{
        "thoughtText": "user's thoughts here",
        "username": "username"
    }`

- Get all Thoughts: submit a GET request to `/api/thoughts`
- Get one Thought: submit a GET request to `/api/thoughts/thoughtId`
- Update a Thought: submit a JSON-formatted PUT request to `/api/thoughts/thoughtId`

    `{
        "thoughtText": "user's thoughts here"
    }`

- Delete a Thought: submit a DELETE request to `/api/thoughts/thoughtId`

**Friends**

**Reaction**

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    ```md
    ![alt text](assets/images/screenshot.png)
    ```

## License

[MIT License](LICENSE)




