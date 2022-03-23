import React, { createContext, useState } from "react";

const defaultState = {
  email: '', 
  setUserEmail: () => {}
};

export const UserContext = createContext(
  defaultState

);

export const UserContextProvider = ({children}) => {

  const [email, setEmail] = useState(defaultState.email);

  const setUserEmail = (email) => {
    setEmail(email)
  }

  return(
    <UserContext.Provider value={{email, setUserEmail}}>
      {children}
    </UserContext.Provider>
  )
}