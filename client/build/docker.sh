#!/usr/bin

if [ $1 -eq 'run' ]; then
    docker run --net=host -d pxjson:V3.0.2
else
    docker build -t pxjson:V3.0.2 .
fi
