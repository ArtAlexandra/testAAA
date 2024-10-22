import React from "react";
import { ShoppingCartOutlined}  from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { useNavigate } from "react-router-dom";
//import {come} from "../../public/come.svg"
const { Header } = Layout;


const Navbar = ()=>{
  const navigate = useNavigate()
  const name = localStorage.getItem("username")
    return(
<Layout className="layout">
    <Header style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white' }}>
      <Menu  mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" onClick={()=>navigate("/catalog")}>Каталог</Menu.Item>
        <Menu.Item key="2" onClick={()=>navigate("/shops")}>Магазины</Menu.Item>
      
      </Menu>
      <div>
        <span>Добрый день!  </span>
        <Button onClick={()=>navigate('/basketpage')} style={{ marginRight: '10px' }}>Корзина</Button>
        <Button onClick={()=>navigate('/userpage')}>Личный кабинет</Button>
        
       <img src='/come.svg' alt="come" onClick={()=>navigate('/login')}/>

      </div>
    </Header>
  </Layout>
    )
}
export default Navbar;