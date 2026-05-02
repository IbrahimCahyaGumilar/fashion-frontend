import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import male1 from '../../assets/images/clothes/male1.jpg';
import male2 from '../../assets/images/clothes/male2.jpg';
import male3 from '../../assets/images/clothes/male3.jpg';
import male4 from '../../assets/images/clothes/male4.jpg';
import male5 from '../../assets/images/clothes/male5.jpg';
import female1 from '../../assets/images/clothes/female1.jpg';
import female2 from '../../assets/images/clothes/female2.jpg';
import female3 from '../../assets/images/clothes/female3.jpg';
import female4 from '../../assets/images/clothes/female4.jpg';
import female5 from '../../assets/images/clothes/female5.jpg';

const ProductList = () => {
    const [category, setCategory] = useState("all");

    const dataCard = [
        { id: 1, image: male1, type: "male" },
        { id: 2, image: male2, type: "male" },
        { id: 3, image: male3, type: "male" },
        { id: 4, image: male4, type: "male" },
        { id: 5, image: male5, type: "male" },
        { id: 6, image: female1, type: "female" },
        { id: 7, image: female2, type: "female" },
        { id: 8, image: female3, type: "female" },
        { id: 9, image: female4, type: "female" },
        { id: 9, image: female5, type: "female" },
    ];

    // Filter
    const filteredProducts = category === "all"
        ? dataCard
        : dataCard.filter((item) => item.type === category);
    return (
        <div className="bg-slate-50 py-28 lg:py-32">
            <div className="container mx-auto px-6 md:px-12 text-center flex flex-col gap-16">

                <div className="relative flex justify-center items-center w-full">
                    <h2 className="text-xl md:text-3xl font-bold bg-gray-900 p-4 text-white inline-block relative z-10">
                        Product
                    </h2>
                    <span className="absolute bottom-0 left-0 bg-gray-900 w-full h-1"></span>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {["all", "male", "female"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-6 py-2 rounded-2xl cursor-pointer transition-all duration-300 border-2
                                ${category === cat
                                    ? "bg-gray-900 border-gray-900 text-white shadow-lg"
                                    : "border-gray-900 text-gray-900 hover:bg-gray-200"
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {filteredProducts.map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden flex flex-col transition-all ease-in-out duration-500"
                            >
                                {/* Tinggi Statis */}
                                <div className="w-full h-full md:h-112.5 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt="images product"
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default ProductList