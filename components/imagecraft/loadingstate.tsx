import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

const funnyMessages = [
    "Crafting your digital masterpiece... 🎨",
    "Mixing the perfect color palette... 🌈", 
    "Sprinkling some AI magic dust... ✨",
    "Leveling up your image game... 🚀",
    "Adding that extra fire... 🔥",
    "Turning ideas into pure vibes... 💫",
    "Calculating endless possibilities... 💭",
    "Channeling creative energy... ⚡",
    "Bringing your vision to life... 🎯",
    "Making art at lightspeed... ⚡",
    "Adding those finishing touches... 🖌️",
    "Unleashing AI creativity... 🤖",
    "Crafting pure awesomeness... 🌟",
    "Loading next-level visuals... 🎆",
    "Making your ideas reality... 💫"
];

export function LoadingState() {
    const [messageIndex, setMessageIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % funnyMessages.length);
        }, 3000); // Increased from 2000 to 3000

        const progressInterval = setInterval(() => {
            setProgress((prev) => Math.min(prev + 1, 100));
        }, 100); // Increased from 60 to 100

        return () => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in px-4 relative">
            {/* Enhanced Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 via-pink-50/50 to-white dark:from-purple-900/20 dark:via-pink-900/20 dark:to-gray-900 -z-10" />

            {/* Progress Circle */}
            <motion.div
                className="relative w-40 h-40 mb-12"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        className="text-gray-200 dark:text-gray-800"
                        strokeWidth="8"
                    />
                    {/* Progress circle */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
                        transform="rotate(-90 50 50)"
                    />
                    {/* Enhanced gradient definition */}
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#9333EA">
                                <animate
                                    attributeName="stop-color"
                                    values="#9333EA; #DB2777; #3B82F6; #9333EA"
                                    dur="6s" // Increased from 4s to 6s
                                    repeatCount="indefinite"
                                />
                            </stop>
                            <stop offset="50%" stopColor="#DB2777">
                                <animate
                                    attributeName="stop-color"
                                    values="#DB2777; #3B82F6; #9333EA; #DB2777"
                                    dur="6s" // Increased from 4s to 6s
                                    repeatCount="indefinite"
                                />
                            </stop>
                            <stop offset="100%" stopColor="#3B82F6">
                                <animate
                                    attributeName="stop-color"
                                    values="#3B82F6; #9333EA; #DB2777; #3B82F6"
                                    dur="6s" // Increased from 4s to 6s
                                    repeatCount="indefinite"
                                />
                            </stop>
                        </linearGradient>
                    </defs>
                </svg>
                {/* Enhanced Center content */}
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }} // Increased from 2 to 3
                    >
                        <Loader2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </motion.div>
                    <motion.span
                        className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-transparent bg-clip-text mt-2"
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 2, // Increased from 1 to 2
                            repeat: Infinity,
                        }}
                    >
                        {progress}%
                    </motion.span>
                </div>
            </motion.div>

            {/* Enhanced Messages */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={messageIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center relative"
                >
                    <motion.p
                        className="text-xl md:text-2xl font-medium mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-transparent bg-clip-text"
                    >
                        {funnyMessages[messageIndex]}
                    </motion.p>
                    <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                        Hang tight while we work our magic!
                        <motion.span
                            animate={{
                                rotate: 360,
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 3, // Increased from 2 to 3
                                repeat: Infinity,
                            }}
                        >
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                        </motion.span>
                    </p>
                </motion.div>
            </AnimatePresence>

            {/* Enhanced Floating particles */}
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    animate={{
                        x: [0, Math.random() * 200 - 100],
                        y: [0, Math.random() * 200 - 100],
                        scale: [1, 0],
                        opacity: [0.8, 0],
                    }}
                    transition={{
                        duration: 3, // Increased from 2 to 3
                        repeat: Infinity,
                        delay: i * 0.6, // Increased from 0.4 to 0.6
                        ease: "easeOut",
                    }}
                    style={{
                        left: `${50 + Math.sin(i * Math.PI * 2 / 8) * 30}%`,
                        top: `${50 + Math.cos(i * Math.PI * 2 / 8) * 30}%`,
                    }}
                >
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-sm" />
                </motion.div>
            ))}
        </div>
    );
}