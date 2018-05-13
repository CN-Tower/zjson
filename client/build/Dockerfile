From  nginx:1.11.8-alpine
MAINTAINER cntower
RUN mkdir -p /webroot
COPY pxjson /webroot/pxjson
COPY nginx.conf /etc/nginx/nginx.conf
COPY run.sh /
RUN chmod 755 /run.sh
EXPOSE 3000

CMD ["sh", "/run.sh"]
