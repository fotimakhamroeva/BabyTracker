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

  const [userContextEmail, setuserContextEmail] = useState(defaultState.email);

  const [userContextFirstName, setuserContextFirstName] = useState(defaultState.firstName)

  const setUserEmail = (email) => {
    setuserContextEmail(email)
  }

  const setUserFirstName = (firstName) => {
    setuserContextFirstName(firstName)
  }

  return(
    <UserContext.Provider value={{ userContextEmail, setUserEmail, userContextFirstName, setUserFirstName }}>
      {children}
    </UserContext.Provider>
  )
}