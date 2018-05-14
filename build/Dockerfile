FROM keymetrics/pm2:latest-alpine
USER CN-Tower
COPY pxjson.sh /pxjson.sh
COPY ../server /pxjson
RUN chmod 777 pxjson.sh
CMD ["sh", "pxjson.sh"]
