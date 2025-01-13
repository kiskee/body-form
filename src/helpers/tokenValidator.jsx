// helpers/tokenValidator.js
export const isTokenValid = (token) => {
    if (!token) {
      return false; // El token no existe
    }
  
    try {
      // Divide el token en sus tres partes (header.payload.signature)
      const [, payload] = token.split(".");
      if (!payload) {
        return false; // Token mal formado
      }
  
      // Decodifica la parte del payload (en base64)
      const decodedPayload = JSON.parse(atob(payload));
  
      // Verifica la expiración del token
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
      if (decodedPayload.exp && decodedPayload.exp < currentTime) {
        return false; // El token ha expirado
      }
  
      return true; // El token es válido
    } catch (error) {
      console.error("Error al validar el token:", error);
      return false; // Cualquier error invalida el token
    }
  };
  