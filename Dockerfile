FROM keymetrics/pm2:latest-alpine
COPY zjson.sh /zjson.sh
RUN chmod 777 zjson.sh
CMD ["sh", "zjson.sh"]
