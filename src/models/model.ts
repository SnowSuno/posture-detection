import * as tf from "@tensorflow/tfjs";
import { Tensor3D } from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { Webcam } from "@teachablemachine/pose";

type PixelInput =
    | Tensor3D
    | ImageData
    | HTMLVideoElement
    | HTMLImageElement
    | HTMLCanvasElement
    | ImageBitmap;

export const main = async (webcam: Webcam) => {
    // const detectorConfig = {
    //     modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
    //     enableTracking: true,
    //     trackerType: poseDetection.TrackerType.BoundingBox,
    // };
    const detectorConfig = {
        runtime: "tfjs",
        enableSmoothing: true,
        modelType: "full",
    };
    const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.BlazePose,
        {
            runtime: "tfjs",
            enableSmoothing: true,
            modelType: "full",
            enableSegmentation: true,
        },
    );
    
    console.log(detector);
    
    setInterval(async () => {
        webcam.update();
        const pose = await detector.estimatePoses(webcam.canvas);
        console.log(await pose[0].segmentation?.mask.toTensor());
    }, 1000);
};

// const model = tf.Sequential(
//
// );

