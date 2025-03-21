FROM nginx:alpine

# Installer OpenSSL
RUN apk update && apk add --no-cache openssl

# Créer les certificats SSL
RUN mkdir -p /etc/ssl/certs /etc/ssl/private && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/nginx-selfsigned.key \
    -out /etc/ssl/certs/nginx-selfsigned.crt \
    -subj "/CN=a1df7b5c0ee534e2294f4291f4537f8e-304100752.eu-north-1.elb.amazonaws.com"

# Copier les fichiers Angular générés depuis "browser/"
COPY ./dist/livraison-front/browser /usr/share/nginx/html

# Copier la configuration NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer les ports HTTP et HTTPS
EXPOSE 80
EXPOSE 443

# Démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]
