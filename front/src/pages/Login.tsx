
import React, {useState} from "react";
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import "./Login.scss"
import axios from "axios";
import { useNavigate } from "react-router-dom";
type FieldType = {
    email?: string;
    password?: string;
  };
  
//   const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };
  
const Login = ()=>{
    const navigate = useNavigate()
    const [error, setError] = useState<string>('')
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        axios.post('/users/login', values)
        .then(response => {
          localStorage.setItem("access_token", response.data.access_token)
          localStorage.setItem("userId", response.data.id)
            // if(response.data?.warningMessage){
               
            //     setError(response.data?.warningMessage)
            // }
            // else{
                console.log(response.data)
                //localStorage.setItem("username", response.data?.username)
                //localStorage.setItem("userId", response.data?.id)

               navigate("/catalog")
            
           
        }
           
            )
        .catch(error => {
           
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
    <Button onClick={()=>navigate('/registration')}>!Регистрация</Button>
    <Button onClick={()=>navigate('/loginshop')}>Магазин</Button>
  </Form>
 

        </div>
    )
}
export default Login;