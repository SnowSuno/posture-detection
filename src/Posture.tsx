import React, { useState } from "react";
import { div } from "@tensorflow/tfjs";

import { motion, MotionValue, useMotionTemplate, useTransform } from "framer-motion";

interface PostureProps {
    r: MotionValue<number>;
}

export const Posture: React.FC<PostureProps> = ({ r }) => {
    return (
        <div>
            <div style={{ border: "1px solid red", width: 500, height: 500 }}>
                <motion.svg
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="#3D3D3D"
                    strokeWidth={1}
                >
                    <motion.path
                        d={useTransform(r, r => `
                            M${54 - 5 * r},80
                            l -5,${-2 * r}
                            L 51 57
                            h -18
                            Q ${36 - 5 * r},${45 - 5 * r},${32 + 9 * r},32
                            l 10,13.5
                            h 12
                        `)}
                        strokeLinejoin="round"
                    />
                    <path d="M 10,83 H 90"/>
                    <path d="
                        M 47,49 h 30
                        m -7,0 l -2.6,-12
                    "/>
                    <g fill="rgba(255, 255, 255, 0.6)">
                        <motion.circle
                            cx={useTransform(r, r => 32.5 + 15 * r)}
                            cy={useTransform(r, r => 23.5 + 2 * r)}
                            r="4.5"
                        />
                        <rect
                            x={24}
                            y={61}
                            width={20}
                            height={4}
                        />
                        <rect
                            x={56.5}
                            y={26.2}
                            width={19}
                            height={3}
                            transform="rotate(-75,70,30)"
                        />
                    </g>
                </motion.svg>
            
            </div>
        </div>
    );
};


