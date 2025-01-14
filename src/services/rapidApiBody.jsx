const BASE_URL =import.meta.env.VITE_API_BODY_URL ;

const exerciseApiService = {
  get: async (path, headers = {}) => {
    const url = `${BASE_URL}${path}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KI,
        'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOS,
        ...headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en la petición');
    }

    return response.json();
  },

  getBodyPartList: async () => {
    return exerciseApiService.get('/exercises/bodyPartList');
  },

  getTargetList: async () => {
    return exerciseApiService.get('/exercises/targetList');
  },

  getEquipmentList: async () => {
    return exerciseApiService.get('/exercises/equipmentList');
  },

  getExerciseById: async (id) => {
    return exerciseApiService.get(`/exercises/exercise/${id}`);
  },

  getExercisesByBodyPart: async (bodyPart) => {
    return exerciseApiService.get(`/exercises/bodyPart/${bodyPart}`);
  },

  getExercisesByTarget: async (target) => {
    return exerciseApiService.get(`/exercises/target/${target}`);
  },

  getExercisesByEquipment: async (equipment) => {
    return exerciseApiService.get(`/exercises/equipment/${equipment}`);
  },

  getExercisesByName: async (name) => {
    return exerciseApiService.get(`/exercises/name/${name}`);
  },

  getAllExercises: async () => {
    return exerciseApiService.get('/exercises');
  },
};

export default exerciseApiService;
