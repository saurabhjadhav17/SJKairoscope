var http =require('http');
var fs=reuire('fs');
var server =http.createSever(function(req,res){
  console.log('request was made :' +req.url);
  res.writeHead(200,{'Content-Type': 'text/html'});
  var myReadStream =fs.createReadStream(_dirname + '/try.html ', 'utf8');
  myReadStream.pipe(res);
});
server.listen(3000,'127.0.0.1');
console.log('yooooo');
