import { CustomPoseNet, load, Webcam } from "@teachablemachine/pose";
import { useEffect, useState } from "react";

const URL = "./model";

export const usePostureDetection = () => {
    const [model, setModel] = useState<CustomPoseNet | null>(null);
    
    useEffect(() => {
        load(
            `${URL}/model.json`,
            `${URL}/metadata.json`,
        ).then(setModel);
        
        
        
    }, [setModel]);
    
    const init = async () => {
        const model = await load(
            `${URL}/model.json`,
            `${URL}/metadata.json`,
        );
        
        const webcam = new Webcam();
        
        await webcam.setup();
        await webcam.play();
        
        window.requestAnimationFrame(loop);
        
    };
    
};

const loop = async () => {

};
