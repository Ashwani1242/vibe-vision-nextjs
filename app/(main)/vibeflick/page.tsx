import React from "react";
import ReactPlayer from "react-player/lazy";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Icon } from "@iconify/react";
import searchIcon from "@iconify/icons-mdi/magnify";
import subscribeIcon from "@iconify/icons-mdi/bell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const VibeFlick = () => {
    return (
        <div className="bg-black text-white h-screen flex flex-col items-center">
            {/* Header */}
            <header className="w-full flex justify-between items-center px-4 py-3 bg-gray-900">
                <h1 className="text-xl font-bold">Vibe Flick</h1>
                <div className="flex gap-2 items-center">
                    <button className="text-sm px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">
                        Login
                    </button>
                </div>
            </header>

            {/* Main Content */}
                {/* Video Section */}
                <div className="flex-1 bg-gray-800 p-4">
                    <motion.div
                        className="rounded overflow-hidden shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ReactPlayer
                            url="https://www.example.com/video.mp4"
                            width="100%"
                            height="100%"
                            controls={true}
                        />
                    </motion.div>
                </div>

                    {/* Subscribe Button */}
                    <motion.button
                        className="bg-red-600 text-white py-2 px-4 rounded shadow hover:bg-red-500 flex items-center gap-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Icon icon={subscribeIcon} />
                        Subscribe
                    </motion.button>
                </div>
    );
};

export default VibeFlick;