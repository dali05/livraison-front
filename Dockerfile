FROM nginx:alpine
COPY ./dist/livraison-front /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
