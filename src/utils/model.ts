import { CustomPoseNet } from "@teachablemachine/pose";
import { type Tensor3D } from "@tensorflow/tfjs";

export type PosenetInput =
    | ImageData
    | HTMLImageElement
    | HTMLCanvasElement
    | HTMLVideoElement
    | Tensor3D

export const predict = async (model: CustomPoseNet, sample: PosenetInput) => {
    const { pose, posenetOutput } = await model.estimatePose(sample);
    const prediction = await model.predict(posenetOutput);
    
    return { pose, prediction };
};
