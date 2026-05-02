import React from 'react'

import ProductSlider from "../../components/home/ProductSlider";

import icBack from "../../assets/icons/ic-arrow-back.svg";
import icNext from "../../assets/icons/ic-arrow-next.svg";

const ProductSection = () => {
    return (
        <div className="bg-slate-50 pt-28 lg:pt-32">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex justify-center pb-10">
                    <h2 className="title-underline text-2xl md:text-3xl font-bold">
                        Prorduk
                    </h2>
                </div>

                <div className="relative">
                    <ProductSlider />

                    <button className="prev absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-10 bg-slate-200 p-1 lg:p-2 rounded-full cursor-pointer">
                        <img src={icBack} alt="prev" />
                    </button>

                    <button className="next absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-10 bg-slate-200 p-1 lg:p-2 rounded-full cursor-pointer">
                        <img src={icNext} alt="next" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductSection