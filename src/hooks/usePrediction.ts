import * as TMPose from "@teachablemachine/pose";
import ModelWorker from "../utils/model.worker?worker";
import { useEffect, useState } from "react";

const canvas = document.createElement("canvas");
const modelWorker = new ModelWorker();

export const usePrediction = () => {
    // const [shouldPredict, setShouldPredict] = useState(true);
    const [predictionRate, setPredictionRate] = useState(0);
    
    const webcam = new TMPose.Webcam(undefined, undefined, true);
    
    
    
    modelWorker.onmessage = e => {
        if (e.data === "init") {
            console.log("init received");
            return start();
        }
        setPredictionRate(e.data[1].probability);
        
        if (e.data[1].probability > 0.5) new Notification("bad pose");
        
        setTimeout(loop, 1000);
    };
    
    const start = async () => {
        await webcam.setup();
        await webcam.play();
        
        
        // webcamCtx = webcam.canvas.getContext("2d", {willReadFrequently: true});
        loop();
    };
    const loop = () => {
        webcam.update();
        console.log("webcam", webcam);
        const webcamCtx = webcam.canvas?.getContext("2d", {willReadFrequently: true});
        
        const imageData = webcamCtx?.getImageData(0, 0, webcam.width, webcam.height);
        
        if (imageData) {
            modelWorker.postMessage(imageData);
        } else {
            setTimeout(loop, 100);
        }
        
    };
    
    // useEffect(() => {
    //
    //     (async () => {
    //         while (shouldPredict) {
    //             const prediction = await predict() as { className: string, probability: number }[];
    //             setPredictionRate(prediction[1].probability);
    //
    //         }
    //     })().catch(console.error);
    //
    // }, [shouldPredict]);
    
    return { poseRate: predictionRate };
};
