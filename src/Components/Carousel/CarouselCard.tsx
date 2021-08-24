import React from 'react'
import './carouselcard.scss'
import image from '../../assets/images/resort.jpg'

export default function CarouselCard(props:any) {
    return (
        <div className="card">
            <img src={image} style={{height:"100%",width:"100%",borderRadius:"0.2rem"}} alt="" />
        </div>
    )
}
