import { useEffect, useState } from "react";

export const useTimer = () => {
    const [timer, setTimer] = useState(0);
    const [loop, setLoop] = useState(true);
    
    useEffect(() => {
        if (!loop) return;
        
        const timeout = setTimeout(() => {
            setTimer(timer + 1);
        }, 1000);
        
        return () => clearTimeout(timeout);
    }, [timer, loop]);
    
    return {
        timer,
        setTimer,
        start: () => setLoop(true),
        stop: () => setLoop(false),
    };
}
