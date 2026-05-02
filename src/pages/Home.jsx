import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import BannerHome from "../components/home/BannerHome";
import AboutSection from "../components/home/AboutSection";
import ProductSection from "../components/home/ProductSection";
import PartnerSection from "../components/home/PartnerSection";
import BlogSection from "../components/home/BlogSection";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Banner */}
      <BannerHome />

      {/* About */}
      <AboutSection />

      {/* Prodoct */}
      <ProductSection />

      {/* Partener */}
      <PartnerSection />

      {/* Blog */}
      <BlogSection />

      <Footer />
    </>
  );
};

export default Home;