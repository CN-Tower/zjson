FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY pxjson /pxjson
RUN nginx
EXPOSE 80
CMD ["tail", "-f", "/dev/null"]
