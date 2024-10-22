import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
import { Shops } from "../../model/Shops";



const CreateShop = ()=>{
    const navigate = useNavigate()
    const [error, setError] = useState<string>('')
      const [form] = Form.useForm();
      const [file, setFileList] = useState<File | null>(null)
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFileList(e.target.files[0]);
        }
      };
      // const A = ()=>{
      //   const uploadData = new FormData();
      // if (file) {
      //   uploadData.append('file', file);
      // }
      //   axios.post('/shops/add-photo', uploadData )
      //   .then(response => {
      //       console.log(response.data)
      //       if(response.data?.warningMessage){
               
      //           setError(response.data?.warningMessage)
      //       }
      //       else{
      //           console.log(response.data)
      //           navigate("/main")
      //       }
           
      //   }
           
      //       )
      //   .catch(error => {
           
      //       console.error('There was an error!', error);
      //   });
      // }
      const onFinish = (values: any) => {
       
        const uploadData = new FormData();
        if (file) {
          uploadData.append('file', file);
          uploadData.append('name', values.name)
          uploadData.append('address', values.address)
          uploadData.append('city', values.city)
          uploadData.append('email', values.email)
          uploadData.append('owner', values.owner)
          uploadData.append('password', values.password)
          uploadData.append('phone', values.phone)
          uploadData.append('timeWork', values.timeWork)
       

        }
   
        axios.post('/shops/create', uploadData )
        .then(response => {
            console.log(response.data)
            navigate("/loginshop")
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
    form={form}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    autoComplete="off"
    className="login__form"
  >
     <Form.Item<Shops>
      label="название"
      name="name"
      rules={[{ required: true, message: 'Пожалуйста, введите имя! Это обязательное поле' }]}
    >
         <Input/>
         </Form.Item>
    <Form.Item<Shops>
      label="email"
      name="email"
      rules={[{ required: true, message: 'Пожалуйста, введите почту! Это обязательное поле' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<Shops>
      label="пароль"
      name="password"
      rules={[{ required: true, message: 'Пожалуйста, введите пароль! Это обязательное поле' }]}
    >
      <Input.Password />
    </Form.Item>

   
     
    <Form.Item<Shops>
      label="телефон"
      name="phone"
      rules={[{ required: true, message: 'Пожалуйста, введите номер телефона! Это обязательное поле' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<Shops>
      label="собственник"
      name="owner"
      rules={[{ required: true, message: 'Пожалуйста, введите номер телефона! Это обязательное поле' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<Shops>
      label="город"
      name="city"
      rules={[{ required: true, message: 'Пожалуйста, введите номер телефона! Это обязательное поле' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<Shops>
      label="адрес"
      name="address"
      rules={[{ required: true, message: 'Пожалуйста, введите номер телефона! Это обязательное поле' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<Shops>
      label="время работы"
      name="timeWork"
      rules={[{ required: true, message: 'Пожалуйста, введите номер телефона! Это обязательное поле' }]}
    >
      <Input />
    </Form.Item>
   
    <input id="file" type="file" onChange={handleFileChange} accept="image/png, image/jpeg"/>
   
        {error &&
        <div className="login__form_error">
            <p >{error}</p>
        </div>
        }
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Создать
      </Button>
    </Form.Item>
  </Form>

  </div>
    )
}
export default CreateShop;