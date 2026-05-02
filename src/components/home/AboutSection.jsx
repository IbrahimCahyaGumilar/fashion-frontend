import React from 'react'


import about from "../../assets/images/home/about.png";

const AboutSection = () => {
    return (
        <div className="pt-28 lg:pt-32 bg-slate-50">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-10">
                    <img
                        src={about}
                        alt="About"
                        className="w-full lg:w-1/2 object-cover rounded-xl"
                    />

                    <div className="flex flex-col gap-6 text-justify">
                        <h2 className="title-underline text-2xl md:text-3xl font-bold">
                            Tentang Kami
                        </h2>

                        <p>
                            PT Cutting adalah perusahaan yang menyediakan layanan produksi
                            pakaian yang terletak di Jakarta.
                        </p>

                        <p>
                            Dengan pengalaman bertahun-tahun kami berkomitmen memberikan
                            hasil produksi berkualitas tinggi dengan proses yang efisien dan
                            tepat waktu.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutSection