import { Button, Paper } from '@material-ui/core'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import './carousel.scss'
import CarouselCard from './CarouselCard'


export default function DetailsCarousel() {
   
    const breakPoints=[
        {width:500,itemsToShow:1},
        {width:768,itemsToShow:2},
        {width:1200,itemsToShow:3},
        {width:1500,itemsToShow:4}
    ]


    return (
        <Carousel  >
            <CarouselCard number={1} />
            <CarouselCard number={2}  />
            <CarouselCard number={3}  />
            <CarouselCard number={4}  />
            <CarouselCard number={5}  />
            <CarouselCard number={6}  />
        </Carousel>
    )
}

