
import React, {useState} from "react";
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import "../Login.scss"
import axios from "axios";
import { useNavigate } from "react-router-dom";
type FieldType = {
    email?: string;
    password?: string;
  };
  

  
const LoginShop = ()=>{
    const navigate = useNavigate()
    const [error, setError] = useState<string>('')
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        axios.post('/shops/shop-login', values)
        .then(response => {
           
                console.log(response.data)
                localStorage.setItem("access_token", response.data.access_token)
                // localStorage.setItem("name", response.data?.name)
                localStorage.setItem("shopId", response.data.id)
                setError('')
                navigate("/mainshop")
            
           
        }
           
            )
        .catch(error => {
           setError(error.response.data.warning)
            console.error('There was an error!', error);
        });
      };
    return(
        <div className="login">
             <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    autoComplete="off"
    className="login__form"
  >
    <Form.Item<FieldType>
      label="email"
      name="email"
      rules={[{ required: true, message: 'Пожалуйста, введите почту! Это обязательное поле' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="пароль"
      name="password"
      rules={[{ required: true, message: 'Пожалуйста, введите пароль! Это обязательное поле' }]}
    >
      <Input.Password />
    </Form.Item>

   
        {error &&
        <div className="login__form_error">
            <p >{error}</p>
        </div>
        }
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Войти
      </Button>
    </Form.Item>
  <Button onClick={()=>navigate('/createshop')}>Регистрация магазина</Button>

  </Form>
        </div>
    )
}
export default LoginShop;