(window as any).global = window;
(window as any).process = {
  version: '',
  env: { DEBUG: undefined },
};

if (!window.crypto) {
  console.warn("L'API Web Crypto n'est pas disponible dans ce navigateur.");
}
