FROM keymetrics/pm2:latest-alpine
COPY docker.sh /docker.sh
RUN chmod 777 docker.sh
CMD ["sh", "docker.sh"]
