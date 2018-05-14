#!/usr/sh
cd zjson
npm install pm2 --global
npm install
pm2 start bin/www
tail -f /dev/null
