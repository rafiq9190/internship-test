
import React,{useState} from 'react';
import {auth} from "../../firebase";
import { toast } from "react-toastify";

const Register = ()=>{

    const [email , setEmail] = useState('')


    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log('env-----> ' ,process.env.REACT_APP_REGISTER_REDIRECT_URL)
        const config = {
            url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp:true,
        };
        await auth.sendSignInLinkToEmail(email ,config);
        toast.success(
            `Email is sent to ${email}. Click the link to complete your registration.`
          );
          window.localStorage.setItem("emailForRegisteration", email);

          setEmail('');

    };

    const registerForm = ()=> <form onSubmit={handleSubmit}>

        <input type="email" value={email} 
        placeholder="Enter your Email" 
        autoFocus
        onChange={e =>setEmail(e.target.value)}
        className="form-control"

        />
        <br/>
        <button type="submit" className="btn btn-raised"> Register</button>

    </form>



    return (
        <div className="container p-5">
            <div className='row'>
                <div className="col-6 offset-md-3">
                    <h3>Register</h3>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}
export default Register