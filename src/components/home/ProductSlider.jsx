import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import img1 from "../../assets/images/clothes/male1.jpg";
import img2 from "../../assets/images/clothes/male2.jpg";
import img3 from "../../assets/images/clothes/male3.jpg";
import img4 from "../../assets/images/clothes/male4.jpg";
import img5 from "../../assets/images/clothes/male5.jpg";
import img6 from "../../assets/images/clothes/female1.jpg";
import img7 from "../../assets/images/clothes/female2.jpg";
import img8 from "../../assets/images/clothes/female3.jpg";
import img9 from "../../assets/images/clothes/female4.jpg";

const products = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

function ProductSlider() {
    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            loop={true}
            centeredSlides={true}
            slidesPerView={1} // 🔥 INI KUNCI
            breakpoints={{
                768: {
                    slidesPerView: 3,
                },
            }}
            navigation={{
                nextEl: ".next",
                prevEl: ".prev",
            }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            speed={800}
            className="productSwiper"
        >
            {products.map((img, index) => (
                <SwiperSlide key={index}>
                    {({ isActive }) => (
                        <div className={`slide-item ${isActive ? "is-active" : ""}`}>
                            <img src={img} alt={`product-${index}`} />
                        </div>
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default ProductSlider;