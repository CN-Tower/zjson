FROM keymetrics/pm2:latest-alpine
COPY pxjson.sh /pxjson.sh
RUN chmod 777 pxjson.sh
CMD ["sh", "pxjson.sh"]
