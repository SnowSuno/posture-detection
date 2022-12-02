import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
// import "./App.css";
// import { usePostureDetection } from "./hooks/usePostureDetection";
import { Posture } from "./Posture";
import { useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrediction } from "./hooks/usePrediction";
import { usePostureDetection } from "./hooks/usePostureDetection";

// import Worker from "./utils/model.worker?worker";

// const worker = new Worker();
function App() {
    const {
        // canvasRef, loading,
        poseRate
    } = usePostureDetection();
    
    const motionPoseRate = useMotionValue(0);
    const r = useSpring(motionPoseRate, { stiffness: 150, damping: 15 });
    
    useEffect(() => motionPoseRate.set(poseRate), [poseRate]);
    // useEffect(() => {
    //     // if (counter.current % 10 === 0)
    //         r.set(poseRate);
    //     // counter.current++;
    // }, [poseRate])
    const notify = (msg: string) => {
        const notification = new Notification("supose", {
            body: msg
        })
    }
    
    // useEffect(() => {
    //     worker.postMessage("hello");
    //
    //     worker.onmessage = (e) => {
    //         console.log(e.data);
    //         // notify(e.data);
    //     }
    // }, [])
    
    // useEffect(() => {
    //     notify(`hurry ${poseRate > 0.5 ? "up" : "down"}`)
    // }, [poseRate])
    const loading = false;
    
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
            {/*<canvas*/}
            {/*    ref={canvasRef}*/}
            {/*    style={{*/}
            {/*        borderRadius: 10,*/}
            {/*        overflow: "hidden",*/}
            {/*    }}*/}
            {/*/>*/}
            <br/>
            <h3 style={{width: 400}}>
                {loading
                    ? "loading"
                    : `prediction : ${poseRate.toFixed(2)}`
                }
            </h3>
            <Posture size="30vw" r={r}/>
        </div>
    );
}

export default App;
