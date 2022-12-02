import React from "react";

import { motion, MotionValue, useTransform } from "framer-motion";

interface PostureProps {
    r: MotionValue<number>;
    size?: number | string;
}

const animation = {
    // initial: {pathLength: 0, pathOffset: 0.5},
    // animate: {pathLength: 1.1, pathOffset: -0.1},
    // transition: {duration: 1},
}

export const Posture: React.FC<PostureProps> = ({ r, size, ...props }) => (
    <motion.svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="#3D3D3D"
        strokeWidth={1}
        width={size}
        height={size}
        {...props}
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
            {...animation}
        />
        <motion.path d="M 10,83 H 90" {...animation}/>
        <motion.path d="M 34,65 V 80 m -5,0 h 10" {...animation}/>
        <motion.path d="
                       M 47,49 h 30
                        m -7,0 l -2.6,-12
                    " {...animation}/>
        <g fill="rgba(255, 255, 255, 0.8)">
            <motion.circle
                cx={useTransform(r, r => 32.5 + 15 * r)}
                cy={useTransform(r, r => 23.5 + 2 * r)}
                r="4.5"
                {...animation}
            />
            <motion.rect
                x={24}
                y={61}
                width={20}
                height={4}
                {...animation}
            />
            <motion.rect
                x={56.5}
                y={26.2}
                width={19}
                height={3}
                transform="rotate(-75,70,30)"
                {...animation}
            />
        </g>
    </motion.svg>
);



