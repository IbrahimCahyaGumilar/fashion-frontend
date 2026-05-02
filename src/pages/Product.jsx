import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import HeroSection from '../components/common/HeroSection';
import ProductList from '../components/product/ProductList';



const Product = () => {
    return (
        <div>
            <Navbar />

            {/* Hero Product */}
            <HeroSection title='product' />

            {/* Product List */}
            <ProductList />

            <Footer />

        </div>
    )
}

export default Product