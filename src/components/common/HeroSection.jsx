import React from 'react';

import image from '../../assets/images/home/banner.png';

const HeroSection = ({ title }) => {
    return (
        <div className="relative">
            <img src={image} alt={`Banner ${title}`} className="w-full h-96 object-cover" />

            <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2">
                <h2 className="font-navbar text-white font-extrabold text-5xl uppercase">
                    {title}
                </h2>
            </div>

            <div className="absolute inset-0 bg-black/50"></div>
        </div>
    )
}

export default HeroSection