import React, {useEffect, useState} from "react";
import { Rate } from 'antd'
import { Select } from 'antd';

import { useNavigate, useParams } from "react-router-dom";
import { Shops } from "../model/Shops";
import axios from "axios";
import { GoodsCatalog } from "../model/GoodsCatalog";
import "./Shop.scss"



const Shop = ()=>{
  const { id } = useParams<string>();
  const [shop, setShop] = useState<Shops>()
  const [goods, setGoods] = useState<GoodsCatalog[]>([])
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get(`/shops/get-shop/${id}`,
      {
        headers:{
            'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
        }
    }
    )
    .then(response => {
       setShop(response.data)
    })
    .catch(error => {
       setError(error.response.data.warning)
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

    return(
        <div className="shop">
           <div className="shop__container">
            <p className="">{shop?.name}</p>
            <p>{shop?.city}, {shop?.address}</p>
            <p>{shop?.email}</p>
            <p>{shop?.phone}</p>
            <p>{shop?.timeWork}</p>

            <img src={`/image/shops/${shop?.image}`} alt={shop?.name}/>

            <p>Товары</p>
            {error && <p>{error}</p>}
            {goods?.length && !error && 
            <div className="shop__goods">

            {goods?.map((item)=>{
              return(
                <div key={item.id_g} onClick={()=>navigate(`/card/${item.id_g}`)} className="shop__goods_item">
                  <img src={`/image/goods/${item?.firstImage}`} alt={item.title}/>
                  <div className="shop__goods_item_desc">
                  <p>{item.title},{item.price} ₽</p>
                  <Rate disabled defaultValue={item.mark}/>
                    </div>
                  

                </div>
              )
            })
            }
            
            </div>
            }
            </div>
        </div>
    )
}
export default Shop;