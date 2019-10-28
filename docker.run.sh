#!/usr/bin

docker build -t zjson:V3.1.1 .
docker run --network host -v /home/zjson/server:/zjson -d zjson:V3.1.1
