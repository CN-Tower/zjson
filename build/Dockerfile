FROM keymetrics/pm2:latest-alpine
USER CN-Tower
RUN npm install pm2 -g
COPY pxjson.sh /pxjson.sh
COPY ../server /pxjson
RUN chmod 777 pxjson.sh
CMD ["sh", "pxjson.sh"]
