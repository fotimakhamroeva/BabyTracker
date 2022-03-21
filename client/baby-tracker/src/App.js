import React from "react";
import Button from './components/Button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
        <Button danger>Cancel</Button>
        <Button confirm>Login</Button>
      </body>
    </div>
  );
}

export default App;
