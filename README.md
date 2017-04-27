# pretzel
Greenfield Project for HackReactor

#### how to start
#### (not used anymore)
```shell
$ npm install
$ npm start
```

#### how to test
```shell
$ npm test
```

#### how to continuely complile when file changes
#### (not used anymore)
#### (we using this again for development)
```shell
$ babel . --out-dir src/static/compiled --presets=es2015,react --ignore=node_modules,compiled,server,spec,babel_cache,webpack.config.js,src/static --source-maps inline -w


#### use webpack instead of babel command
```shell
$ NODE_ENV=production node_modules/.bin/webpack --progress --watch
```

#### used to run the server
```shell
$ NODE_ENV=production node_modules/.bin/babel-node --presets react,es2015 src/server.js
```

#### steps to get nathan's updates working
```shell
npm install --save-dev webpack babel-loader@6.2.x http-server@0.9.x
```

###steps to get mysql working
```shell
brew install mysql

mysql.server stop (make sure you dont have one running)
mysql.server start
mysql -u root -p (blank password)

CREATE TABLE users (ID int NOT NULL, googleID VARCHAR(25), name VARCHAR(25), email VARCHAR(25), img TEXT, PRIMARY KEY (ID));

CREATE TABLE messages (ID int NOT NULL, userID int NOT NULL, text TEXT, time DATETIME, PRIMARY KEY (ID), FOREIGN KEY (userID) REFERENCES users(ID));

(schema.sql should do this for you, will end up removing these steps probably)

mysql -u root < src/schema.sql (runs sql file)
```
![Pretzel's Landing Page](https://www.dropbox.com/pri/get/Screenshots/pretezel-landingpage.png?_subject_uid=46753528&w=AADpOpDA_n-UBWxqrU6p2on81m6qXngtVG5uoMJvWBMP5Q "Landing Page")

![Pretzel's Login](https://www.dropbox.com/pri/get/Screenshots/pretzel-login.png?_subject_uid=46753528&w=AADVifVuBmCOFa_42gNAm9okLDquftpQhAql14NHCO1u8A "Login Page")

![Pretzel's Chat](https://www.dropbox.com/pri/get/Screenshots/pretzel-chat.png?_subject_uid=46753528&w=AADEenC67MY7Qct94O19ejgI1CaEM4hStbq-0HyWVdefkw"Chat Page")



