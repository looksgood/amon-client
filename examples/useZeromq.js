var Amon = require('amon-client');

var amon = new Amon({host:'127.0.0.1', port:5464, protocal: 'zeromq'});

amon.log('this is log by zeromq', 'debug');

process.addListener('uncaughtException', function(err){
    amon.handle(err);
});
