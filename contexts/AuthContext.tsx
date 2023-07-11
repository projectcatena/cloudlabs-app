import { SetStateAction, createContext, useContext, useEffect, useState } from "react";

export type AuthUser = {
  email: string,
  name: string,
  jwt: string,
  roles: string[],
  expiration: string
}

type AuthContextType = {
  user: AuthUser | null,
  setUser: React.Dispatch<SetStateAction<AuthUser | null>>
}

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(
    () => {
      const localUser = JSON.parse(localStorage.getItem('user') || "{}");

      if (localUser) {
        setUser(localUser);
      }
    },
    []
  )

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
