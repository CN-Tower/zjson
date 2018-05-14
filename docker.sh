#!/usr/bin

if [ $1 -eq 'run' ]; then
    docker run --net=host -p 3000:3000 -v /home/zjson/server:/zjson -d zjson:V3.1.1
else
    docker build -t zjson:V3.1.1 .
fi
