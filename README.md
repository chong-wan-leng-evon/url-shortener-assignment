# Tech Assignment - Build a URL Shortener

1. Develop a back-end (REST / HTTP API) server which:
a. returns a short URL when given a specified URL
b. looks up or redirects to the specified URL when given a short URL
2. Develop a simple front-end (website / application) which allows users to easily create
new shortened URLs.

### Examples
● Request - Shortened URL: `http://{{server}}/a1b2c3d4`

● Response - Original URL: `https://developer.gov.sg/`

# Getting Started
- Using GitHub Desktop
  - Press on the "code" button (in green) to locate and copy the HTTPS url of this repository
  - Within GitHub Desktop application, locate "Add" button -> "Clone repository" button. Provide the HTTPS url under the "url" tab and choose a local path to clone the project into and press on the "clone" button to clone it.

- Without the use of GitHub Desktop
  - Press on the "code" button (in green), then press on the "download zip" button
  - Choose a local path to save the project into
 
# Prerequisites
- MySQL Workbench: Download ([https://www.postgresql.org/download/](https://dev.mysql.com/downloads/workbench/)
    - Follow the installation flow
    - Create a new connection with the following configurations
      - HOST: "127.0.0.1"
      - PORT: "3306"
      - USER: "root"
      - PASSWORD: "!!nEg{OS__j4N7m,!,Q]"
     
    - Create a new schema named "url_shortener"
 
# Run the project
- Launch the source code in a text editor software of your choice
  
### Frontend
- In terminal
  - cd frontend/url-shortener
  - npm install
  - npm start
  - The browser will open up "http://localhost:8080/", if it does not open up browser and type in "http://localhost:8080/"

### Backend
- In terminal
  - cd backend
  - npm install
  - node server.js
