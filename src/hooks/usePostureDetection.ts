import { useEffect, useRef, useState } from "react";
import * as TMPose from "@teachablemachine/pose";
import { useModel } from "./useModel";
import { useMotionValue } from "framer-motion";

const URL = "./model";

export const usePostureDetection = () => {
    const size = 200;
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [poseRate, setPoseRate] = useState(0);
    // const poseRate = useMotionValue(0);
    const { model, loading } = useModel("./model");
    
    
    const webcam = new TMPose.Webcam(undefined, undefined, true);
    
    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.width = webcam.width;
            canvasRef.current.height = webcam.height;
        }
        const canvasCtx = canvasRef.current?.getContext("2d") || null;
        
        if (model) startLoop(model, canvasCtx).catch(console.error);
    }, [model]);
    
    const startLoop = async (model: TMPose.CustomPoseNet, ctx: CanvasRenderingContext2D | null) => {
        await webcam.setup();
        await webcam.play();
        console.log("Start loop");
        
        const loop = async () => {
            webcam.update();
            await predict(model, ctx);
            window.requestAnimationFrame(loop);
        };
        
        window.requestAnimationFrame(loop);
    };
    
    const predict = async (model: TMPose.CustomPoseNet, ctx: CanvasRenderingContext2D | null) => {
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
        const prediction = await model.predict(posenetOutput);
        // console.log(prediction[1].probability)
        // setGoodPose(prediction[0].probability > prediction[1].probability);
        setPoseRate(prediction[1].probability)
        
        ctx?.drawImage(webcam.canvas, 0, 0);
        // ctx.clearRect(0, 0, 400, 400)
        if (ctx && pose) {
            TMPose.drawKeypoints(pose.keypoints, 0.1, ctx);
            // TMPose.drawSkeleton(pose.keypoints, 0.1, ctx);
        }
    };
    
    
    return { canvasRef, loading, poseRate };
};

const loop = async () => {

};
