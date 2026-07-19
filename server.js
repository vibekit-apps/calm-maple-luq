
const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const COUNTER_FILE = path.join(__dirname, 'counter.txt');

// Ensure counter file exists
if (!fs.existsSync(COUNTER_FILE)) {
  fs.writeFileSync(COUNTER_FILE, '0');
}

function incrementCounter() {
  const count = parseInt(fs.readFileSync(COUNTER_FILE, 'utf8'), 10) || 0;
  const newCount = count + 1;
  fs.writeFileSync(COUNTER_FILE, String(newCount));
  return newCount;
}

http.createServer((req, res) => {
  try {
    const count = incrementCounter();
    let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    // Replace placeholder {{VISITOR_COUNT}}
    html = html.replace('{{VISITOR_COUNT}}', count.toString());
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } catch (e) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<html><body style="background:#0a0a0f;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh"><h1>Setting up...</h1></body></html>');
  }
}).listen(PORT, () => console.log('Server running on port ' + PORT));
