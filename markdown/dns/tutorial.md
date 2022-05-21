# Tutorial 6 -- dig, curl, and inspecting network requests

## Part 1: Getting through the proxy

1. Connect to turing.une.edu.au, either via nx (NXClient, x2go, etc) or via ssh, and open a terminal

2. Set your proxy settings for unix utilities

    ```
     setproxy 
    ```

   Follow the prompts and this will set the environment variables `http_proxy` and `https_proxy`. That will let commands you execute from that shell call out through the UNE firewall. Well, except that Java based ones (Java doesn't use those environment variables), but more on that later.

## Part 2: DNS exploration with dig

Let's see how Domain Name Service records work. There'll be a video on this after the tutorial, but let's get you to look at it first.

What IP address does `www.une.edu.au` go to?  Let's find out...

```bash
dig www.une.edu.au
```

If we look in the "Answer section" of what happened, we should have received a `CNAME` response. That means "it's the same IP address as the following domain name". So now let's look up that one

```bash
dig une.squizedge.net
```

In the answer, we should get another CNAME, but that refers to the `A` record just below it. A is for Apex.

So, now we know UNE outsources their webhosting to Squiz!

Ok, but what about UNE's email?

```bash
dig une.edu.au mx
```

That gives us some `MX` (mail exchange) records, and if we look further down in the answer, those don't go to Squiz.

## Part 2: HTTP exploration with curl

We'll begin by issuing a few HTTP requests via curl, to get used to it and make sure it works.

When you make each request, read the output, and see if you can work out what each HTTP header in the request and response means.

   
3. Let's do a simple curl to Google and follow the redirect manually

    ``` 
    curl -v http://google.com
    ```
   
   This should result in a `302 Moved Temporarily` response. Take note of the URL it redirects to, and make a GET request to that URL. What is the length of the response?
   
4. The `-L` flag will cause curl to automatically follow redirect responses. Let's try it

    ``` 
    curl -v -L http://google.com
    ```
 
    Was the response length the same as before?
    
    Did the second request use the same HTTP version? If not, what do you think happened?

4. Let's search for COSC360 using DuckDuckGo

   ```
   curl -v https://duckduckgo.com/search?q=COSC360
   ```
   
   Which open source web server does DuckDuckGo use?  
  
5. Let's try an API request to GitHub

    ```
    curl -v https://api.github.com/users/octocat
    ```
    
   What is the MIME type (Content-Type) for JSON data?
   
6. Let's try setting a request header

   ```
   curl -v -H "Accept: text/plain" https://api.github.com/users/octocat
   ```
   
   The Content-Type of the returned data doesn't match what we put in the Accept header. Why is that?
    

## Part 3: Browser tools

Modern browsers provide developer tools -- though how you access them depends on which browser you are using. 

* In Firefox, from the right-hand "hamburger" menu, choose `Web Developer` -> `Toggle Tools`

* In Chrome, from the hamburger menu, it's `More Tools` -> `Developer Tools`

Open the Network tab.

Then first, let's look at the requests made when loading a set of my lecture slides or notes. You could inspect the loading of this page, but then the text might get a little small so perhaps you'd like to load another set in a new window or tab:

http://localhost/~wbilling/lectures/cosc360/lecture.html?angular2.md#11

Open the Network tab of the developer tools.

You should see each request made listed down the tab, and if you expand the tab there'll be a waterfall (or Gantt chart like) display of the timing of the requests.

Click on the topmost request. This opens a sub-tab that will initially show you the request headers and responses. How many do you recognise? Possibly not very many -- there are a lot of possible headers -- but hopefully you'll start to recognise some. See if you can find an `Accept` header in the request and a `Content-Type` header in the response.

(If the response was `304 Not Modified` there might not be a Content-Type. If so, reload without using the cache -- this is usually Ctrl-Shift-R or Ctrl-Alt-R on Windows/Linux and Apple-Shirt-R or Apple-Alt-R on Mac).

If there's a button available (there is in Firefox), click on "Raw Headers" to see these headers in text.

Even just in my slides, there's 11 requests being made. 

1. See if you can infer what they are for. Some will load libraries, others JS, others fonts, etc
2. There is a request in there that will give you the source format for my slides. See if you can find it and see the format the slides are written in. From this, try to "url hack" (ie, work out the URL) to download the source text of one of my slide decks.


Next, let's load my Angular.js demo that works with the GitHub API: 

[http://www.wbillingsley.com/angularjs-demo-1/](http://www.wbillingsley.com/angularjs-demo-1/)

Again, open the browser tools and the Networks tab. Reload the page.

You can take a look at the code loaded in `directives.js`, but that's more about Angular.js

Instead, enter a username into the box (eg, octocat), click the button and inspect the request to the GitHub API that takes place.

* In the headers, what is the content of the `Access-Control-Allow-Origin` header?

We'll see later, this is a security header that allows us to make a AJAX-style HTTP request to GitHub's API even though our page was loaded from a different domain. If that header was not there, the browser would have prevented us from accessing the results.

## Part 3b: REST clients

Open your browser's extension manager and search for a REST client. For Chrome, `Postman` is popular; for Firefox `RESTclient` seems to be popular at the moment.

These are modules that allow you to craft an HTTP request to post to a server -- much as we did using `curl`, but from a visual interface you're familiar with. 

See if you can recreate the request to the GitHub API from your REST client.

## Part 4: A past exam question

### Question 1

Pasted below are the lines from an HTTP request, followed by an HTTP response. The line numbers have been added and some lines removed for the purposes of this question.

```http
(1)  POST /example HTTP/1.1
(2)  User-Agent: curl/7.37.1
(3)  Cookie: logged_in=no;_gh_sess=eyJzZXNzaW9uX2
(4)  Accept: application/json
(5)  Authorization: Bearer mF_9.B5f-4.1JqM
(6)  Content-Length: 28
(7)  Content-Type: application/x-www-form-urlencoded
(8)
(9)  title=grand+old+duke+of+york
(10) HTTP/1.1 404 Not Found
(11) Server: GitHub.com
(12) Date: Thu, 19 Nov 2015 07:53:37 GMT
(13) Content-Type: text/html; charset=utf-8
(14) Content-Length: 226329
```

<ol style="list-style-type: lower-alpha;">

  <li> Describe the meaning of the following lines:

   <ol style="list-style-type: lower-roman;">
     <li>Line (1) [3 marks]</li>
     <li>Line (3) [3 marks]</li>
     <li>Lines (6) to (9) [9 marks]</li>
   </ol>
  </li>

  <li>How does the “Accept” header in an HTTP request relate to the “Content-Type” header in an HTTP response? [5 marks]
  </li>

  <li>How does line (10) explain why lines (4) and (13) appear to disagree? [5 marks]</li>

  <li>What information in the request shows it was not made from a web browser? [5 marks]
  </li>
</ol>
