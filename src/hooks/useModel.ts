import { useEffect, useState } from "react";
import * as TMPose from "@teachablemachine/pose";

export const useModel = (url: string) => {
    const [model, setModel] = useState<TMPose.CustomPoseNet | null>(null);
    
    useEffect(() => {
        TMPose
            .load(`${url}/model.json`, `${url}/metadata.json`)
            .then(setModel);
    }, []);
    
    return { model };
};
