import React, { useEffect } from "react";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { usePose } from "./hooks/usePose";
import { useTimer } from "./hooks/useTimer";
import { Posture } from "./Posture";


function App() {
    const { prediction } = usePose();
    const { timer, setTimer } = useTimer();
    
    const motionPoseRate = useMotionValue(0);
    const r = useSpring(motionPoseRate, { stiffness: 150, damping: 15 });
    
    const request =() => {
        Notification.requestPermission();
    }
    
    useEffect(() => {
        if (prediction) motionPoseRate.set(prediction[1].probability)
    }, [prediction]);
    
    
    useEffect(() => {
        console.log(timer)
        if (timer > 5) {
            setTimer(0);
            if (prediction && prediction[1]?.probability > 0.5) {
                notify();
            }
        }
    }, [timer])
    
    const notify = () => {
        new Notification("Supose", {
            body: "Hurry up!",
            icon: "icon.svg",
        });
    };
    
    return (
        <motion.div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            backgroundColor: useTransform(
                r,
                [0, 1],
                ["#D4DAE2", "#f36f67"],
            ),
        }}>
            {/*<canvas*/}
            {/*    ref={canvasRef}*/}
            {/*    style={{*/}
            {/*        borderRadius: 10,*/}
            {/*        overflow: "hidden",*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<h3 style={{ width: 400 }}>*/}
            {/*    {prediction && prediction[1].probability.toFixed(2)}*/}
            {/*</h3>*/}
            <Posture size="50vh" r={r}/>
            {/*<button onClick={request}>알림</button>*/}
        </motion.div>
    );
}

export default App;
