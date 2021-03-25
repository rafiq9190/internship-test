
import React,{useState} from 'react';
import {auth,googleAuthProvider} from "../../firebase";
import { toast } from "react-toastify";
import {Button} from 'antd';
import { MailOutlined,GoogleOutlined } from '@ant-design/icons';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';


const Login = ({history})=>{

    const [email , setEmail] = useState('muhammadrafiq017@gmail.com')
    const [password, setPassword] =useState('123456')
    const [Loading, setLoading] = useState(false);

    const dispatch= useDispatch();
    const {user} =useSelector((state)=>({...state}));


    
    const handleSubmit = async(e)=>{
      try {
        e.preventDefault();
        setLoading(true)
        const results =await auth.signInWithEmailAndPassword(email, password);
        
        const {user} =results;
        const idTokenResults = await user.getIdTokenResult()
            
        dispatch({
            type:"LOGGED-IN-USER",
            payload:{
                email:user.email,
                token:idTokenResults.token
            }
        })
        history.push('/')
      } catch (error) {
          toast.error(error.message);
          setLoading(false)
      }
    };
    const  googleLogin = async()=>{

        auth.signInWithPopup(googleAuthProvider).then((result)=>{
          const {user} =result;
          const idTokenResults =  user.getIdTokenResult()

          dispatch({
            type:"LOGGED_IN_USER",
            payload:{
              email:user.email,
              token:idTokenResults.token,
            }
          });
          history.push('/')
        }).catch((err)=>{
          toast.error(err.message)
        })


    }


    const loginForm = ()=> <form onSubmit={handleSubmit}>

        <input type="email" value={email} 
        placeholder="Enter your Email" 
        autoFocus
        onChange={e =>setEmail(e.target.value)}
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
        <Button 
        icon={<MailOutlined/>}
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        disabled={!email || password.length<6}

        > Login with Email/Password</Button>

    </form>



    return (
        <div className="container p-5">
            <div className='row'>
                <div className="col-6 offset-md-3">

                {Loading ?(<h4 className="text-danger">Loading</h4>):(<h4>Login</h4>)}
                
                {loginForm()}
            

                    <Button
                        type="danger"
                        shape="round"
                        className="mb-3"
                        block
                        icon={<GoogleOutlined/>}
                        size="large"
                        
                        onClick={googleLogin}
                        >Login with Google
                    </Button>
                    
                </div>
            </div>
        </div>
    )
}
export default Login