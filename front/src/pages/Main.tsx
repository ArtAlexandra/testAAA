import React, { useEffect, useState } from "react";
import axios from "axios";
import { Shops } from "../model/Shops";
import { useNavigate } from "react-router-dom";
import "./Main.scss"



const Main = ()=>{
    const [search, setSearch] = useState<string>('')
    const [shopCity, setShopCity] =  useState<Shops[]|null>()
    const navigate = useNavigate()
    const [shops, setShops] = useState<Shops[]|null>(null)
    useEffect(()=>{
        axios.get('/shops/get-all')
        .then(response => {
           console.log(response.data)
           setShops(response.data)
           
        })
        .catch(error => {
           
            console.error('There was an error!', error);
        });
    }, [])
    const SearchShop =(e:string)=>{
        setSearch(e)
        if(e.length >=3){
            axios.get(`/shops/get-shops/${e}`)
            .then(response => {
               setShopCity(response.data)
            })
            .catch(error => {
               
                console.error('There was an error!', error);
            });
        }
    }
    return(
        <div className="main">
            <div className="main__container">
            {/* <p>Каталог</p>
            <input type="text" placeholder="Город" value={search} onChange={(e)=>SearchShop(e.target.value)}/>
            {shopCity?.map((item)=>{
                return(
                    <p key={item.id}>{item.name} {item.address}</p>
                )
            })} */}


            {!shops && <p>Ой, пока нет ни одного магазина</p>}
            {shops && 
            <div className="main__list">
                {shops.map((shop)=>{
                    return(
                        <div key={shop.id} onClick={()=>navigate(`/shop/${shop.id}`)} className="main__list_item">
                            <img src={`image/shops/${shop.image}`} alt={shop.name}/>
                           <div className="main__list_item_desc">
                           <p>{shop.name}</p>
                            <p>{shop.address}</p>
                            <p>{shop.timeWork}</p>

                            </div>
                            
                        </div>
                    )
                })}

            </div>
            }
            </div>
        </div>
    )
}
export default Main;