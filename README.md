# tech-blog-ms

## Table of Contents
-[Description](#description) 
-[Installation](#installation) 
-[Usage](#usage)
-[License](#license)
-[Contributing](#contributing) 
-[Tests](#tests) 
-[Questions](#questions) 
-[Depolyment](#depolyment)

## Description of the Project
The purpose of the application is to build the front and backend of the tech blog. This dynamic application allows users to read the latest tech blogs, and add a blog of their own. However, to read and post a blog, the user must be logged in. Using middleware, the application checks to see if the user has logged in. Not only can the user login, but they can logout when they are done reading/posting blogs and commenting on other blogs. In addition, users can create blogs and comment on other blogs, where the comments will render on under the blog.This application can dynamically complete the following HTTP requests: get, post, put, and delete for blogs and post new comments. This application uses Node.js, MYSQL, DotEv and Express to run the application. Dotev is used to protect developer's passwords by placing their passwords in environment variables in .env file. This application requires you to understand package.json and its node_modules. In additon to that, gitignore file is important to use so certain folders and files are not upload to GitHub. For example, node_modules should not be uploaded to GitHub since this folder gets created during the installition process. Lastly, this project stands out since the application has its own server and can effectively retrieve data from the blog database.

## Installation
To create this project, follow these several steps. This application uses Node.js, MYSQL2 (version 2.3.3), dotev (verison 16.0.3), bcrypt (version 5.1.0), connect session sequelize (version 7.1.5), express handlebars (verison 6.0.6), express session (verison 1.17.3), and Express (verison 4.18.1). Step one, download Node.js. Next go to the terminal of the index.js and type this command ```npm install```. This creates package.json file and its dependencies. 


## Usage
To use this application, open the terminal, respective to the file. Run the ```node seeds/seed.js``` to populate the data tables with its respective seeds. Finally, type this command in the terminal ```nodemon server.js``` to run the application. This allows the user to perform any HTTP method on blogs, user, and comments..

This is what the index.html will look like when deployed.

![Tech Blog mock-up](./assets/images/)

## License
This application does not require any licenses.

## Contributing
If you would like to contribute to this project, please email me. My email can be found in the Questions section.

## Tests
Currently, there is no tests for this project.

## Questions

For more information about this application, please email me at melissastan91@gmail.com. Interested in my work? Checkout my GitHUb repositories. My GitHub username is mstan19, and here is my GitHub profile: https://github.com/mstan19.

## Depolyment
Click on this link for deployed application
https://github.com/mstan19/tech-blog-ms
