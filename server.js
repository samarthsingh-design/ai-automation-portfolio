const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.mp4': 'video/mp4'
};

const server = http.createServer((req, res) => {
  let safePath = path.normalize(decodeURI(req.url.split('?')[0])).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Check for clean URL matching a .html file (e.g. /privacy-policy -> /privacy-policy.html)
      const htmlCandidate = filePath + '.html';
      if (fs.existsSync(htmlCandidate) && fs.statSync(htmlCandidate).isFile()) {
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        });
        fs.createReadStream(htmlCandidate).pipe(res);
        return;
      }

      // Check for directory index.html (e.g. /privacy-policy/ -> /privacy-policy/index.html)
      const dirIndexCandidate = path.join(filePath, 'index.html');
      if (fs.existsSync(dirIndexCandidate) && fs.statSync(dirIndexCandidate).isFile()) {
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        });
        fs.createReadStream(dirIndexCandidate).pipe(res);
        return;
      }

      // Fallback clean URLs (e.g. /projects, /about, /contact) and html filenames to index.html
      const reqExt = path.extname(safePath).toLowerCase();
      if (!reqExt || reqExt === '.html') {
        const indexPath = path.join(PUBLIC_DIR, 'index.html');
        if (fs.existsSync(indexPath)) {
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
          });
          fs.createReadStream(indexPath).pipe(res);
          return;
        }
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

