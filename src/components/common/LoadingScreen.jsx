import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <motion.div
            // Ini yang membuat background putih menutup ke atas
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-999 bg-white w-screen h-screen flex items-center justify-center overflow-hidden"
        >
            <div className="flex items-center">
                {/* Kontainer Lingkaran & Huruf C */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, width: 112 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        width: [112, 112, 45]
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 0.2,
                        width: { delay: 1.2, duration: 0.4 }
                    }}
                    className="font-logo text-7xl flex items-center justify-center h-28 relative"
                >
                    {/* Huruf C */}
                    <motion.span
                        initial={{ color: "#ffffff", marginLeft: "-1rem" }}
                        animate={{
                            color: "#000000",
                            marginLeft: ["-1rem", "-1rem", "0rem"]
                        }}
                        transition={{
                            delay: 0.8,
                            duration: 0.3,
                            marginLeft: { delay: 1.2, duration: 0.4 }
                        }}
                        className="mt-1 z-10"
                    >
                        C
                    </motion.span>

                    {/* Lingkaran Hitam */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 0.8, duration: 0.3 }}
                        className="absolute inset-0 bg-black rounded-full"
                    />
                </motion.div>

                {/* Teks "utting" */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.4, ease: "easeOut" }}
                    className="overflow-hidden -ml-1"
                >
                    <span className="font-logo text-7xl text-black mt-1 block">
                        utting
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;