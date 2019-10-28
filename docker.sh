#!/usr/sh

cd zjson
npm install pm2 --global
npm install
pm2 start app.js -n zjson
tail -f /dev/null
