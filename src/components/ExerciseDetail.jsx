import React, { useState, useEffect } from 'react';
import exerciseApiService from "@/services/rapidApiBody";

const ExerciseDetail = ({ exerciseId }) => {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExerciseDetail = async () => {
      setLoading(true);
      try {
        const data = await exerciseApiService.getExerciseById(exerciseId);
        setExercise(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los detalles del ejercicio');
      } finally {
        setLoading(false);
      }
    };

    if (exerciseId) {
      fetchExerciseDetail();
    }
  }, [exerciseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  if (!exercise) {
    return null;
  }

  return (
    <div className="bg-black rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-lime-500 text-white p-6">
        <h2 className="text-5xl text-center font-bold">{exercise.name}</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-black text-white rounded-full text-sm">
            {exercise.bodyPart}
          </span>
          <span className="px-3 py-1 bg-black text-white rounded-full text-sm">
            {exercise.equipment}
          </span>
          <span className="px-3 py-1 bg-black text-white rounded-full text-sm">
            {exercise.target}
          </span>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* GIF Section */}
        <div className="flex justify-center items-center bg-gray-100 rounded-lg p-4 ">
          <img
            src={exercise.gifUrl}
            alt={`Demostración de ${exercise.name}`}
            className="max-w-full h-auto rounded-lg"
          />
        </div>

        {/* Info Section */}
        <div className="space-y-6 ">
          {/* Músculos Secundarios */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
            Secondary Muscles
            </h3>
            <div className="flex flex-wrap gap-2">
              {exercise.secondaryMuscles.map((muscle, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-lime-400 rounded-full text-sm text-gray-700"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          {/* Instrucciones */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
            Instructions
            </h3>
            <ol className="space-y-2 text-white">
              {exercise.instructions.map((instruction, index) => (
                <li key={index} className="text-white">
                  <span className="font-medium text-lime-500">{index + 1}.</span>{' '}
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;