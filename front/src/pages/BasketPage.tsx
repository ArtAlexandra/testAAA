
import React, { useEffect, useState } from "react";
import { User } from "../model/User";
import axios from "axios";
import { Basket } from "../model/Basket";
import { useNavigate } from "react-router-dom";
import { Button, Rate } from "antd";
import "./Shop.scss"
const BasketPage = ()=>{
    const [basket, setBasket] = useState<Basket[]>()
    const [balance, setBalance] = useState<number>(0)
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()
    const id = localStorage.getItem("userId")
    useEffect(()=>{
        

        axios.get(`/baskets/basket-user/${id}`)
        .then(response => {
            console.log(response.data)
            setBasket(response.data)
        })
        .catch(error => {
           console.error('There was an error!', error);
        });
    }, [])

  
    return(
        <div className="shop">
            <div className="shop__container">
        
        {!basket?.length ?  <p>Пока заказов нет</p> : <p>Корзина</p>}
        
        <div className="shop__goods">
        {basket?.map((item)=>{
            return(
                <div key={item.id_b} onClick={()=>navigate(`/card/${item.goods.id_g}`)} className="shop__goods_item">
                    <img src={`/image/goods/${item.goods.firstImage}`} alt={item.goods.firstImage}/>
                    <div className="shop__goods_item_desc">
                    <p>{item.goods.title} {item.goods.price}</p>
                    <p>{item.quantity}</p>
                    <Rate disabled defaultValue={item.goods.mark}/>
                    </div>
                </div>
            )
        })}
        </div>
        </div>
        </div>
    )
}
export default BasketPage;