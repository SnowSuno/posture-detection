import { useWebcam } from "./useWebcam";
import { useEffect, useRef } from "react";
import { Webcam } from "@teachablemachine/pose";
import { main } from "../models/model";

export const useTest = () => {
    const { webcam } = useWebcam();
    const ref = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        if (webcam) once(webcam);
    }, [webcam]);
    
    const once = (webcam: Webcam) => {
        console.log("webcam", webcam);
        // ref.current
        //     ?.getContext("2d")
        //     ?.drawImage(webcam.canvas, 0, 0);
        
        console.log("webcam loaded")
        main(webcam);
    };
    
    return ref;
    
};
