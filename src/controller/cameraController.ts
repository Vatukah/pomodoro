// CameraController.ts
import { SpringRef } from "@react-spring/three";
import * as THREE from "three";

export class CameraController {
  camera: THREE.PerspectiveCamera | null = null;
  api: SpringRef<{ position: [number, number, number] }> | null = null;

  setApi(api: SpringRef<any>) {
    this.api = api;
  }

  setCamera(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
  }
  closeShot = () => {
    if (!this.api || !this.camera) return;

    this.api.start({ to: { position: [0, 0.2, 2] } });
  };
  wideShot = () => {
    if (!this.api || !this.camera) return;

    this.api.start({ to: { position: [0, 0.2, 5] } });
  };
}
