import React from 'react'

import visi from '../assets/images/home/about.png';
import misi from '../assets/images/blog/blog1.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/common/HeroSection';

const About = () => {
    return (
        <div>
            <Navbar />

            <HeroSection title='profile' />

            <section className="container mx-auto px-6 md:px-12 py-28 lg:py-32">
                <iframe width="100%" height="500" src="https://www.youtube.com/embed/jAfsf4pxmyI" title="YouTube video player"
                    className="h-75 lg:h-125 rounded-xl"
                    frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
                </iframe>
            </section>

            <section className="bg-gray-900 py-10 lg:py-12">
                <div className="container mx-auto px-6 md:px-32 text-white flex flex-col gap-8 justify-center items-center">
                    <h2 className="title-underline text-xl md:text-3xl font-bold">Tentang Kami</h2>
                    <p className="text-center text-xs md:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ratione, asperiores
                        vitae cupiditate ex delectus perferendis ad necessitatibus hic a inventore illo commodi velit ipsum at
                        dolorum repudiandae quaerat assumenda sunt veritatis fugit quis consectetur et? Ab, repellendus. Facilis
                        ab veniam aspernatur. Voluptatem perferendis, in labore error sunt, velit amet at neque, iure
                        dignissimos debitis veritatis suscipit aliquid iusto quo mollitia quas magni cumque consectetur? Ratione
                        beatae culpa architecto exercitationem placeat aut consequuntur, deserunt odio laboriosam numquam
                        libero, sapiente molestiae! Optio, error commodi nemo consequuntur delectus ut aliquid officia sed sit
                        labore ea aspernatur accusantium quidem debitis nulla rerum accusamus.</p>
                </div>
            </section>

            <section className="container mx-auto px-6 md:px-12 py-28 lg:py-32">
                <div className="flex flex-col lg:flex-row relative w-full">

                    <div className="relative w-full lg:w-1/2">
                        <img src={visi} alt="images visi"
                            className="w-full h-4/5 object-cover" />

                        <div
                            className="absolute z-50 top-1/4 -translate-y-1/4 left-1/2 -translate-x-1/2 flex flex-col gap-4 md:gap-6 items-center w-4/5 text-white">
                            <h2 className="text-xl md:text-3xl font-bold">Visi</h2>
                            <p className="text-center text-xs md:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, ducimus odio
                                facere quas illum cum dolorum quos eius quibusdam consequatur tenetur, amet doloribus soluta
                                doloremque sunt dignissimos corporis aperiam tempora.</p>
                        </div>
                    </div>

                    <div className="relative w-full lg:w-1/2">
                        <img src={misi} alt="images misi"
                            className="w-full h-4/5 object-cover" />

                        <div
                            className="absolute z-50 top-1/4 -translate-y-1/4 left-1/2 -translate-x-1/2 flex flex-col gap-4 md:gap-6 items-center w-4/5 text-white">
                            <h2 className="text-xl md:text-3xl font-bold">Misi</h2>
                            <p className="text-center text-xs md:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, ducimus odio
                                facere quas illum cum dolorum quos eius quibusdam consequatur tenetur, amet doloribus soluta
                                doloremque sunt dignissimos corporis aperiam tempora.</p>
                        </div>
                    </div>

                    <div className="absolute bg-black/50 inset-0 lg:h-4/5"></div>
                </div>



            </section>

            <Footer />
        </div>
    )
}

export default About