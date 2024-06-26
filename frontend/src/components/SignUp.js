import './SignUp.css'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {

  const [credentials, setCredentials] = useState({name:"",email: "", password: "",cpassword:""})
    let navigate=useNavigate(); 
    const {name,email,password,cpassword}=credentials;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://inotebook-api-three.vercel.app/api/auth/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate("/");
            props.showAlert("Account Created Successfully","success");
        }
        else{
          props.showAlert("Invalid Details","danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="main">
    <form className="mainform" onSubmit={handleSubmit}>
      <div className="signuplogo fs-4 mb-1">Welcome to <span className="fs-1 ">iNotebOOk</span></div>
      <div>
        <label htmlFor="name" className="form-label">
          Name :
        </label>
          
        <input
          type="text"
          name="name"
          className="form-control"
          value={name}
          onChange={onChange}
          id="name"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
        </div>
      </div>
      <div>
        <label htmlFor="email" className="form-label">
          Email Address :
        </label>
          
        <input
          type="email"
          name="email"
          className="form-control"
          value={email}
          onChange={onChange}
          id="email"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
        </div>
      </div>
      <div>
        <label htmlFor="password" className="form-label">
          Password :
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          className="form-control"
          id="password"
          required
          minLength={5}
        />
      </div>
      <div>
        <label htmlFor="cpassword" className="form-label">
          Confirm Password :
        </label>
          
        <input
          type="password"
          name="cpassword"
          className="form-control"
          value={cpassword}
          onChange={onChange}
          id="cpassword"
          required
          minLength={5}
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
        </div>
      </div>
      <button type="submit" className="w-100 mt-4 mb-2 btn btn-outline-dark">
        Sign Up 
      </button>
    </form>
  </div>
  )
}

export default SignUp
