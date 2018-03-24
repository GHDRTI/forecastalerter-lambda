exports.handler = (event, context, callback) => {

    var request = require('request');
    
    var sender = event.Records[0].ses.mail.source;
    var subject = event.Records[0].ses.mail.commonHeaders.subject; 


    if (subject.toLowerCase().trim() == 'subscribe'){

    	var formData = {
		  email: sender
		};

    	request.post({url:'https://forecastalerter.herokuapp.com/api/register', 
		formData: formData}, function(error,httpResponse,body){ 

			if (!error && httpResponse.statusCode == 201) {
	    		console.log('account registered: ' + sender); 
	  		} else {
	  			console.log('nothing happend because of this error code: ' + httpResponse.statusCode ); 
	  		}

		});

    } else if (subject.toLowerCase().trim() == 'unsubscribe'){

    	var formData = {
		  email: sender
		};

    	request.post({url:'https://forecastalerter.herokuapp.com/api/unregister', 
		formData: formData}, function(error,httpResponse,body){ 

			if (!error && httpResponse.statusCode == 204) {
	    		console.log('account unregistered:' + sender); 
	  		} else {
	  			console.log('error code' + httpResponse && httpResponse.statusCode); 
	  		}

		});

    } else {
    	console.log('unsupported function: ' + subject); 
    }
 
    callback(null);
};