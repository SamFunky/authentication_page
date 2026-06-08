import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export function useAuth() {
    const context = useContext(AuthContext);

    // if someone tries to use it outside of the provider
    if (context === undefined) {
        throw new Error("useAuth needs to be used in an auth provider")
    }

    return context;
}