import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

export const useModel = (url: string) => {
    const [model, setModel] = useState<tf.LayersModel | null>(null);
    
    useEffect(() => {
        tf.loadLayersModel(url).then(setModel);
    }, [setModel]);
    
    return { model };
};
