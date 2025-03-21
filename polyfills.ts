(window as any).global = window;
(window as any).process = {
  version: '',
  env: { DEBUG: undefined },
};

if (!(window as any).crypto) {
  (window as any).crypto = require('crypto-browserify');
}
