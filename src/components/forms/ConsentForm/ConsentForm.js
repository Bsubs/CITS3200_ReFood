import React, {useEffect, useState} from 'react'; //, { useState } 
import './ConsentForm.css';

function ConsentForm(props) {


  if (props.isNFP=="True"){
    var accept_terms_link="/listpage"
  }
  else{
    var accept_terms_link="/profile"
  }

  return (
    <div id="consent_form">
    <h1>User Agreement Form</h1>
    <br></br>
    <div>Before using the ReFood application, you must agree to the following:</div>
    <h2> For Food Businesses</h2>
    <ul>
      <li>
        All donated food will be fit for human consumption at the time it was donated.
      </li>
      <li>
        All donated food must include, where practicable, all handling requirements and time limits for safe consumption.
      </li>
      </ul>

    <h2> For Not-for-Profits</h2>
    <ul>
      <li> All collectors must have a good understanding of appropriate knowledge of safe food handling practices.</li>
      <li> The City of Joondalup provides a free online training course for food handlers <a href="https://imalert.com.au/v6/user-info.php">here</a>  </li>
    </ul>

    <h2> For Everyone</h2>
    <ul>
      <li>
      ECU is not a participant in the exchange of goods or produce between Donating Organisations or Recipients.
      </li>
      <li>
      ECU has no control on the quantity or quality of the goods or produce exchanged, or the relationship between the participants. 
      </li>
      <li>
      ECU does not investigate or guarantee the GST or charitable registration status of any participant. 
      </li>
      <li>
      To the extent permitted by law, ECU does not accept any responsibility or liability for anything which may arise from the Donating Organisations’ or Recipients’ participation in this program, or disputes arising between participants.
      </li>
    </ul>
    


      <div className="buttonsContainer">
        <button  id="exit_app_button" className="button" >
          Exit App
        </button>
        <a href={accept_terms_link}>
        <button  id="accept_terms_button" className="button">
           
          Accept and Continue
        </button>
        </a>
      </div>
      <br></br>
<br></br>
<br></br>
<br></br>
    </div>
  )
}

export default ConsentForm