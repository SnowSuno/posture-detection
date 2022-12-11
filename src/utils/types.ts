import { Tensor3D } from "@tensorflow/tfjs-core";

export type PixelInput =
    | Tensor3D
    | ImageData
    | HTMLVideoElement
    | HTMLImageElement
    | HTMLCanvasElement
    | ImageBitmap;
