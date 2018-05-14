#!/usr/bin

version='V3.0.2'

if [ $1 -eq 'run' ]; then
    docker run --net=host -d pxjson:$version
else
    docker build -t pxjson:$version .
