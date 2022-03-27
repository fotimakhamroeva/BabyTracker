import React, { createContext, useState } from "react";
import Cookies from 'js-cookie';

const defaultState = {
  email: Cookies.get('user_email'), 
  setUserEmail: () => {},
  firstName: Cookies.get('user_first_name'),
  setUserFirstName: () => {},
  parentId: null,
  setUserParentId: () => {},
  baby: '',
  setUserBaby: () => {}
};

export const UserContext = createContext(
  defaultState
);

export const UserContextProvider = (props) => {
  const [userContextEmail, setuserContextEmail] = useState(defaultState.email);
  const [userContextFirstName, setuserContextFirstName] = useState(defaultState.firstName)

  const setUserEmail = (email) => {
    if (email) {
      Cookies.set('user_email', email);
    } else {
      Cookies.remove('user_email');
      Cookies.remove('BabyTrackerSession');
      Cookies.remove('BabyTrackerSession.sig');
    }
    setuserContextEmail(email)
  }
  const setUserFirstName = (firstName) => {
    if (firstName) {
      Cookies.set('user_first_name', firstName);
    } else {
      Cookies.remove('user_first_name');
      Cookies.remove('BabyTrackerSession');
      Cookies.remove('BabyTrackerSession.sig');
    }
    setuserContextFirstName(firstName)
  }

  return(
    <UserContext.Provider value={{ userContextEmail, setUserEmail, userContextFirstName, setUserFirstName, isUserLoggedIn: props.isUserLoggedIn, setUserLoggedIn: props.setUserLoggedIn }}>
      {props.children}
    </UserContext.Provider>
  )
}