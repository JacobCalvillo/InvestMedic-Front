import React, { createContext, PropsWithChildren, useContext, useState } from "react";

const UserContext = createContext<{ user: null; setUser: React.Dispatch<React.SetStateAction<null>> } | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
