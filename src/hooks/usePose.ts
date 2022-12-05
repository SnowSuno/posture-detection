import { useEffect, useState } from "react";

import { useModel } from "./useModel";
import { useWebcam } from "./useWebcam";
import { predict } from "../utils/model";

interface Prediction {
    className: string;
    probability: number
}

export const usePose = () => {
    const { model } = useModel("./model");
    const { webcam } = useWebcam();
    
    const [loop, setLoop] = useState(true);
    const [prediction, setPrediction] = useState<Prediction[] | null>(null);
    
    useEffect(() => {
        if (!(loop && model && webcam)) return;
        
        const timeout = setTimeout(async () => {
            webcam.update();
            const { prediction } = await predict(model, webcam.canvas);
            setPrediction(prediction);
        }, 100);
        
        return () => clearTimeout(timeout);
    }, [model, webcam, loop, prediction]);
    
    return {
        prediction,
        start: () => setLoop(true),
        stop: () => setLoop(false),
    };
};
