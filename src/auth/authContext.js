import { createContext } from "react";

// the createContext method returns a component, thats why
// we declare it with a capital letter at first, we will
// use this context which will cover all the routes of our
// webapp to transfer certain information across the components,
// in this case to handle private and public routes within the
// page
export const AuthContext = createContext();