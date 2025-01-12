const BASE_URL = import.meta.env.VITE_API_URL; // Asegúrate de definirlo en tus variables de entorno

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error en la petición");
  }
  return response.json();
};

export const apiService = {
  get: async (url, headers = {}) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      mode: "no-cors",
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
            mode: "no-cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...headers,
            },
            body: JSON.stringify(body),
          });
          console.log(response)
          return handleResponse(response);
    } catch (error) {
        console.log(error)
    }
  },

  put: async (url, body, headers = {}) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      mode: "no-cors",
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
      mode: "no-cors",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    return handleResponse(response);
  },
};
