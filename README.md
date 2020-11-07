# karmakurier API
All api related files for the karmakurier project

# Running
To be able to run the backend locally, you will need these things:
- MongoDB (running locally or at any server)
- Node.JS Runtime

1. Install needed dependencies
```
npm install OR yarn install
```

2. Configure the API
The following configuration properties have to be configured to use the API.
```
# Windows
# sets JWT Secret to be used for token generation
set JWT_SECRET=<yoursecret>
# sets MONGODB Connection String
set MONGODB=mongodb://<url>
# sets SQL Connectionstring
set SQL_CONNECTION_STRING=postgresql://
# set the environment. For dev: chooses sqlite for local development and enables seeding. Details see `seed/seed_dev.js`
set NODE_ENV=development

# If you are on MAC, use those
export JWT_SECRET=<yoursecret>
export MONGODB=mongodb://<url>
export NODE_ENV=development

```

3. Run the API as follows
```
npm start
```

## Documentation
See `docs` folder. For now there is a swagger file. This will be included in JSON format later to Backend and will be available at `/api-docs`


