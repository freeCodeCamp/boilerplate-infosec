var express = require('express');
var app = express();






var helmet = require('helmet');





app.use(helmet.hidePoweredBy());





// Use helmet.frameguard OR frameguard

app.use(helmet.frameguard({ action: 'deny' }));





app.use(helmet.xssFilter());




app.use(helmet.noSniff());




app.use(helmet.ieNoOpen());





app.use(helmet.hsts({
  maxAge: ninetyDaysInSeconds,
  force: true
}))





app.use(helmet.dnsPrefetchControl())



// If you are releasing an update for your website, and you want your users
// to download the newer, more performant and safer version, you can (try to)
// disable caching on client's browser, for your website. It can be useful
// in development too. Caching has performance benefits, and you will lose them,
// use this option only when there is a real need.

// Use helmet.noCache()

app.use(helmet.noCache());

/** 10) Content Security Policy - `helmet.contentSecurityPolicy()` */

// This challenge highlights one promising new defense that can significantly reduce
// the risk and impact of many type of attacks in modern browsers. By setting and
// configuring a Content Security Policy you can prevent the injection of anything
// unintended  into your page. This will protect your app from XSS vulnerabilities,
// undesidered tracking, malicious frames, and much more.
// CSP works by defining  a whitelist of content sources which are trusted, for
// each kind of resource a web page may need to load (scripts, stylesheets,
// fonts, frames,media,  and so on...). There are multiple directives available,
// so a website owner can have a granular control.
// See http://www.html5rocks.com/en/tutorials/security/content-security-policy/ ,
// https://www.keycdn.com/support/content-security-policy/ for more details.
// Unfortunately CSP in unsupported by older browser.
//
// By default, directives are wide open, so it's important to set the `defaultSrc`
// directive (helmet supports both `defaultSrc` and `default-src` naming styles),
// as a fallback for most of the other unspecified directives.
// In this exercise, use `helmet.contentSecurityPolicy()`, and configure it
// setting the `defaultSrc` directive to `["'self'"]` (the list of allowed sources
// must be in an array), in order to trust **only your website address** by default.
// Set also the `scriptSrc` directive so that you will allow scripts to be downloaded
// from your website, and from the domain `trusted-cdn.com`.
//
// **Hint**: 
// in the `"'self'"` keyword, the single quotes are part of the keyword itself, 
// so it needs to be enclosed in **double quotes** to be working.

app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", "trusted-cdn.com"] }} ))


/** TIP: */ 

// `app.use(helmet())` will automatically include all the middleware
// presented above, except `noCache()`, and `contentSecurityPolicy()`,
// but these can be enabled if necessary. You can also disable or 
// set any other middleware individually, using a configuration object.

// // - Example - 
// app.use(helmet({
//   frameguard: {              // configure
//     action: 'deny'
//   },
//   contentSecurityPolicy: {   // enable and configure
//    directives: {
//      defaultSrc: ["'self'"],
//      styleSrc: ['style.com'],
//    }
//   },
//  dnsPrefetchControl: false   // disable
// }))

// We introduced each middleware separately, for teaching purpose, and for
// ease of testing. Using the 'parent' `helmet()` middleware is easiest, and
// cleaner, for a real project.

// ---- DO NOT EDIT BELOW THIS LINE ---------------------------------------


module.exports = app;
var api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
