amon-client
===========

nodejs amon client

## How to Install

```bash
npm install amon-client
```

## How to use

First, require `amon-client`:

```js
var Amon = require('amon-client');
```

###use zeromq 

```js
var amon = new Amon({host:'127.0.0.1', port:5464, protocal: 'zeromq'});

amon.log('this is log transport by zeromq', 'debug');
```

###use http

```js
var amon = new Amon({host:'127.0.0.1', port:2464, protocal: 'http', secret_key:'key in amon.conf'});

amon.log('this is log transport by http', 'debug');
```
