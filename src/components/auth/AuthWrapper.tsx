import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <AuthContext.Provider value={{ user, signOut }}>
          {children}
        </AuthContext.Provider>
      )}
    </Authenticator>
  );
}

import { createContext, useContext } from "react";
import type { AuthUser } from "aws-amplify/auth";

interface AuthContextType {
  user: AuthUser | undefined;
  signOut: (() => void) | undefined;
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  signOut: undefined,
});

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthWrapper");
  }
  return context;
}
