import { Webcam } from "@teachablemachine/pose";
import { useEffect, useState } from "react";

export const useWebcam = (size?: number) => {
    const [webcam, setWebcam] = useState<Webcam | null>(null);
    const [error, setError] = useState<Error | null>(null);
    
    const initWebcam = async () => {
        const _webcam = new Webcam(size, size, true);
        await _webcam.setup();
        await _webcam.play();
        return _webcam;
    };
    
    useEffect(() => {
        initWebcam()
            .then(setWebcam)
            .catch(setError);
        return () => webcam?.stop();
    }, [setWebcam, setError]);
    
    return { webcam, error };
};
