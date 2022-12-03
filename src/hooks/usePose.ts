import { useModel } from "./useModel";
import { Webcam } from "@teachablemachine/pose";
import { useWebcam } from "./useWebcam";
import { useEffect, useRef } from "react";

export const usePose = () => {
    const { model } = useModel("./model");
    const { webcam, error } = useWebcam();
    
    const predictionResult = useRef(0);
    
    const predict = () => {
    
    }
    
    
    useEffect(() => {
    
    }, [model, webcam]);
    
    
    
    setInterval(() => {
    
    }, 100);
    
    
    
    return {};
};
