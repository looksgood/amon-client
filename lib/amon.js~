var ZeroMQ = require('./ZeroMQ');
var http = require('http');

exports = module.exports = Amon;

function Amon(options){
    this.config = {
        host: '127.0.0.1',
        port: 5464,
        protocal: 'zeromq',// zeromq or http
        secret_key: ''
    };

    for(var i in options){
        if(options.hasOwnProperty(i)){
            this.config[i] = options[i];
        }
    }
    
    if('zeromq' === this.config.protocal){
        console.log('do init zeromq');
        this.zeroMQ = new ZeroMQ({
            host: this.config.host, 
            port: this.config.port
        });
    }
}

Amon.prototype = {
    log: function(message, tags){
        tags = tags || "notset";
        
	    var log_data = JSON.stringify({
	        "message": message,
	        "tags": tags
	    });

        this.doLogByProtocal('log', log_data);
    },
    handleError: function(error){
        var error_data = {
            "additional_data": {
				"application_directory": process.cwd(),
				"node": process.version,
				"env": {
					"args": process.argv,
					"execPath": process.execPath,
					"cwd": process.cwd(),
					"env": process.env,
					"installPrefix": process.installPrefix,
					"pid": process.pid,
					"platform": process.platform,
					"memory": process.memoryUsage()
				}
			},
		    "backtrace": error.stack.split("\n"),
			"message": error.message,
			"exception_class": error.stack.split("\n")[0]
        };
        
        this.doLogByProtocal('exception', error_data);
    },
    doLogByProtocal: function(db, log_data){
        switch(this.config.protocal){
            case 'zeromq':
                this.zeromqLog(db, log_data);
                break;
            case 'http':
                this.httpLog(db, log_data);
                break;
            default:
                break;
        }
    },
    httpLog: function(type, data){
        var headers = {
            'Content-Length' : data.length,
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        
        var path = '/api/'+type;
		
        if(this.config.secret_key != ''){ 
            path = path+'/'+this.config.secret_key;// amon 1.0.3, must have secrte key
        }

		var options = {
			host: this.config.host,
			port: this.config.port,
			path: path,
			method: 'POST',
			headers: headers
		};

		var request = http.request(options, function(response) {
			// For debug purposes only
			//console.log('status: ' + response.statusCode);			  
		});

        request.write(data);
		request.end();

        request.on('error', function (error) {
            console.log(error.message);
		});
    },
    zeromqLog: function(type, data){
        if(!this.zeroMQ){
            console.log('zeroMQ instance not exist');
            return;
        }
        var logStr = JSON.stringify({type:type, content:data});
        console.log('logStr: ',logStr);
        this.zeroMQ.send(logStr);
    }
};
