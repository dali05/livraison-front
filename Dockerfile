FROM nginx:alpine

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/nginx-selfsigned.key \
  -out /etc/ssl/certs/nginx-selfsigned.crt \
  -subj "/CN=a1df7b5c0ee534e2294f4291f4537f8e-304100752.eu-north-1.elb.amazonaws.com"



# Copier les fichiers Angular générés depuis "browser/"
COPY ./dist/livraison-front/browser /usr/share/nginx/html

# Copier la configuration NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 4200
EXPOSE 4200

# Démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]
