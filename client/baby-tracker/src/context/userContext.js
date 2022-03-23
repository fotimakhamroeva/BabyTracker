import React, { createContext, useState } from "react";

const defaultState = {
  email: '', 
  setUserEmail: () => {},
  firstName: '',
  setUserFirstName: () => {}
};

export const UserContext = createContext(
  defaultState

);

export const UserContextProvider = ({children}) => {

  const [email, setEmail] = useState(defaultState.email);

  const [firstName, setFirstName] = useState(defaultState.firstName)

  const setUserEmail = (email) => {
    setEmail(email)
  }

  const setUserFirstName = (firstName) => {
    setFirstName(firstName)
  }

  return(
    <UserContext.Provider value={{ email, setUserEmail, firstName, setUserFirstName }}>
      {children}
    </UserContext.Provider>
  )
}