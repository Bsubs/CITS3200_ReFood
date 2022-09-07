import React, { useState } from 'react'
import './LoginForm.css';
import loginform from './logo.png'

function LoginForm({Login, error}) {
  const[details, setDetails] = useState({company_name: "", email: "", password: ""});

  const submitHandler = e => {
    e.preventDefault();

    Login(details);
  }
  return (
    <form onSubmit={submitHandler}>
       <div className='form-inner'>
            <center><p>Sign up to Refood</p></center>
            {/* ERROR! */}
            <div className="form-group">
                <input type="text" name="company_name" id="company_name" placeholder="Company Name" onChange={e => setDetails({...details, company_name: e.target.value})} value={details.company_name}/>
            </div>

            <div className="form-group">
                <input type="email" name="email" id="email" placeholder="Email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
            </div>

            <div className="form-group">
                <input type="password" name="password" id="password" placeholder="Password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
            </div>

            <input type="submit" id="Submit" value="Continue" />   

            <button class="button"><img src="./logo.png" id="login_logo" />Log in with Details</button>

        </div> 
    </form>
  )

}

export default LoginForm
