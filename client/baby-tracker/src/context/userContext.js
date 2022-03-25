import React, { createContext, useState } from "react";

const defaultState = {
  email: '', 
  setUserEmail: () => {},
  firstName: '',
  setUserFirstName: () => {},
  parentId: null,
  setUserParentId: () => {},
  baby: '',
  setUserBaby: () => {}
};

export const UserContext = createContext(
  defaultState

);

export const UserContextProvider = ({children}) => {

  const [userContextEmail, setuserContextEmail] = useState(defaultState.email);

  const [userContextFirstName, setuserContextFirstName] = useState(defaultState.firstName)

  const [userContextBaby, setuserContextBaby] = useState(defaultState.baby)

  const setUserEmail = (email) => {
    setuserContextEmail(email)
  }

  const setUserFirstName = (firstName) => {
    setuserContextFirstName(firstName)
  }

  const setUserBaby = (baby) => {
    setuserContextBaby(baby)
  }


  return(
    <UserContext.Provider value={{ userContextEmail, setUserEmail, userContextFirstName, setUserFirstName, userContextBaby,  setUserBaby}}>
      {children}
    </UserContext.Provider>
  )
}