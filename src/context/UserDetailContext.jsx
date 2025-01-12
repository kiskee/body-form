import { createContext, useState, useEffect } from "react";

// Crea el contexto
export const UserDetailContext = createContext();

export const UserDetailProvider = ({ children }) => {
  // Inicializa el estado con datos de localStorage si están disponibles
  const [userDetail, setUserDetail] = useState(() => {
    const storedUser = localStorage.getItem("userDetail");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Guarda los datos en localStorage cuando cambien
  useEffect(() => {
    if (userDetail) {
      localStorage.setItem("userDetail", JSON.stringify(userDetail));
    } else {
      localStorage.removeItem("userDetail");
    }
  }, [userDetail]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
};
