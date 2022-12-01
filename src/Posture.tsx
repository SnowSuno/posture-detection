import React, { useState } from "react";
import { div } from "@tensorflow/tfjs";


import { motion, MotionValue, useMotionTemplate, useTransform } from "framer-motion";
interface PostureProps {
    r: MotionValue<number>;
}

export const Posture: React.FC<PostureProps> = ({ r }) => {
    // const [r, setR] = useState(0);
    
    
    return (
        <div>
            <div style={{ border: "1px solid red", width: 500, height: 500 }}>
                <motion.svg
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="#000"
                    strokeWidth={1.3}
                    // strokeLinecap="round"
                    strokeLinejoin="round"
                
                >
                    <motion.path
                        d={useMotionTemplate`M ${useTransform(r, r => 64 - 5 * r)},80
                        l -5,${useTransform(r, r => -2 * r)}
                        L 61 57
                        h -18
                        Q ${useTransform(r, r => 46 - 5 * r)},
                        ${useTransform(r, r => 45 - 5 * r)},
                        ${useTransform(r, r => 42 + 9 * r)},32
                        l 10,13.5
                        h 12`}
                    />
                    <motion.circle
                        cx={useTransform(r, r => 42.5 + 15 * r)}
                        cy={useTransform(r, r => 23.5 + 2 * r)}
                        r="4.5"
                        // fill="#dddddd"
                    />
                </motion.svg>
            
            </div>
            {/*<input*/}
            {/*    type="range" min={0} max={1} step={0.01}*/}
            {/*    value={r}*/}
            {/*    onChange={e => setR(e.target.valueAsNumber)}*/}
            {/*/>*/}
            {/*{r}*/}
        </div>
    );
};


