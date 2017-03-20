// src/server.js

var path = require('path');
var { Server } = require('http');
var Express = require('express');
var React = require('react');
var { renderToString } = require('react-dom/server');
var { match, RouterContext } = require('react-router');
var routes = require('./routes');
var NotFoundPage = require('./components/NotFoundPage');
var controller = require('./controller/index.js');
var bodyparser = require('body-parser');
var request = require('request');
var parser = require('xml2json');


// initialize the server and configure support for ejs templates

const app = new Express();
const server = new Server(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// getTop20Trends(function(err, response) {
//   console.log(response);
// })

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));
app.use(bodyparser.json());
app.use(function(req, res, next) {
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('access-control-allow-methods', 'POST, GET, OPTIONS');
  res.setHeader('access-control-allow-headers', 'x-parse-application-id, x-parse-rest-api-key, Content-Type, Accept');

  //res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/messages', controller.messages.get);
app.post('/messages', controller.messages.post);
app.get('/users', controller.users.get);
app.post('/users', controller.users.post);
app.post('/results', controller.results.post);
app.get('/results', controller.results.get);

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes: routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

app.get('/trends', (req, res) => {
  console.log('>>>>>>>>>>>>>>trends request');
  request.get('https://trends.google.com/trends/hottrends/visualize/internal/data', function(req, res, data) {
    if (res.body) {
      var top20Trends = JSON.parse(res.body).united_states; // getting top 20 US google trends
      var options = {
        object: true,
        sanitize: true,
        trim: true
      };
      res.send(top20Trends);

      /*top20Trends.forEach(function(current, index) {
        request.get('https://news.google.com/news?cf=all&hl=en&pz=1&&q='+ current +'&ned=us&output=rss', function(req, res) {
          var feed = parser.toJson(res.body, options);
          if(index === 2) {
            //console.dir(feed.rss);
            //console.dir(feed.rss.channel.item);

            //////////////////////////////////
            //some reason this post isnt working but postman does
            // request({
            //   method: 'POST',
            //   uri: 'http://127.0.0.1:3000/results',
            //   multipart: [
            //     {
            //       'content-type': 'application/json',
            //       body: JSON.stringify(feed.rss)
            //     },
            //     { body: 'I am an attachment' }
            //   ]
            // },
            // function (error, response, body) {
            //   if (error) {
            //     return console.error('top20trends post failed:', error);
            //   }
            // }
          }

        });
      })*/;
    } else {
      console.error(res.error);
    };
  });  
});




//server requests for user/message sql db queries

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
