import React, { Fragment } from 'react'

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "../src/index.scss";

import Button from "../src/components/Button";
import Navbar from "../src/components/Navbar";
import RegistrationPage from '../src/components/RegistrationPage';
import BabyList from '../src/components/BabyList';
import BabyListItem from '../src/components/BabyListItem'
import NewBaby from '../src/components/NewBaby';
import LogCalendar from '../src/components/LogCalendar';
import LogList from '../src/components/LogList';
import BabyInfo from '../src/components/BabyInfo';

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))

storiesOf("Navbar", module)
  .addParameters({
    backgrounds: [{value: "#FFFFFF"}]
  })
  .add("Logged In", () => <Navbar username="John" onClick={action("logout")}></Navbar>)
  .add("Not logged in", () => <Navbar handleLogin={action("login")} handleRegister={action("register")}></Navbar>)

storiesOf("Registration page", module)
  .add("Register", () => <RegistrationPage register={action("register")}/>)
  
storiesOf("Baby List item", module)
  .add("item", () => <BabyListItem name='John' image='example.src'/>)
  .add("empty item", () => <BabyListItem />)

storiesOf("Baby List", module)
  .add("BabyList", () => <BabyList babies={[{name: 'John', image: 'examplepicture'}]}/>)

storiesOf("New baby form", module)
  .add("New baby", () => <NewBaby />)

storiesOf("Log List", module)
  .add("Calendar", () => <LogCalendar />)
  .add("List", () => <LogList />)

storiesOf("Baby Info", module) 
  .addParameters({
    backgrounds: [{ name: "dark", value: "aliceblue", default: true }]
  })
  .add("Info", () => <BabyInfo babyName="Bob" dateOfBirth="Jan 1st, 2022" birthLocation="Home" babyPic="https://cdn-icons-png.flaticon.com/512/191/191526.png" />)