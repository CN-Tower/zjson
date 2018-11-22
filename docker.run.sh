#!/usr/bin

# docker build -t zjson:V3.1.1 .
docker run --net=host -p 3000:3000 -v /home/zjson/server:/zjson -d zjson:V3.1.1
