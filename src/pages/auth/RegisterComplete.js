
import React,{useState,useEffect} from 'react';
import {auth} from "../../firebase";
import { toast } from "react-toastify";

const RegisterComplete = ({history})=>{

    const [email , setEmail] = useState('');
    const [password, setPassword]= useState('')

    useEffect(()=>{
        setEmail(window.localStorage.getItem('emailForRegisteration',email))
    })
    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        if(!email || !password){
            toast.error("Email or Password required")
        }

        if(password.length < 6){
            toast.error("Password should atleast 6 charater")
        }

        try {
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href
            );

            if(result.user.emailVerified){
                window.localStorage.removeItem("emailForRegisteration")

                let user = auth.currentUser;

                await user.updatePassword(password)

                const idtoken = user.getIdTokenResult()
                console.log('user',user, 'idtoken',result)

                history.push('/')

            }

        } catch (error) {
            toast.error(error.message)
        }
       
    };

    const registerCompleteForm = ()=> <form onSubmit={handleSubmit}>

        <input type="email" value={email} 
        placeholder="Enter your Email" 
        autoFocus
        disabled
        className="form-control"

        />
        <br/>
        <input type="password" value={password} 
        placeholder="Enter your Password" 
        autoFocus
        onChange={e =>setPassword(e.target.value)}
        className="form-control"

        />
        <br/>
        <button type="submit" className="btn btn-raised"> Register Complete</button>

    </form>



    return (
        <div className="container p-5">
            <div className='row'>
                <div className="col-6 offset-md-3">
                    <h3>Register Complete</h3>
                    {registerCompleteForm()}
                </div>
            </div>
        </div>
    )
}
export default RegisterComplete