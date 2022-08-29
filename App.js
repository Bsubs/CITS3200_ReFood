import React from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
import Explore from "./pages/Explore"
import Inbox from "./pages/Inbox"
import Orders from "./pages/Orders"
import Profile from "./pages/Profile"

function App() {
  let component
  switch(window.location.pathname){
    case "/":
      component = <App/>
      break
    case "/explore":
      component = <Explore />
      break
    case "/inbox":
      component = <Inbox />
      break
    case "/orders":
      component = <Orders />
      break
    case "/profile":
      component = <Profile />
      break
    default:
      component = <App/>
      break
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <>
      {component}
      <Navbar />
      </>
      </header>
    </div>
  );
}

export default App;
