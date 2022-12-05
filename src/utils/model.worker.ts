import { CustomPoseNet, load } from "@teachablemachine/pose";

let model: CustomPoseNet | null = null;
const url = "./model";

load(
    `http://localhost:5173/model/model.json`,
    `http://localhost:5173/model/metadata.json`
).then(m => {
    model = m;
    self.postMessage("init");
    console.log("model loaded");
    console.log(model);
});

const predict = async (webcamCanvas: HTMLCanvasElement) => {
    console.log("recived: ", webcamCanvas);
    if (!model) return 0;
    
    const { pose, posenetOutput } = await model.estimatePose(webcamCanvas);
    return await model.predict(posenetOutput);
};

self.onmessage = (e) => {
    // new Notification("worker", { body: "worker started" });
    
    predict(e.data).then((prediction) => {
        self.postMessage(prediction);
    });
};

export type {};
