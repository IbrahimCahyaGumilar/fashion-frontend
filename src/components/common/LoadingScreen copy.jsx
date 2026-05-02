import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
    const [isFinished, setIsFinished] = useState(false);
    return (
        <div className="bg-white w-screen h-screen flex items-center justify-center overflow-hidden">
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
                        duration: 0.5, // Dipercepat dari 0.8
                        delay: 0.2,    // Muncul lebih awal
                        width: { delay: 1.2, duration: 0.4 } // Geser lebih cepat (sebelumnya delay 2.8)
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
                            delay: 0.8,    // Warna berubah lebih cepat (sebelumnya 2.0)
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
                        transition={{ delay: 0.8, duration: 0.3 }} // Hilang berbarengan dengan perubahan warna
                        className="absolute inset-0 bg-black rounded-full"
                    />
                </motion.div>

                {/* Teks "utting" */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    // Muncul hampir berbarengan saat C mulai bergeser
                    transition={{ delay: 1.3, duration: 0.4, ease: "easeOut" }}
                    className="overflow-hidden -ml-1"
                >
                    <span className="font-logo text-7xl text-black mt-1 block">
                        utting
                    </span>
                </motion.div>
            </div>
        </div>
    )
}

export default LoadingScreen