import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bus from '../../assets/bus.jpg'
import launch from '../../assets/launch.jpg'
import plane from '../../assets/biman.jpeg'
import train from '../../assets/train.jpg'

const Banner = () => {
    return (
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
        >
            <div>
                <img src={bus} />
            </div>
            <div>
                <img src={train} />
            </div>
            <div>
                <img src={launch} />
            </div>
            <div>
                <img src={plane} />
            </div>
        </Carousel>
    );
};

export default Banner;