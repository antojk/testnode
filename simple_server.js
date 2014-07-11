var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    ext = /[\w\d_-]+\.[\w\d]+$/;

//Gets the mimetype from extension
function getContentType(fPath) {
    var extn, contentType = '',
        extStart = fPath.lastIndexOf('.') + 1;
    if (extStart > -1 & extStart < fPath.length) {
        extn = fPath.substring(extStart);
    }

    switch (extn) {
    case 'js':
        contentType = 'application/javascript';
        break;
    case 'jpg' | 'jpe' | 'jpeg':
        contentType = 'image/jpeg';
        break;
    case 'gif':
        contentType = 'image/gif';
        break;
    case 'png':
        contentType = 'image/png';
        break;
    case 'mp3':
        contentType = 'audio/mpeg';
        break;
    case 'wav':
        contentType = 'audio/x-wav';
        break;
    case 'zip':
        contentType = 'application/zip';
        break;
    default:
        contentType = 'text/html';
    }
    return contentType;
}

http.createServer(function(req, res) {
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.createReadStream('index.html').pipe(res);
    }
    else if (ext.test(req.url)) {
        var fPath = path.join(__dirname, req.url);
        fs.exists(fPath, function(exists) {
            if (exists) {
                res.writeHead(200, {
                    'Content-Type': getContentType(fPath)
                });
                fs.createReadStream(fPath).pipe(res);
            }
            else {
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                fs.createReadStream('404.html').pipe(res);
            }
        });
    }
}).listen(process.env.PORT, process.env.IP);


console.log('Server running at http://' + process.env.IP + ':' + process.env.PORT + '/');