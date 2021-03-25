import React ,{useEffect}from 'react';
import {Switch,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {auth} from './firebase'
import{useDispatch} from 'react-redux';

import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Header from './pages/Header';
import RegisterComplete from './pages/auth/RegisterComplete';





const  App =()=> {

const dispatch = useDispatch();

useEffect(()=>{

const unsubscribe = auth.onAuthStateChanged(async(user)=>{
  if(user){
    const idTokenResult = await user.getIdTokenResult()

    dispatch({
      type:"LOGGED-IN-USER",
      payload:{
        email:user.email,
        token:idTokenResult.token,

      }
    })

  }
})
return ()=>unsubscribe()
},[])
  return (
    <div className="App">
       <Header/>
       <ToastContainer/>
      <Switch>
     
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/register/complete" component={RegisterComplete}/>
      
   
    
    </Switch>
    </div>
  );
}

export default App
