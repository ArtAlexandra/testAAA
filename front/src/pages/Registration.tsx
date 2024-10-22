
import React, {useState} from "react";
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import "./Login.scss"
import axios from "axios";
import { useNavigate } from "react-router-dom";
type FieldType = {
    email?: string;
    password?: string;
    username?:string;
    balance?:number;
    phone?:string;
  };
  
//   const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };
  
const Registration = ()=>{
    const navigate = useNavigate()
    const [error, setError] = useState<string>('')
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        values.balance = 0
        axios.post('/users/signin', values)
        .then(response => {
                console.log(response.data)
                navigate("/login")
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

    <Form.Item<FieldType>
      label="имя"
      name="username"
      rules={[{ required: true, message: 'Пожалуйста, введите имя! Это обязательное поле' }]}
    >
      <Input/>
    </Form.Item>
    <Form.Item<FieldType>
      label="телефон"
      name="phone"
      rules={[{ required: true, message: 'Пожалуйста, введите номер телефона! Это обязательное поле' }]}
    >
      <Input />
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
  </Form>
        </div>
    )
}
export default Registration;