import { createContext, useState, useEffect } from "react";

// Crea el contexto
export const UserDetailContext = createContext();

export const UserDetailProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState(() => {
    const storedUser = localStorage.getItem("userDetail");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      const { token, expiresAt } = JSON.parse(storedToken);
      const now = new Date().getTime();

      if (now < expiresAt) {
        return { ...JSON.parse(storedUser), token };
      } else {
        // Token expirado
        localStorage.removeItem("userDetail");
        localStorage.removeItem("authToken");
      }
    }

    return null;
  });

  useEffect(() => {
    if (userDetail) {
      localStorage.setItem("userDetail", JSON.stringify(userDetail));
      localStorage.setItem(
        "authToken",
        JSON.stringify({
          token: userDetail.token,
          expiresAt: new Date().getTime() + 60 * 60 * 1000, // 60 minutos
        })
      );
    } else {
      localStorage.removeItem("userDetail");
      localStorage.removeItem("authToken");
    }
  }, [userDetail]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
};
