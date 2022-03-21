import React, { Fragment } from 'react'

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "../src/index.scss";

import Button from "../src/components/Button";
import Navbar from "../src/components/Navbar";

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
  .add("Loggen In", () => <Navbar loggedIn username="John"></Navbar>)
  .add("Not logged in", () => <Navbar></Navbar>)

  
