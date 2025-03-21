if (!window.crypto || !window.crypto.subtle) {
  console.warn("Web Crypto API is not available. Using a fallback.");
  (window as any).crypto = {
    subtle: {
      digest: async (algorithm: string, data: ArrayBuffer) => {
        const buffer = new Uint8Array(data);
        let hash = "";
        for (let i = 0; i < buffer.length; i++) {
          hash += buffer[i].toString(16).padStart(2, "0");
        }
        return new TextEncoder().encode(hash);
      }
    },
    getRandomValues: (array: Uint8Array): Uint8Array => {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    }
  };
}
