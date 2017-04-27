# Pretzel
> Greenfield Project for HackReactor

## How to get started
> Run these commands from the root directory

1. $ npm install
2. $ npm install --save-dev webpack babel-loader@6.2.x http-server@0.9.x (sometimes this dependency does not install correctly)
3. $ brew install mysql
4. $ mysql.server stop (make sure you dont have one running)
5. $ mysql.server start
7. $ mysql -u root < src/schema.sql (runs sql file)

## To run the server
1. $ NODE_ENV=production node_modules/.bin/babel-node --presets react,es2015 src/server.js

## To compile the code
1. $ NODE_ENV=production node_modules/.bin/webpack --progress --watch

## UI Screenshots

**Landing page**
<img src='https://www.dropbox.com/pri/get/Screenshots/pretezel-landingpage.png?_subject_uid=46753528&w=AADpOpDA_n-UBWxqrU6p2on81m6qXngtVG5uoMJvWBMP5Q'/>

**Login page**
<img src='https://www.dropbox.com/pri/get/Screenshots/pretzel-login.png?_subject_uid=46753528&w=AADVifVuBmCOFa_42gNAm9okLDquftpQhAql14NHCO1u8A' />

**Chat page**
<img src='https://www.dropbox.com/pri/get/Screenshots/pretzel-chat.png?_subject_uid=46753528&w=AADEenC67MY7Qct94O19ejgI1CaEM4hStbq-0HyWVdefkw' />



