var zmq = require('zmq');

exports = module.exports = ZeroMQ;

function ZeroMQ(options){
    this.config = {
        host: '127.0.0.1',
        port: 5464,
        type: 'dealer'
    };
    
    for (var i in options) {
        if (options.hasOwnProperty(i)) {
            this.config[i] = options[i];
        }
    }
    
    this.initial();
}

ZeroMQ.prototype = {
    initial: function(){
        this.socket = zmq.socket(this.config.type);
        var url = 'tcp://' + this.config.host + ':' + this.config.port;   
        this.socket.identity = 'client' + process.pid;

        this.socket.connect(url);
        console.log('connected url: '+url);
        
        this.socket.on('message', function(data){
            console.log('data: ',data);
        });
    },
    send: function(msg){
        if(this.socket){
            console.log('do send msg: ',msg);
            this.socket.send(msg);
        }
    }
    
};
