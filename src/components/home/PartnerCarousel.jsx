import React from 'react';

import matahari from '../../assets/images/partner/matahari.png';
import ramayana from '../../assets/images/partner/ramayana.png';
import centro from '../../assets/images/partner/centro.png';
import metro from '../../assets/images/partner/metro.png';
import seibu from '../../assets/images/partner/seibu.png';
import sogo from '../../assets/images/partner/sogo.png';

const partners = [
    { image: matahari },
    { image: ramayana },
    { image: centro },
    { image: metro },
    { image: seibu },
    { image: sogo }
];

const PartnerCarousel = () => {
    const displayPartners = [...partners, ...partners, ...partners, ...partners];

    return (
        <div className="carousel-container">
            <div className="carousel-track">
                {displayPartners.map((item, index) => (
                    <div key={index} className="slide-partner">
                        <img
                            src={item.image}
                            alt="partner logo"
                            className="w-32 h-32 object-contain grayscale hover:grayscale-0 transition-all"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartnerCarousel;