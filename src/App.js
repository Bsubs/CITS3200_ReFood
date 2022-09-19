import React from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
//import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Explore from "./pages/Explore/Explore"
import Inbox from "./pages/Inbox"
import Orders from "./pages/Orders"
import Profile from "./pages/Profile/Profile"
import Home from "./pages/Home"
import ConsentForm from "./components/forms/ConsentForm/ConsentForm"
import Donation from "./pages/Donation/Donation"
import { useState } from 'react';
//Configuring AWS Amplify 
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
// Authentication Module
import { signOut, Authenticator, useAuthenticator, TextField, SelectField } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
Amplify.configure(awsExports);


// USE showNav VARIABLE TO DETERMINE IF PAGE SHOULD LOAD NAVBAR COMPONENT
function App({ signOut, user }) {

  let component
  switch(window.location.pathname){
    case "/":
      return <ConsentForm/>
    case "/explore":
      component = <Explore />
      var showNav = "True";
      break
    case "/inbox":
      component = <Inbox />
      var showNav = "True";
      break
    case "/orders":
      component = <Orders />
      var showNav = "True";
      break
    case "/consentform":
      component = <ConsentForm/>
      var showNav = "True";
      break
    case "/profile":
      component = <Profile />
      var showNav = "True";
      break
    case "/donation":
      component = <Donation />
      var showNav = "False";
      break
  }
  return (
    <Authenticator
    // Default to Sign Up screen
    initialState="signUp"
    // Customize `Authenticator.SignUp.FormFields`
    signUpAttributes={[
      'address',
      'email',
      'family_name',
      'given_name',
      'phone_number',
      'custom:business_name',
      'custom:type',
      'custom:abn',
    ]}
    components={{
      SignUp: {
        FormFields() {
          const { validationErrors } = useAuthenticator();

          return (
            <>
              {/* Re-use default `Authenticator.SignUp.FormFields` */}
              <Authenticator.SignUp.FormFields />
              <TextField
                name="custom:business_name"
                placeholder='Business Name'
              />
              <TextField
                name="address"
                placeholder='Address of Business'
              />
              <TextField
                name='custom:abn'
                placeholder='ABN'
              />
              <SelectField
                name='custom:type'
                placeholder='Select Type of Business'
              >
                <option value="Donor">Donor</option>
                <option value="Collector">Collector</option>
              </SelectField>
            </>
          );
        },
      },
    }}
  >
    {({ signOut, user }) => (
      <div className="App">
      <header className="App-header">
        <>
      {component}
      {showNav == "True" &&
      <Navbar/> }
      </>
      </header>
      <button onClick={signOut}>Sign out</button>
    </div>
    )}
  </Authenticator>
  );
}
export default App;