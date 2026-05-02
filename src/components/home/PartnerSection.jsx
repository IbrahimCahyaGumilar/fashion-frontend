import React from 'react'
import PartnerCarousel from './PartnerCarousel'

const PartnerSection = () => {
    return (
        <div className="bg-slate-50 py-10">
            <div className="bg-white shadow-lg rounded-lg py-10 overflow-hidden">
                <PartnerCarousel />
            </div>
        </div>
    )
}

export default PartnerSection