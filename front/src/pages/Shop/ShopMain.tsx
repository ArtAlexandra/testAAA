import React,{useEffect, useState} from "react";
import { Shops } from "../../model/Shops";
import axios from "axios";
import { GoodsBig } from "../../model/GoodsBig";
import { GoodsCatalog } from "../../model/GoodsCatalog";
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Rate } from 'antd';
import { useNavigate } from "react-router-dom";
import "./ShopMain.scss"
import { TypeClothes } from "../../model/TypeClothes";
import { Select } from "antd";
import { OptionProps } from "antd/lib/select";

const { Option } = Select;




type FieldType = {
    title?:string;
    price?:number;
    article?:string;
    quantity?:number;
    description?:string;
    mark?:number;
    composition?:string;
    state?:string;
    typeId?:number;
    shopId?:number;

  };

const ShopMain = ()=>{
    const [shop, setShop] = useState<Shops>()
    const id = localStorage.getItem("shopId")
    const [form] = Form.useForm();
    const [selectType, setSelectType] =useState<number>(0)
    const [error, setError] = useState<string>('')
    const [goods, setGoods] = useState<GoodsCatalog[]>()
    const [type, setType] = useState<TypeClothes[]>()
    const [addGoods, setAddGoods] = useState<boolean>(false)
    const navigate = useNavigate()
    const [file, setFileList] = useState<File | null>(null)
    const [addType, setAddType] = useState<string>()
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFileList(e.target.files[0]);
        }
      };
 
    useEffect(()=>{
      axios.get(`/type-clothes/get-all`)
        .then(response => {
          console.log(response.data)
         
            setType(response.data)
            setError('')
          
           
        })
        .catch(error => {
           setError(error.response.data.warning)
            console.error('There was an error!', error);
        });
        axios.get(`/shops/get-shop/${id}`,
          {
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
            }
        }
        )
        .then(response => {
          console.log(response.data)
        
            setShop(response.data)
            setError('')
          
           
        })
        .catch(error => {
           
            console.error('There was an error!', error);
        });

        axios.get(`/goods/get-goodshopsid/${id}`,
          {
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
            }
        }
        )
        .then(response => {
          console.log(response.data)
         
            setGoods(response.data)
            setError('')
          
           
        })
        .catch(error => {
           setError(error.response.data.warning)
            console.error('There was an error!', error);
        });
    }, [])

    const Delete = (id:number)=>{
      ///goods-delete/
      axios.delete(`/goods/goods-delete/${id}`,
        {
          headers:{
              'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
          }
      }
      )
      .then(response => {
        console.log(response.data)
        if(typeof(response.data)==="string"){
          setError(response.data)
        }
        else{
          axios.get(`/goods/get-goodshopsid/${id}`,
            {
              headers:{
                  'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
              }
          }
          )
          .then(response => {
            console.log(response.data)
            if(typeof(response.data)==="string"){
              setError(response.data)
            }
            else{
              setGoods(response.data)
              setError('')
            }
             
          })
          .catch(error => {
             
              console.error('There was an error!', error);
          });
         
        }
         
      })
      .catch(error => {
         
          console.error('There was an error!', error);
      });
    }

   
    const onFinish= (values:any) => {
        const uploadData = new FormData();
        values.shopId = localStorage.getItem("shopId")
        values.typeId =  selectType
        if (file) {
          uploadData.append('file', file)
          uploadData.append('title', values.title)
          uploadData.append('price', values.price)
          uploadData.append('article', values.article)
          uploadData.append('quantity', values.quantity)
          uploadData.append('description', values.description)
          uploadData.append('mark', values.mark)
          uploadData.append('composition', values.composition)
          uploadData.append('state', values.state)
          uploadData.append('typeId', values.typeId)
          uploadData.append('shopId', values.shopId)

        }
        axios.post('/goods/create', uploadData,
          {
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
            }
        }
        )
        .then(response => {
            console.log(response.data)
            if(response.data?.warningMessage){
               
                setError(response.data?.warningMessage)
            }
            else{
                console.log(response.data)
                //navigate("/main")
            }
           
        }
           
            )
        .catch(error => {
           
            console.error('There was an error!', error);
        });
      };

      const CreateType = ()=>{
        const data = {
          name:addType
        }
        axios.post('/type-clothes/create', data)
        .then(response => {
            console.log(response.data)
            setAddType('')
            if(response.data?.warningMessage || typeof(response.data)==="string"){
               
                setError(response.data?.warningMessage || response.data)
            }
           
           
        }
           
            )
        .catch(error => {
           
            console.error('There was an error!', error);
        })
      }
    return(
        <div className="shopmain">
          <div className="shopmain__container">
          <img src='/come.svg' alt="come" onClick={()=>navigate('/login')}/>

          <div className="shopmain__main">
          {error && <p>{error}</p>}
            <p>Название: {shop?.name}</p>
            <p>Собственник: {shop?.owner}</p>
            <p>Почта: {shop?.email}</p>
            <p>Телефон: {shop?.phone}</p>
            <p>Адрес: {shop?.city}, {shop?.address}</p>
            <p>График работы: {shop?.timeWork}</p>
            
            <img src={`/image/shops/${shop?.image}`} alt={shop?.image}/>

          </div>
         

           

            <div className="shopmain__addtype">
              <Input value={addType} onChange={(e)=>setAddType(e.target.value)} placeholder="тип одежды" width={'10'}/>
              <Button onClick={CreateType}>Добавить</Button>
            </div>
            <Button type="primary" onClick={()=>setAddGoods(true)} style={{marginTop:'10px', marginBottom:'10px'}}>Добавить товар</Button>
            {addGoods && 
            <div>

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
    <Form.Item<FieldType>
      label="название"
      name="title"
      rules={[{ required: true, message: 'Пожалуйста, введите почту! Это обязательное поле' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="стоимость"
      name="price"
      rules={[{ required: true, message: 'Пожалуйста, введите пароль! Это обязательное поле' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="артикул"
      name="article"
      rules={[{ required: true, message: 'Пожалуйста, введите имя! Это обязательное поле' }]}
    >
      <Input/>
    </Form.Item>
    <Form.Item<FieldType>
      label="кол-во"
      name="quantity"
      rules={[{ required: true, message: 'Пожалуйста, введите номер телефона! Это обязательное поле' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="описание"
      name="description"
      rules={[{ required: true, message: 'Пожалуйста, введите номер телефона! Это обязательное поле' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="оценка"
      name="mark"
      rules={[{ required: true, message: 'Пожалуйста, введите номер телефона! Это обязательное поле' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="состав"
      name="composition"
      rules={[{ required: true, message: 'Пожалуйста, введите номер телефона! Это обязательное поле' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="страна"
      name="state"
      rules={[{ required: true, message: 'Пожалуйста, введите номер телефона! Это обязательное поле' }]}
    >
      <Input />
    </Form.Item>
    
    <Form.Item<FieldType>
      label="вид"
      name="typeId"
      rules={[{ required: true, message: 'Пожалуйста, введите номер телефона! Это обязательное поле' }]}
    >
      {/* <Input /> */}
      <Select  style={{ width: 200 }} onChange={(e)=>setSelectType(e)}>
      {type?.map((item)=>{
        return(
          <Option value={item.id}>{item.name}</Option>
        )
      })}
      
      
    </Select>
    </Form.Item>
    <input id="file" type="file" onChange={handleFileChange} accept="image/png, image/jpeg"/>

   
        {error &&
        <div className="login__form_error">
            <p >{error}</p>
        </div>
        }
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Добавить
      </Button>
    </Form.Item>
  </Form>
            </div>
            }
            <div className="shopmain__goods">
            {goods?.map((item)=>{
                return(
                    <div className="shopmain__goods_item" key={item.id_g}>
                        <img src={`/image/goods/${item.firstImage}`} alt={item.firstImage}/>
                        <p>{item.title}</p>
                        <p>Цена: {item.price} ₽</p>
                        <p>Артикул: {item.article}</p>
                        <p>Состав: {item.composition}</p>
                        <Rate disabled defaultValue={Number(item.mark)}/>
                       
                        <p>Количество: {item.quantity} штук</p>
                        <p>Страна: {item.state}</p>
                       <Button type="primary" onClick={()=>Delete(item.id_g)}>Удалить</Button>
                    </div>
                )
            })}
            </div>

            </div>
        </div>
    )
}

export default ShopMain;