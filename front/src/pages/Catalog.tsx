import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { GoodsCatalog } from '../model/GoodsCatalog';
import { useNavigate } from 'react-router-dom';
import { Button, Rate } from 'antd';
import { TypeClothes } from '../model/TypeClothes';
import "./Catalog.scss"


const Catalog = ()=>{
    const navigate = useNavigate()
    const [type, setType] = useState<TypeClothes[]|undefined>()
    const [goods, setGoods] = useState<GoodsCatalog[]|undefined>()
    const Sort = (id:number)=>{
        axios.get(`/goods/sorttype/${id}`)
        .then(response => {
           console.log(response.data)
           setGoods(response.data)
           
        })
        .catch(error => {
           
            console.error('There was an error!', error);
        });
    }
    const SortPrice = (id:number)=>{
        axios.get(`/goods/sortprice/${id}`)
        .then(response => {
           console.log(response.data)
           setGoods(response.data)
           
        })
        .catch(error => {
           
            console.error('There was an error!', error);
        });
    }
    useEffect(()=>{
        axios.get('/goods/get-all',
            {
                headers:{
                    'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
                }
            }
        )
        .then(response => {
           console.log(response.data)
           setGoods(response.data)
           
        })
        .catch(error => {
           
            console.error('There was an error!', error);
        });

        axios.get('/type-clothes/get-all')
        .then(response => {
           console.log(response.data)
           setType(response.data)
           
        })
        .catch(error => {
           
            console.error('There was an error!', error);
        });
    }, [])

    const getAll = ()=>{
        axios.get('/goods/get-all',
            {
                headers:{
                    'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
                }
            }
        )
        .then(response => {
           console.log(response.data)
           setGoods(response.data)
           
        })
        .catch(error => {
           
            console.error('There was an error!', error);
        });
    }

    return(
        <div className='catalog'>
            <div className='catalog__container'>
            <div className='catalog__sorttype'>
                <p className='catalog__sorttype_item' onClick={()=>getAll()}>Все товары</p>
            {type?.map((item)=>{
                return(
                    <p className='catalog__sorttype_item' key={item.id} onClick={()=>Sort(item.id)}>{item.name}</p>
                )
            })}
            </div>
            <div className='catalog__goods'>
            <div className='catalog_btns'>
                <Button onClick={()=>SortPrice(1)} style={{ marginRight: '10px' }}>по возрастанию</Button>
                <Button onClick={()=>SortPrice(-1)}>по убыванию</Button>
            </div>
            {!goods?.length && <p>Такого вида одежды нет</p>}
            <div className='catalog__goods_list'>
{ goods && goods?.map((item)=>{
    return(
        <div key={item.id_g} onClick={()=>navigate(`/card/${item.id_g}`)} className='catalog__goods_item'>
            
            <img src={`image/goods/${item.firstImage}`} alt={item.firstImage}/>
            <div className='catalog__goods_item_desc'>
                <p>{item.title} {item.price} ₽</p>
                <Rate disabled defaultValue={item.mark}/>
            </div>
            
        </div>
    )
})}
</div>
            </div>
            

            </div>
</div>
    )
}
export default Catalog;