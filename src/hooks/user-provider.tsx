import { createContext, PropsWithChildren, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
