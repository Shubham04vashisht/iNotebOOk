import './Login.css'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let navigate=useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            props.showAlert("Logged In Successfully","success");
            navigate("/");
        }
        else{
            props.showAlert("User Not Found","danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div className="mainlogin">
      <form className="mainformlogin" onSubmit={handleSubmit}>
        <div className="fs-4 mb-4">Welcome to <span className="fs-1 ">iNotebOOk</span></div>
        <div>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email Address :
          </label>
            
          <input
            type="email"
            name="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
          </div>
        </div>
        <div>
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password :
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn w-100 mt-5 mb-2 btn-outline-dark">
          Login 
        </button>
      </form>
    </div>
  );
};

export default Login;
