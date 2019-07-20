var http = require('http'),
 	 	fs = require('fs');

var server = http.createServer(function(request, response) {
	fs.readFile('./' + request.url, function(err, data) {
		if (!err) {
				var dotoffset = request.url.lastIndexOf('.');
				var mimetype = dotoffset == -1
												? 'text/plain'
												: {
														'.html' : 'text/html',
														'.ico' : 'image/x-icon',
														'.jpg' : 'image/jpeg',
														'.png' : 'image/png',
														'.gif' : 'image/gif',
														'.css' : 'text/css',
														'.js' : 'text/javascript'
														}[ request.url.substr(dotoffset) ];
				response.setHeader('Content-type' , mimetype);
				response.end(data);
				console.log( request.url, mimetype );
		} else {
				console.log ('File not found: ' + request.url);
				response.writeHead(404, "Not Found");
				response.end();
		}
});

}).listen(3001);

console.log('Server is running under the 3001 port');