import { useState, useEffect, useContext } from "react";
import exerciseApiService from "@/services/rapidApiBody";
import { isTokenValid } from "../helpers/tokenValidator";

export default function FullAccess() {
  const [activeSection, setActiveSection] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bodyParts, setBodyParts] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [targets, setTargets] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Cargar listas de filtros
  useEffect(() => {
    const loadFilterLists = async () => {
      try {
        const [bodyPartList, equipmentList, targetList] = await Promise.all([
          exerciseApiService.getBodyPartList(),
          exerciseApiService.getEquipmentList(),
          exerciseApiService.getTargetList(),
        ]);
        setBodyParts(bodyPartList);
        setEquipment(equipmentList);
        setTargets(targetList);
      } catch (err) {
        setError("Error al cargar las listas de filtros");
      }
    };
    loadFilterLists();
  }, []);

  // Cargar ejercicios basados en filtros y búsqueda
  useEffect(() => {
    const loadExercises = async () => {
      setLoading(true);
      try {
        let result;
        if (searchTerm) {
          result = await exerciseApiService.getExercisesByName(searchTerm);
        } else if (selectedFilter) {
          switch (activeSection) {
            case "bodyPart":
              result = await exerciseApiService.getExercisesByBodyPart(
                selectedFilter
              );
              break;
            case "equipment":
              result = await exerciseApiService.getExercisesByEquipment(
                selectedFilter
              );
              break;
            case "target":
              result = await exerciseApiService.getExercisesByTarget(
                selectedFilter
              );
              break;
            default:
              result = await exerciseApiService.getAllExercises();
          }
        } else {
          result = await exerciseApiService.getAllExercises();
        }
        setExercises(result);
        setError(null);
      } catch (err) {
        setError("Error al cargar los ejercicios");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(loadExercises, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, activeSection, selectedFilter]);

  const renderFilterOptions = () => {
    let options = [];
    switch (activeSection) {
      case "bodyPart":
        options = bodyParts;
        break;
      case "equipment":
        options = equipment;
        break;
      case "target":
        options = targets;
        break;
      default:
        return null;
    }

    return (
      <select
        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        value={selectedFilter || ""}
        onChange={(e) => setSelectedFilter(e.target.value)}
      >
        <option value="">Select Filter...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSelectedFilter(null);
  };

  return (
    <div className="min-h-screen bg-black p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-lime-500">
          Library of exercises
        </h1>
        <p className="mt-2 text-white">
          Explore our complete collection of exercises
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search exercises..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Filter */}
          {renderFilterOptions()}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", name: "All" },
            { id: "bodyPart", name: "Body Parts" },
            { id: "equipment", name: "By Equipment" },
            { id: "target", name: "By target" },
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionChange(section.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeSection === section.id
                  ? "bg-lime-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-stone-600 rounded-lg shadow p-6">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading exercises...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : exercises.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No se encontraron ejercicios
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-gray-50"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-blue-500 text-lg">💪</span>
                  <h3 className="font-medium text-gray-900">{exercise.name}</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span>🎯</span>
                    <span>Objetive: {exercise.target}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🏋️‍♂️</span>
                    <span>Equipament: {exercise.equipment}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
