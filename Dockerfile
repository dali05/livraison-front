FROM nginx:alpine

# Copier les fichiers Angular générés depuis "browser/"
COPY ./dist/livraison-front/browser /usr/share/nginx/html

# Copier la configuration NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 4200
EXPOSE 4200

# Démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]
