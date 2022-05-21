
### From URL to Server

For some students this may be the first Web course they've taken. So let's (fairly quickly) recap the main parts of the protocols.

We'll start with how we get our request to the right server.

---

### URL

Let's start our journey with a URL.

```
https://assessory.une.edu.au:9000/some/path?q=value&r=another#anchor
```

* Protocol `http`
* Domain name `assesory.une.edu.au`
* Port `9000`
   * if not included, defaults depending on the protocol. HTTP is 80
* Path - up to the server to interpret
* Query - browsers can "URL encode" key,value pairs 
* Fragment - changing this won't cause the browser to reload

Note that we haven't et

---

### Domain Name Service

* Somehow we need to turn a domain name (eg, `www.une.edu.au`) into an IP address (`202.9.95.188`)



* Designed in 1983. This is what the "cool" home computers looked like in 1983 (but not the servers that supported DNS):

  ![](https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQHLf--q3xwdGjX7qbUIzbJD4OEcObl_pVkVLMfWw_WAC1yJzic)

---

### Domain Name Service

* Documented in [RFC1034](https://tools.ietf.org/html/rfc1034) and 
  [RFC1035](https://tools.ietf.org/html/rfc1035) 

    **Handy hint:** Web protocols are usually documented in plain-text RFCs. They are a definitive reference, and sometimes quite readable...

---

### Domain Name Service

*And sometimes RFCs contain ASCII-art...*

```
                 Local Host                        |  Foreign
                                                   |
    +---------+               +----------+         |  +--------+
    |         | user queries  |          |queries  |  |        |
    |  User   |-------------->|          |---------|->|Foreign |
    | Program |               | Resolver |         |  |  Name  |
    |         |<--------------|          |<--------|--| Server |
    |         | user responses|          |responses|  |        |
    +---------+               +----------+         |  +--------+
                                |     A            |
                cache additions |     | references |
                                V     |            |
                              +----------+         |
                              |  cache   |         |
                              +----------+         |
```

Source: [RFC1035](https://tools.ietf.org/html/rfc1035) 

---

### What's in a DNS record?

* Text mapping from Domain Names to IP addresses for different message types. 

    ```dns
    USC-ISIC.ARPA   IN      CNAME   C.ISI.EDU

    C.ISI.EDU       IN      A       10.0.0.52  
    ```

---

### Domain Name Service

* Most important records (for this course) are *A*, *CNAME*, and *MX*

    ```
    A               For the IN class, a 32 bit IP address

                    For the CH class, a domain name followed
                    by a 16 bit octal Chaos address.

    CNAME           a domain name.

    MX              a 16 bit preference value (lower is
                    better) followed by a host name willing
                    to act as a mail exchange for the owner
                    domain.
    ```

    Source: [RFC1034](https://tools.ietf.org/html/rfc1034)
    


---

### Domain Name Service

* Text mapping from Domain Names to IP addresses for different message types. 

    ```dns
    USC-ISIC.ARPA   IN      CNAME   C.ISI.EDU

    C.ISI.EDU       IN      A       10.0.0.52  
    ```

---

### `dig`

```bash
; <<>> DiG 9.8.3-P1 <<>> www.une.edu.au
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 63514
;; flags: qr aa rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 4, ADDITIONAL: 4

;; QUESTION SECTION:
;www.une.edu.au.			IN	A

;; ANSWER SECTION:
www.une.edu.au.		300	IN	CNAME	une.dr.squiz.net.
une.dr.squiz.net.	501	IN	CNAME	une.squizedge.net.
une.squizedge.net.	279	IN	A	202.9.95.188

;; AUTHORITY SECTION:
squizedge.net.		75674	IN	NS	ns-124.awsdns-15.com.
squizedge.net.		75674	IN	NS	ns-1506.awsdns-60.org.
squizedge.net.		75674	IN	NS	ns-775.awsdns-32.net.
squizedge.net.		75674	IN	NS	ns-1739.awsdns-25.co.uk.

;; ADDITIONAL SECTION:
ns-124.awsdns-15.com.	75674	IN	A	205.251.192.124
ns-1506.awsdns-60.org.	75602	IN	A	205.251.197.226
ns-1739.awsdns-25.co.uk. 75595	IN	A	205.251.198.203
ns-775.awsdns-32.net.	75674	IN	A	205.251.195.7

;; Query time: 5 msec
;; SERVER: 129.180.1.4#53(129.180.1.4)
;; WHEN: Wed Jun 29 19:50:12 2016
;; MSG SIZE  rcvd: 307

```

---


