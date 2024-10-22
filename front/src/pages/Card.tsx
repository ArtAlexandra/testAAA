import React, {useEffect, useState} from "react";
import { Button, Rate } from 'antd'
import { Select } from 'antd';

import { useParams } from "react-router-dom";
import { Shops } from "../model/Shops";
import axios from "axios";
import { GoodsCard } from "../model/GoodsCard";
import "./Card.scss"
import { ShoppingCartOutlined } from '@ant-design/icons';

const Card = ()=>{
  const { id } = useParams<string>();
  const [goods, setGoods] = useState<GoodsCard>({
    id_g: 0,
    title: "",
    price: 0,
    firstImage: "",
    article:"",
    quantity: 0,
    description: "",
    mark: 0,
    composition: "",
    state: "",
    typeName: "",
    shopName: "",
    image: [],
    size: []
  })
  const [quantity, setQuantity] = useState<number>(1)
  const [info, setInfo] = useState<string>('')
  useEffect(()=>{
    axios.get(`/goods/get-goodsimages/${id}`)
    .then(response => {
       setGoods(response.data)
    })
    .catch(error => {
       
        console.error('There was an error!', error);
    });
  }, [])

  const AddInBasket = ()=>{
    const data = {
      userId:localStorage.getItem("userId"),
      goodsId:goods?.id_g,
      quantity:quantity,
      description:"",
      payment:false,
      discount:0
    }
    axios.post(`/baskets/create-basket`, data)
    .then(response => {
      console.log(response.data)
      if(response.data?.warningMessage){
        setInfo(response.data?.warningMessage)
      }
      else{
        setInfo("Товар успешно добавлен в карзину")
        let q = goods.quantity - quantity
        setGoods(prevUser => ({
          ...prevUser,
          quantity: q
        }));
      }
    })
    .catch(error => {
       
        console.error('There was an error!', error);
    });
  }
    return(
        <div className="card">
          <div className="card__card">
         
          <img src={`/image/goods/${goods?.firstImage}`} alt={goods?.firstImage}/>
          </div>
          <div className="card__details">
            <div className="card__title">
            <p>{goods?.title}, {goods?.price} ₽</p>
            {goods?.mark && <Rate disabled defaultValue={goods.mark}/>}
            {info && <p>{info}</p>}
            <input type="number" value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}/>
            <Button type="primary" onClick={AddInBasket}>Добавить в <ShoppingCartOutlined style={{ fontSize: '24px' }} /></Button>

            </div>
          <p>Состав: {goods?.composition}</p>
          <p>Страна: {goods?.state}</p>
          <p>Артикул: {goods?.article}</p>
          <p>Тип: {goods?.typeName}</p>
          <p>Магазин: {goods?.shopName}</p>
          <p>Описание: {goods?.description}</p>

          {goods?.quantity && <p>В наличии {goods.quantity} штук</p>}
          {goods?.size[0] && <p>Размеры:</p>}
          {goods?.size.map((i)=>{
            return(
              <p>{i}</p>
            )
          })}

          </div>
          
         
        </div>
    )
}
export default Card;