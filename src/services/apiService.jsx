const BASE_URL = import.meta.env.VITE_API_URL; // Asegúrate de definirlo en tus variables de entorno

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error en la petición");
  }
  return response.json();
};

const getToken = () => localStorage.getItem("jwtToken");

const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const [, payload] = token.split(".");
    if (!payload) return false;

    const decodedPayload = JSON.parse(atob(payload));
    const currentTime = Math.floor(Date.now() / 1000);

    return decodedPayload.exp && decodedPayload.exp > currentTime;
  } catch {
    return false;
  }
};

export const apiService = {
  get: async (url, headers = {}) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    return handleResponse(response);
  },

  post: async (url, body, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      });
      return handleResponse(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  put: async (url, body, headers = {}) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  delete: async (url, headers = {}) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    return handleResponse(response);
  },

  withAuth: async (method, url, body = null, additionalHeaders = {}) => {
    const token = getToken();

    // Valida si el token es válido
    if (!isTokenValid(token)) {
      console.error("Token inválido o expirado. Redirigiendo al login...");
      window.location.href = "/login"; // Ajusta la redirección según tu aplicación
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...additionalHeaders,
    };

    // Llama al método correspondiente (GET, POST, etc.)
    if (method === "GET" || method === "DELETE") {
      return fetch(`${BASE_URL}${url}`, {
        method,
        headers,
      }).then(handleResponse);
    } else if (method === "POST" || method === "PUT") {
      return fetch(`${BASE_URL}${url}`, {
        method,
        headers,
        body: JSON.stringify(body),
      }).then(handleResponse);
    } else {
      throw new Error("Método HTTP no soportado.");
    }
  },
};
