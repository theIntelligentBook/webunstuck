class: center, middle

XMLHttpRequest, Fetch, and CORS
=======================

---

## AJAX

* Traditionally, each request from the browser to the server produced a new page
* Couldn't fetch data while maintaining UI state (eg, scroll position)
* *Asynchronous JavaScript and HTML*
* 1998 Microsoft Outlook Web App; added to Mozilla 2002, Safari 2004
* (early 2000s, lots of people used invisible Java Applet for background communication. Will: SCFX)
* 2005 Google Maps, GMail
* 2005 "AJAX" coined by a blogger

---

## Create an XMLHttpRequest object

```js
var xhr = new XMLHttpRequest();
```

---

## Make the request

```js
var xhr = new XMLHttpRequest();
request.open('GET', 'somepage.xml', true);
request.setRequestHeader('MyHeader', 'MyValue');
request.send(data);
```

---

## Do something with the response

```js
var xhr = new XMLHttpRequest();
request.onreadystatechange = function () {
    var DONE = this.DONE || 4;
    if (this.readyState === DONE){
        alert(this.readyState);
    }
};
request.open('GET', 'somepage.xml', true);
request.setRequestHeader('MyHeader', 'MyValue');
request.send(data);
```

---

## readyState values 

Value | name | description
------| ---- | ---
0 | UNSENT | open() has not been called yet. 
1 | OPENED | send() has been called. 
2 | HEADERS_RECEIVED | send() has been called, and headers and status are available. 
3 | LOADING | Downloading; responseText holds partial data. 
4 | DONE | The operation is complete. 

From MDN documentation

---

## Getting the response

* JSON object, JSON array
 
 ```js
 val r = xhr.response
 ```

* XML
 
 ```js
val r = xhr.responseXML
 ```

* text
 
 ```js
val r = xhr.responseText
 ```

---

## Some headers aren't under your control

* Accept-Charset
* Accept-Encoding
* Access-Control-Request-Headers
* Access-Control-Request-Method
* Connection
* Content-Length
* Cookie
* Cookie2
* Date
* DNT
* Expect

---

## Some headers aren't under your control (cont'd)

* Host
* Keep-Alive
* Origin
* Referer
* TE
* Trailer
* Transfer-Encoding
* Upgrade
* User-Agent
* Via

---

# Fetch API -- a more modern equivalent

XMLHttpRequest is verbose. The Fetch API, now well-supported in browsers, is a much easier way.

For a GET request:

--

```js
fetch("/public/data.txt")
  .then((resp) => resp.text())
  .then((text) => {
      console.log(text)
  })
```

---

## Fetch returns Promises

A `Promise` represents an asynchronous result -- a box that at some point in future will be filled with a value (or an error)

```js
let p = fetch("/public/data.txt")
```

--

To process the result, use `then`. This takes two functions as parameters -- one for success, the other for failure

```js
p.then(
    (success) => {
        // Do something. eg, return another promise
    },
    (failure) => {
        // Do something with a failure
    }
)
```

---

## Fetch, optional config

`fetch(url)` will perform a get request.

A second argument to fetch can contain a number of config options, however. eg

```js
fetch("/example/json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: "Fred" })
    })
    .then((resp) => resp.text())
    .then((text) => {
            console.log(text)
        },
        (err) => {
            console.log(err)
        }
    )
```

---

## Cross-origin XMLHttpRequests

* Could be a security issue

--

* eg, visit http://nasty.example.com/leak
    - Contains script that calls GET on http://yourvaluabledata.example.com/assignment1
    - If data returned, posts the data to http://plagiarismcentral.example.com

---

## Cross-origin XMLHttpRequests

* eg, visit http://nasty.example.com/delete
   * Contains script that calls DELETE on http://yourvaluabledata.example.com/assignment1
   * If your cookie was sent (request to that domain), would cause server to delete data

---

## Security defaults

* By default, most browsers won't let XMLHttpRequest read JSON data from a different Origin (different protocol, server, or port)
* (Can read some kinds of data, as you could do a GET request with a `<script src="..." />` tag, but JSON isn't a valid script)

> A simple cross-origin request has been defined as congruent with those which may be generated by currently deployed user agents that do not conform to this specification. Simple cross-origin requests generated outside this specification (such as cross-origin form submissions using GET or POST or cross-origin GET requests resulting from script elements) typically include user credentials, so resources conforming to this specification must always be prepared to expect simple cross-origin requests with credentials.

---

## Simple requests

* Essentially means "what old browsers did". Forms, script links, etc
* Can't make a simple request for JSON (invalid syntax in a script element)
* Can't make a simple post of JSON (forms only post form-url-encoded, multipart-form-data, and text/plain)
* Can't do requests other than `GET` and `POST` (and `HEAD`) from a "simple" page. (These are the *simple methods*)

---

## JSONP

* Old technique for getting around cross-origin restrictions

* In a `script` element, this would be an invalid response
 
   ```
   { "a" : "myvalue" }
   ```

  But this would be valid response

   ```
   myfunction({ "a" : "myvalue" });
   ```

* So ask the server to wrap the data in a script call to a function of our choosing, and it appears to be just a GET request for a script

---

## Cross Origin Resource Sharing (CORS)

* [W3C Recommendation 2014](http://www.w3.org/TR/cors/)

* Modern way of getting around this. Server tells the client that access to the data from a different origin is ok.
* Different for `POST` than `GET` requests
    - `GET` is assumed "safe" (no side-effects). Danger is only in letting script parse response
    - `POST` could take an action on the server. Dangerous letting the call happen at all.

---

## CORS for GET

* Request is made
* Response header indicates whether the data should be made available to scripts on the page
    - Default is no
    - Server includes headers to allow request
    - `Access-Control-Allow-Origin` is the most important. Must list the domain in the `Origin` request header. `*` allows all Origins
   
 ```http
Access-Control-Allow-Origin: http://hello-world.example
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: PUT, DELETE
    ```

---

## CORS for POST

* Depends on what you're posting!

> A header is said to be a simple header if the header field name is an ASCII case-insensitive match for Accept, Accept-Language, or Content-Language or if it is an ASCII case-insensitive match for Content-Type and the header field value media type (excluding parameters) is an ASCII case-insensitive match for application/x-www-form-urlencoded, multipart/form-data, or text/plain.

---

## Pre-flight requests

* If you're posting JSON, you need to set `Content-Type: application/json`
?????? - not a "simple header", so not a simple request
* As performing the POST might be dangerous, browser makes an OPTIONS request first.
* Server response must include??the `Access-Control-Allow-Origin` header, allowing this origin, or the POST request will not be made
* When the POST request is made, server must again include the `Access-Control-Allow-Origin` header, allowing this origin, or the data will not be made available
* (This pre-flight sequence is??done for all non-simple requests)

---

## withCredentials

* If you want XMLHttpRequest to send credentials (cookies), tell it

    ```js
    xhr.withCredentials = true
    ```

---

## CRSF

>  resources for which simple requests have significance other than retrieval must protect themselves from Cross-Site Request Forgery (CSRF) by requiring the inclusion of an unguessable token in the explicitly provided content of the request. [CSRF] 

* Server remembers it handed out a short-lived CRSF token for this user
* If a request doesn't include it, it might not have come from one of our pages 

---