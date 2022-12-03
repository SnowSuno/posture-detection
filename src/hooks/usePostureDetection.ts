import { useEffect, useRef, useState } from "react";
import * as TMPose from "@teachablemachine/pose";
import { useModel } from "./useModel";

const URL = "./model";

export const usePostureDetection = () => {
    const size = 200;
    let count = 0;
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [poseRate, setPoseRate] = useState(0);
    // const poseRate = useMotionValue(0);
    const { model } = useModel("./model");
    
    
    const webcam = new TMPose.Webcam(undefined, undefined, true);
    
    const predict = async (model: TMPose.CustomPoseNet) => {
        const start = performance.now();
        
        webcam.update();
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
        const prediction = await model.predict(posenetOutput);
        
        const end = performance.now();
        
        console.log(end - start);
        
        return prediction;
    }
    
    const loop = (model: TMPose.CustomPoseNet) => {
        predict(model).then(prediction => {
            // console.log(prediction[1].probability);
            setPoseRate(prediction[1].probability);
            // if (prediction[1].probability > 0.5) {
            //     new Notification("Good posture", { body: "Good posture" });
            // }
            
            // count += (prediction[1].probability > 0.5)
            //     ? 1
            //     : (count > 0) ? -1 : 0;
            // console.log(count)
            // if (count > 50) {
            //     new Notification("Good posture", { body: "Good posture" });
            //     count = 0;
            // }
            
            setTimeout(() => loop(model), 100);
        });
    }
    
    useEffect(() => {
        if (model) start(model);
    }, [model]);
    
    const start = async (model: TMPose.CustomPoseNet) => {
        console.log("start loop");
        await webcam.setup();
        await webcam.play();
        
        loop(model);
    }
    
    // useEffect(() => {
    //     if (canvasRef.current) {
    //         canvasRef.current.width = webcam.width;
    //         canvasRef.current.height = webcam.height;
    //     }
    //     const canvasCtx = canvasRef.current?.getContext("2d") || null;
    //
    //     if (model) startLoop(model, canvasCtx).catch(console.error);
    // }, [model]);
    //
    // const startLoop = async (model: TMPose.CustomPoseNet, ctx: CanvasRenderingContext2D | null) => {
    //     await webcam.setup();
    //     await webcam.play();
    //     console.log("Start loop");
    //
    //     const _loop = async () => {
    //         webcam.update();
    //         await _predict(model, ctx);
    //         window.requestAnimationFrame(_loop);
    //     };
    //
    //     window.requestAnimationFrame(_loop);
    // };
    //
    // const _predict = async (model: TMPose.CustomPoseNet, ctx: CanvasRenderingContext2D | null) => {
    //     const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    //     const prediction = await model.predict(posenetOutput);
    //     // console.log(prediction[1].probability)
    //     // setGoodPose(prediction[0].probability > prediction[1].probability);
    //     setPoseRate(prediction[1].probability)
    //
    //     ctx?.drawImage(webcam.canvas, 0, 0);
    //     // ctx.clearRect(0, 0, 400, 400)
    //     if (ctx && pose) {
    //         TMPose.drawKeypoints(pose.keypoints, 0.1, ctx);
    //         // TMPose.drawSkeleton(pose.keypoints, 0.1, ctx);
    //     }
    // };
    
    
    return { canvasRef, poseRate };
};

const loop = async () => {

};
