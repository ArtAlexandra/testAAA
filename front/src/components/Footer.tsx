import React from "react";
import "./Footer.scss";

const Footer = ()=>{
    return(
        <div className="footer">
             <p>Roommy - одежда, которая прирожденно прекрасна</p>
            <p>Контакты</p>
           <p>Елена Кандаурова</p>
           <p>+79186378202</p>
            <div className="footer__vk">
            <a href="https://vk.com/lkandaurova"><img src="/vk_logo.png" alt="vk"/></a>
            </div>
           
        </div>
    )
}
export default Footer;