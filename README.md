# api
All api related files for the karmakurier project

# Running

To run the API locally, first install needed dependencies
```
npm install OR yarn install
```

Then run the API as follows
```
# Windows
set JWT_SECRET=<yoursecret>
set MONGODB=mongodb://<url>
set NODE_ENV=development
set MONGODB=mongodb://localhost:27017/karmakurier-01
npm start
# Linux/MacOS
export JWT_SECRET=<yoursecret>
export MONGODB=mongodb://<url>
export NODE_ENV=development
export MONGODB=mongodb://localhost:27017/karmakurier-01
npm start
```


