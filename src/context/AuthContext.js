import { createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  let auth_token = localStorage.getItem("auth_token");
  let admin_id = localStorage.getItem("admin_id");

  return (
    <AuthContext.Provider value={{ auth_token, admin_id }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
