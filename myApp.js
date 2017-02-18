/**********************************************
* 4. Applied InfoSec Challenges
* =============================
***********************************************/

var express = require('express'); // Do Not Edit
var app = express();              // Do Not Edit

// ----

/** - Challenges - *
********************/ 

/** 1) Install and require `helmet` */

// [Helmet](https://github.com/helmetjs/helmet) helps you secure your
// Express apps by setting various HTTP headers.
// Install the package, then require it.



/** 2) Hide potentially dangerous information - `helmet.hidePoweredBy()` */

// Hackers can exploit known vulnerabilities in Express/Node
// if they see that your site is powered by Express. `X-Powered-By: Express`
// is sent in every request coming from Express by default.

// The `hidePoweredBy` middleware will remove the `X-Powered-By` header.
// You can also explicitly set the header to something else, to throw
// people off. e.g. `helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' })`

// Use `helmet.hidePoweredBy()``



/** 3) Mitigate the risk of clickjacking - `helmet.frameguard()` */

// Your page could be put in a <frame> or <iframe> without your consent.
// This can result in [clickjacking attacks](https://en.wikipedia.org/wiki/Clickjacking),
// among other things. Clickjacking is a technique of tricking a user into
// interacting with a page different from what the user thinks it is. Often this
// happens using another page put over the framed original, in a transparent layer.
// The `X-Frame-Options` header set by this middleware restricts who can put
// your site in a frame. It has three modes: DENY, SAMEORIGIN, and ALLOW-FROM.

// We don't need our app to be framed, so you should use `helmet.frameguard()`
// passing to it the configuration object `{action: 'deny'}`

 

/** 4) Mitigate the risk of XSS - `helmet.xssFilter()` */

// Cross-site scripting (XSS) is a very frequent type of attack where malicious
// script are injected into vulnerable pages, on the purpous of stealing sensitive
// data like session cookies, or passwords. The basic rule to lower the risk
// of an XSS attack is simple: **"Never trust user's input"**, so as a developer
// you should always *sanitize* all the input coming from the outside.
// This includes data coming from forms, GET query urls, and even from
// POST bodies. Sanitizing means that you should find and encode the characters
// that may be dangerous e.g. `<`, `>`.
// More Info [here](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet).

// Modern browsers can help mitigating XSS risk by adoptiong software strategies,
// which often are configurable via http headers.
// The `X-XSS-Protection` HTTP header is a basic protection.  When the browser
// detects a potential injected script using an heuristic filter,
// it changes it, making the script not executable.
// It still has limited support.

// Use `helmet.xssFilter()`



/** 5) Avoid inferring the response MIME type - `helmet.noSniff()` */

// Browsers can use content or MIME sniffing to override response `Content-Type`
// headers to guess and process the data using an implicit content type.
// While this can be convenient in some scenarios, it can also lead to
// some dangerous attacks.
// This middleware sets the X-Content-Type-Options header to `nosniff`,
// instructing the browser to not bypass the provided `Content-Type`.

// Use `helmet.noSniff()`



/** 6) Prevent IE from opening *untrusted* HTML - `helmet.ieNoOpen()` */

// Some web applications will serve untrusted HTML for download. By default,
// some versions of Internet Explorer will allow you to open those HTML files
// in the context of your site, which means that an untrusted HTML page could
// start doing bad things inside your pages.
// This middleware sets the `X-Download-Options` header to `noopen`,
// to prevent IE users from executing downloads in the *trusted* site's context.

// Use `helmet.ieNoOpen()`



/**  7) Ask browsers to access your site via HTTPS only - `helmet.hsts()` */

// HTTP Strict Transport Security (HSTS) is a web security policy mechanism which 
// helps to protect websites against protocol downgrade attacks and cookie hijacking.
// If your website can be accessed via HTTPS you can ask user's browsers
// to avoid using insecure HTTP. Setting the header `Strict-Transport-Security`
// you instruct  browsers to use HTTPS for all the future requests occurring in a
// specified amount of time. This will work for the requests coming **after**
// the initial request.

// Configure `helmet.hsts()` to instruct browsers to use HTTPS for the next
// **90 days**, passing the config object {maxAge: timeInMilliseconds}. 
// HyperDev already has **hsts** enabled, to override its settings you need to 
// set the field `force` to `true` in the config object. To not alter hyperdev security 
// policy we will intercept and restore the header, after inspecting it for testing.

var ninetyDaysInMilliseconds = 90*24*60*60*1000;


//**Note**:
// Configuring HTTPS on a custom website requires the acquisition of a domain,
// and a SSL/TSL Certificate.

/** 8) Disable DNS Prefetching - `helmet.dnsPrefetchControl()` */

// To improve performance, most browsers prefetch DNS records for the links in
// a page. In that way the destination ip is already known when the user clicks on a link.
// This may lead to over-use of the DNS service (if you own a big website,
// visited by millions people...), privacy issues (one eavesdropper could infer
// that you are on a certain page - even if encrypted -, from the links you are
// prefecthing), or page statistics alteration (some links may appear visited
// even if they are not). If you have high security needs you can disable
// DNS prefetching, at the cost of a performance penalty.

// Use `helmet.dnsPrefetchControl()`



/** 9) Disable Client-Side Caching - `helmet.noCache()` */

// If you are releasing an update for your website, and you want your users
// to download the newer, more performant and safer version, you can (try to)
// disable caching on client's browser, for your website. It can be useful
// in development too. Caching has performance benefits, and you will lose them,
// use this option only when there is a real need.

// Use helmet.noCache()



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
