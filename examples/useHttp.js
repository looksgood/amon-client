var Amon = require('amon-client');
var amon = new Amon({host:'127.0.0.1', port:2464, protocal: 'http', secret_key:'key in amon.conf'});// amon 1.03 require the secret_key

amon.log('this is log by http', 'debug');

process.addListener('uncaughtException', function(err){
    amon.handle(err);
});
