#!/usr/bin/python3
# -*- coding:utf8 -*-

from http.server import HTTPServer, BaseHTTPRequestHandler
import os
import webbrowser
 
 
class StaticServer(BaseHTTPRequestHandler): 
    def do_GET(self):
        root = os.path.join(os.path.dirname(os.path.abspath(__file__)),'..')
        
        if self.path == '/':
            filename = root + '/index.html'
        else:
            filename = root + self.path
 
        self.send_response(200)
        if filename[-4:] == '.css':
            self.send_header('Content-type', 'text/css')
        elif filename[-5:] == '.json':
            self.send_header('Content-type', 'application/javascript')
        elif filename[-3:] == '.js':
            self.send_header('Content-type', 'application/javascript')
        elif filename[-4:] == '.yml':
            self.send_header('Content-type', 'text/plain')
        elif filename[-4:] == '.svg':
            self.send_header('Content-type', 'image/svg+xml')
        elif filename[-4:] == '.jpg':
            self.send_header('Content-type', 'image/jpeg')
        elif filename[-4:] == '.png':
            self.send_header('Content-type', 'image/png')
        elif filename[-4:] == '.ico':
            self.send_header('Content-type', 'image/x-icon')
        else:
            self.send_header('Content-type', 'text/html')
        self.end_headers()
        
        with open(filename, 'rb') as fh:
            html = fh.read()
            #html = bytes(html, 'utf8')
            self.wfile.write(html)
 
def run(server_class=HTTPServer, handler_class=StaticServer, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print('Starting httpd on port {}'.format(port))
    httpd.serve_forever()
 
if __name__ == '__main__':
    port = 8081
    url = f'http://localhost:{port}/'
    webbrowser.open_new_tab(url)
    run(port=port)
