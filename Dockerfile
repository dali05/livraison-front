FROM nginx:alpine

# Copier les fichiers Angular générés
COPY ./dist/livraison-front /usr/share/nginx/html

# Copier le fichier de configuration NGINX depuis la racine du projet
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 4200
EXPOSE 4200

# Démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]
