import React from "react";
import { useTest } from "./hooks/useTest";

export const Test: React.FC = () => {
    
    const ref = useTest();
    
    return <canvas ref={ref}></canvas>
}
