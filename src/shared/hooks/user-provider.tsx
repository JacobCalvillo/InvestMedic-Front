import React, { createContext, PropsWithChildren, useContext, useState, useEffect } from "react";
import { User } from "../../models/User.ts";
import { axiosInstance } from "../../core/api/axios.config.ts";

// Define un tipo más robusto para el contexto
interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: User) => Promise<boolean>;
  logout: () => void;
}

// Crea el contexto con un valor inicial más completo
const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay un token almacenado al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          // Opcional: verificar si el token es válido haciendo una solicitud al endpoint /me
          // Si no tienes ese endpoint, puedes omitir esta parte
          const response = await axiosInstance.get('/me');
          setUser(response.data.user);
        } catch (error) {
          // Si hay un error, limpiar el token
          localStorage.removeItem('token');
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Función para iniciar sesión
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axiosInstance.post('/login', { email, password });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Función para registrarse
  const register = async (userData: User): Promise<boolean> => {
    try {
      const response = await axiosInstance.post('/register', userData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
      <UserContext.Provider
          value={{
            user,
            setUser,
            isAuthenticated: !!user,
            loading,
            login,
            register,
            logout
          }}
      >
        {children}
      </UserContext.Provider>
  );
};

// Hook para acceder al contexto
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};