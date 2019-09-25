# BitZone – React online store
A complete e-commerce Project, employing the lastest MERN Stack technologies.

## Built With

- **Back-end:** Node. Js, Express.js, Passport.js, MongoDB, Mongoose, GridFSBucket, Multer, JSON Web Tokens, Nodemailer, EJS, bcrypt, nconf, custom-env and a lot more…

- **Front-end:** React.js, React-Router, Redux, React-Actions, Redux-Thunk, React-Bootstrap, Styled-Components, React-Fontawesome, Immutable, Reselect and other Libraries…

## Getting Started

Please clone the Project to get a local copy on your machine.

### Installing dependencies:

#### - **SERVER:**

Inside the project folder:

```
cd server
npm install
```

#### - **CLIENT:**

Inside the project folder:

```
cd client
npm install
```

### API Configuration:

It's important to adjust the API setting options according to your business, so you have to edit the config.json file located in the /server folder.

Important: The setting "App_Base_Url" must be set to "http://localhost:4000" if you are running the client in development mode, but in production mode it must be set to the app URL ("http://localhost:3000" if you build the client and open in the local browser). That setting is used by the server to build the links atached on emails sent and other functionalities.

## Running

#### SERVER:

```
cd server
npm start
```

#### CLIENT:

- #### Running in development mode (webpack dev-server on port 4000)

Remember to set "App_Base_Url" in the config.json file on the server to the value "http://localhost:4000", before you run the client.

```
cd client
npm run client
```

## Build (Client)

Remember to set "App_Base_Url" in the config.json file on the server to the value "http://localhost:3000" or the app URL, before you run the client.

```
cd client

npm start
```
Now you can open your browser and type the App URL.





