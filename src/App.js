import React, { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
//import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Explore from "./pages/Explore/Explore"
import Inbox from "./pages/Inbox"
import Orders from "./pages/Orders/Orders"
import Profile from "./pages/Profile/Profile"
import Home from "./pages/Home"
import ConsentForm from "./components/forms/ConsentForm/ConsentForm"
import Donation from "./pages/Donation/Donation"
import ListPage from "./pages/ListPage/ListPage"
import ProfileSettings from "./pages/Profile/ProfileSettings/ProfileSettings"
import IndividualProduct from "./pages/IndividualProduct/IndividualProduct"
import Favourites from "./pages/Favourites/Favourites"

//Configuring AWS Amplify 
import { Amplify, Auth } from 'aws-amplify';
import awsExports from './aws-exports';
// Authentication Module
import { signOut, Authenticator, useAuthenticator, TextField, SelectField, withAuthenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
//DO NOT import anything below this line 
Amplify.configure(awsExports);




// USE showNav VARIABLE TO DETERMINE IF PAGE SHOULD LOAD NAVBAR COMPONENT
function App({ signOut, user }) {
  const myTimeout = setTimeout(function () {
    let viewheight = window.screen.height;
    let viewwidth = window.screen.width;
    let viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
}, 300);

  //The attributes object stores the user attributes retrived from the AWS Cognito Database
  const [attributes, setAttributes] = useState({});

  //The fetch attribute function is called everytime the component is rendered
  useEffect(() => {
      fetchAttributes();
    }, []);
  
  //The fetch attributes function retrives the details of the current authenticated user and extracts the attributes field
  const fetchAttributes = async() => {
      try{
          const userData = await Auth.currentAuthenticatedUser();
      
          const attributesList = userData.attributes;
          setAttributes(attributesList);
      } catch (error) {
          console.log('error in fetching user data', error);
      }

  };

  var isNFP;

  if (attributes['custom:type'] == "Donor") {
    isNFP="False";
  }
  else {
    isNFP = "True";
  }


  let component;
  switch(window.location.pathname){

    case "/":
      return <ConsentForm isNFP={isNFP}/>
    case "/explore":
      component = <Explore userInfo={attributes}/>
      var showNav = "True";
      break
    case "/profilesettings":
      component = <ProfileSettings />
      var showNav = "True";
      break
    case "/inbox":
      component = <Inbox />
      var showNav = "True";
      break
    case "/orders":
      if (isNFP=="False"){
        component = <Orders isNFP={isNFP} userInfo={attributes}/>
      }
      
      else{
        component = <Favourites isNFP={isNFP} userInfo={attributes}/>
      }
      var showNav = "True";
      break
    case "/consentform":
      component = <ConsentForm isNFP={isNFP}/>
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
    case "/listpage":
      component = <ListPage userInfo={attributes}/>
      var showNav= "True";
      break

    case "/individualproduct":
      component=<IndividualProduct />
      var showNav="True";
      break
   
    default:
      component = <Donation/>
      var showNav = "False";

  }
  return (
    <Authenticator
    // Default to Sign Up screen
    initialState="signUp"
    // Customize `Authenticator.SignUp.FormFields`
    signUpAttributes={[
      'email',
      'name',
      'phone_number',
      'custom:address',
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
                name="custom:address"
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
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, autoRotate:disabled"></meta>
      <header className="App-header">
        <>
      {component}
      {showNav == "True" &&
      <Navbar isNFP={isNFP}/> }
      </>
      </header>
      
    </div>
    )}
  </Authenticator>
  );
}
export default App;