import { useEffect, useState } from "react";
import {
    type PoseDetector,
    SupportedModels,
    TrackerType,
    movenet,
    createDetector,
} from "@tensorflow-models/pose-detection";

export const useDetector = () => {
    const [detector, setDetector] = useState<PoseDetector | null>(null);
    
    useEffect(() => {
        createDetector(SupportedModels.MoveNet, {
            modelType: movenet.modelType.MULTIPOSE_LIGHTNING,
            enableTracking: true,
            trackerType: TrackerType.BoundingBox,
        }).then(setDetector);
    }, [setDetector]);
    
    return { detector };
};
