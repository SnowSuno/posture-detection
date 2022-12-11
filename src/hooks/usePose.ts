import { useEffect, useState } from "react";

import { useModel } from "./useModel";
import { useWebcam } from "./useWebcam";
import { predict } from "../utils/model";
import { useDetector } from "./useDetector";
import { calculators, PoseDetector } from "@tensorflow-models/pose-detection";
import { PixelInput } from "../utils/types";
import { LayersModel, Tensor, tensor } from "@tensorflow/tfjs";

import modelPath from "../model/model.json";

interface Prediction {
    className: string;
    probability: number;
}

const estimatePose = async (detector: PoseDetector, model: LayersModel, image: PixelInput) => {
    console.log("estimatePose");
    
    const size = 400;
    const pose = (await detector.estimatePoses(image))[0];
    
    // console.log("pose", pose);
    
    
    if (!pose) return null;
    
    const keypoints = calculators.keypointsToNormalizedKeypoints(
        pose.keypoints,
        { height: size, width: size },
    );
    
    // console.log("keypoints", keypoints);
    
    const data = tensor(new Float32Array(keypoints
        .map(keypoint => [keypoint.x, keypoint.y])
        .flat(),
    ), [1, 34]);
    
    console.log("data", data);
    
    return model.predict(data);
};

export const usePose = () => {
    // @ts-ignore
    const { model } = useModel("./model/model.json");
    const { webcam } = useWebcam();
    const { detector } = useDetector();
    
    const [loop, setLoop] = useState(true);
    const [prediction, setPrediction] = useState<Tensor | null>(null);
    
    useEffect(() => {
        // console.log("model", model);
        // console.log("webcam", webcam);
        // console.log("detector", detector);
        
        if (!(loop && model && webcam && detector)) return;
        
        console.log("start");
        
        const timeout = setTimeout(async () => {
            webcam.update();
            const prediction = await estimatePose(detector, model, webcam.canvas);
            
            setPrediction(prediction && tensor([]));
        }, 100);
        
        return () => clearTimeout(timeout);
    }, [model, webcam, detector, loop, prediction]);
    
    return {
        prediction,
        start: () => setLoop(true),
        stop: () => setLoop(false),
    };
};
