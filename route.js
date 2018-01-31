var express = require('express')
var router = express.Router()
var contact = require('./contact')
var qs = require('querystring');


var options = {
    root: __dirname + '/page/',
    dotfiles: 'deny',
    headers: {
	    'x-timestamp': Date.now(),
	    'x-sent': true
    }
};

router.get('/', function (req, res) {
  	res.sendFile('index.html',options)
})

router.get('/contact', function (req, res) {
  	res.sendFile('contact.html',options)
})

router.post('/contact', function (req, res, next) {
	var postData = '';

	req.on('data', function (data) {
        postData += data;
        if (postData.length > 1e6)
        	req.connection.destroy();
    });

    req.on('end', function () {
    	var contactData = qs.parse(postData);
        var saveData = contact.contactStore(contactData)
        if( saveData )
        	res.send('success')
        else
        	res.send('error')
    });

})

router.get('/assets/:name', function (req, res, next) {
	var asset_options = {
	    root: __dirname + '/assets/',
	    dotfiles: 'deny',
	    headers: {
		    'x-timestamp': Date.now(),
		    'x-sent': true
	    }
	};
	var fileName = req.params.name;
  	res.sendFile(fileName, asset_options, function (err) {
	    if (err) {
	      next(err);
	    } else {
	      console.log('Sent:', fileName);
	    }
	});
})

router.get('/assets/:dir/:name', function (req, res, next) {
	var dirName = req.params.dir;
	var fileName = req.params.name;
	
	var asset_options = {
	    root: __dirname + '/assets/' + dirName + '/',
	    dotfiles: 'deny',
	    headers: {
		    'x-timestamp': Date.now(),
		    'x-sent': true
	    }
	};
	
  	res.sendFile(fileName, asset_options, function (err) {
	    if (err) {
	      next(err);
	    } else {
	      console.log('Sent:', fileName);
	    }
	});
})


module.exports = router
