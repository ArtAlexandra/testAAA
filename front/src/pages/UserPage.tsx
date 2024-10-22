import React, { useEffect, useState } from "react";
import { User } from "../model/User";
import axios from "axios";
import { Basket } from "../model/Basket";
import { useNavigate } from "react-router-dom";
import { Button, Rate } from "antd";
import "./Shop.scss"

const UserPage = ()=>{
    const [user, setUser] = useState<User>()
    const [basket, setBasket] = useState<Basket[]>()
    const [balance, setBalance] = useState<number>(0)
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()
    const id = localStorage.getItem("userId")
    useEffect(()=>{
        axios.get(`/users/get-user/${id}`,
            {
                headers:{
                    'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
                }
            }
        )
        .then(response => {
            console.log(response.data)
            setUser(response.data)
            setError('')
        })
        .catch(error => {
            setError(error.response.data.warning)
           console.error('There was an error!', error);
        });

        axios.get(`/baskets/basket-user/${id}`,
            {
                headers:{
                    'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
                }
            }
        )
        .then(response => {
            console.log(response.data)
            setBasket(response.data)
        })
        .catch(error => {
           console.error('There was an error!', error);
        });
    }, [])

    const changeBalance = ()=>{
        const data = {
            id:localStorage.getItem('userId'),
            balance: balance
        }
        axios.patch(`/users/add-balance`, data,
            {
                headers:{
                    'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
                }
            }
        )
        .then(response => {
            console.log(response.data)
            // if(typeof(response.data)==="string"){
            //     setError(response.data)
            // }
            // else{
            //     setUser(response.data)
            //     setBalance(0)
            // }

            setUser(response.data)
            setBalance(0)
            setError('')
        })
        .catch(error => {
            setError(error.response.data.warning)
           console.error('There was an error!', error);
        });
    }
    return(
        <div className="shop">
            <div className="shop__container">
        <p>{user?.username}</p>
        <p>Телефон: {user?.phone}</p>
        <p>Почта: {user?.email}</p>
        <p>Баланс: {user?.balance}</p>
        {error && <p style={{color:'red'}}>{error}</p>}
        <input type="number" value={balance} onChange={(e)=>setBalance(Number(e.target.value))}/>
        <Button onClick={changeBalance}>Пополнить баланс</Button>
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
export default UserPage;