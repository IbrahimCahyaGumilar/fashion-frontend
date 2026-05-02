import React from 'react'

import Counter from "./Counter";

import banner from "../../assets/images/home/banner.png";

const BannerHome = () => {
    return (
        <div className="relative">
            <img
                src={banner}
                alt="Banner"
                className="w-full h-screen object-cover"
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute inset-0 flex items-center text-white">
                <div className="container mx-auto px-6 md:px-12">
                    <h1 className="text-4xl lg:text-5xl max-w-2xl">
                        Perusahaan Pakaian Terpercaya di Indonesia
                    </h1>
                    <p className="max-w-xl text-lg mt-5 lg:mt-10">
                        Kami adalah mitra produksi pakaian terbaik yang siap membantu Anda
                        mengembangkan produk berkualitas untuk memenuhi semua kebutuhan
                        anda dengan harga yang terjangkau.
                    </p>
                </div>
            </div>

            {/* Experience Card */}
            <div className="absolute left-0 bottom-0 translate-y-1/2 w-full">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="bg-white shadow-xl font-bold p-4 flex items-center gap-5 md:gap-20 rounded-lg text-center justify-center">
                        <div>
                            <Counter target={2000} />
                            <h2 className="text-md md:text-xl">Produksi/hari</h2>
                        </div>

                        <div>
                            <Counter target={5} />
                            <h2 className="text-md md:text-xl">Pengalaman</h2>
                        </div>

                        <div>
                            <Counter target={1000} />
                            <h2 className="text-md md:text-xl">Karyawan</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerHome