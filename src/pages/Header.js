import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Menu } from 'antd';
import {  AppstoreOutlined, SettingOutlined,UserAddOutlined,UserOutlined,LogoutOutlined } from '@ant-design/icons';
import firebase from 'firebase';
import {Link, useHistory} from "react-router-dom";

const { SubMenu , Item } = Menu;

const Header = ()=>{
  
  const dispatch = useDispatch();
const history = useHistory();
let {user} =useSelector((state)=>({...state}));

const [current,setcurrent] = useState('')

const handleClick = (e)=>{
    setcurrent(e.key)
}

const logOut =()=>{
  firebase.auth().signOut();

  dispatch({
    type:"LOGOUT",
    payload:null
  })
  history.push('/login')
}


    return(
<Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="Home" icon={<AppstoreOutlined />}>
          <Link  to="/">Home</Link>
        </Item>
        {
          !user &&
           <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="register">Register</Link>
        </Item>
        }
        {
          !user && 
          <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="login">Login</Link>
        </Item>
       
        }
      {
        user &&
        <SubMenu key="SubMenu" icon={<SettingOutlined />}
        title={user.email && user.email.split('@')[0]}
         className="float-right">
        <Menu.ItemGroup title="">
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logOut}>LogOut</Item>
        </Menu.ItemGroup>
        
      </SubMenu>

      }
        
      </Menu>


    )
}
export default Header
