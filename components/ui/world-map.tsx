"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import Image from "next/image";

interface MapProps {
    dots?: Array<{
        start: { lat: number; lng: number; label?: string };
        end: { lat: number; lng: number; label?: string };
    }>;
    lineColor?: string;
    darkModeLineColor?: string;
}

export function WorldMap({
    dots = [
        {
            start: {
                lat: 64.8378,  // More precise Fairbanks coordinates
                lng: -147.7164,
                label: "Fairbanks, Alaska"
            },
            end: {
                lat: 34.0522,
                lng: -118.2437,
                label: "Los Angeles, CA"
            },
        },
        {
            start: { 
                lat: 64.8378, 
                lng: -147.7164,
                label: "Fairbanks, Alaska" 
            },
            end: { 
                lat: -20.7801, 
                lng: -50.9292,
                label: "Brasília, Brazil" 
            },
        },
        {
            start: { 
                lat: -20.7801, 
                lng: -50.9292,
                label: "Brasília, Brazil" 
            },
            end: { 
                lat: 38.7223, 
                lng: -9.1393,
                label: "Lisbon, Portugal" 
            },
        },
        {
            start: { 
                lat: 51.5074, 
                lng: -0.1278,
                label: "London, UK" 
            },
            end: { 
                lat: 10.6139, 
                lng: 77.209,
                label: "New Delhi, India" 
            },
        },
        {
            start: { 
                lat: 10.6139, 
                lng: 77.209,
                label: "New Delhi, India" 
            },
            end: { 
                lat: 43.1332, 
                lng: 131.9113,
                label: "Vladivostok, Russia" 
            },
        },
        {
            start: { 
                lat: 10.6139, 
                lng: 77.209,
                label: "New Delhi, India" 
            },
            end: { 
                lat: -5.2921, 
                lng: 36.8219,
                label: "Nairobi, Kenya" 
            },
        },
        {
            start: {
                lat: 40.7128,
                lng: -74.0060,
                label: "New York City, NY"
            },
            end: {
                lat: 20.6762,
                lng: 139.6503,
                label: "Tokyo, Japan"
            }
        }
    ],
    lineColor = "#9333ea",  // Lighter blue for better visibility in dark mode
}: MapProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const map = new DottedMap({ height: 100, grid: "diagonal" });

    const svgMap = map.getSVG({
        radius: 0.22,
        color:"#FFFFFF50",  // Reduced opacity for subtle effect
        shape: "circle",
        backgroundColor:"#1a1a1a",  // Slightly darker dark mode background
    });

    const projectPoint = (lat: number, lng: number) => {
        const x = (lng + 180) * (800 / 360);
        const y = (90 - lat) * (400 / 180);
        return { x, y };
    };

    const createCurvedPath = (
        start: { x: number; y: number },
        end: { x: number; y: number }
    ) => {
        const midX = (start.x + end.x) / 2;
        const midY = Math.min(start.y, end.y) - 50;
        return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
    };

    const activeLineColor = lineColor;

    return (
        <div className={`
            w-full 
            aspect-[2/1] 
            bg-[#000000] 
            rounded-lg 
            relative 
            font-sans 
            overflow-hidden
            shadow-lg
        `}>
            <Image
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
                className="
                    h-full 
                    w-full 
                    [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] 
                    pointer-events-none 
                    select-none
                "
                alt="world map"
                height="495"
                width="1056"
                draggable={false}
            />
            <svg
                ref={svgRef}
                viewBox="0 0 800 400"
                className="w-full h-full absolute inset-0 pointer-events-none select-none"
            >
                {dots.map((dot, i) => {
                    const startPoint = projectPoint(dot.start.lat, dot.start.lng);
                    const endPoint = projectPoint(dot.end.lat, dot.end.lng);
                    return (
                        <g key={`path-group-${i}`}>
                            <motion.path
                                d={createCurvedPath(startPoint, endPoint)}
                                fill="none"
                                stroke="url(#path-gradient)"
                                strokeWidth="1"
                                initial={{
                                    pathLength: 0,
                                }}
                                animate={{
                                    pathLength: 1,
                                }}
                                transition={{
                                    duration: 1,
                                    delay: 0.5 * i,
                                    ease: "easeOut",
                                }}
                                key={`start-upper-${i}`}
                            ></motion.path>
                        </g>
                    );
                })}

                <defs>
                    <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="5%" stopColor={activeLineColor} stopOpacity="1" />
                        <stop offset="95%" stopColor={activeLineColor} stopOpacity="1" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>

                {dots.map((dot, i) => (
                    <g key={`points-group-${i}`}>
                        <g key={`start-${i}`}>
                            <circle
                                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                                r="2"
                                fill={activeLineColor}
                            />
                            <circle
                                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                                r="2"
                                fill={activeLineColor}
                                opacity="0.5"
                            >
                                <animate
                                    attributeName="r"
                                    from="2"
                                    to="8"
                                    dur="1.5s"
                                    begin="0s"
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="opacity"
                                    from="0.5"
                                    to="0"
                                    dur="1.5s"
                                    begin="0s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </g>
                        <g key={`end-${i}`}>
                            <circle
                                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                                r="2"
                                fill={activeLineColor}
                            />
                            <circle
                                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                                r="2"
                                fill={activeLineColor}
                                opacity="0.5"
                            >
                                <animate
                                    attributeName="r"
                                    from="2"
                                    to="8"
                                    dur="1.5s"
                                    begin="0s"
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="opacity"
                                    from="0.5"
                                    to="0"
                                    dur="1.5s"
                                    begin="0s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </g>
                    </g>
                ))}
            </svg>
        </div>
    );
}