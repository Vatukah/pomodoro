// TomatoController.ts
import { SpringRef } from "@react-spring/core";
import { secondsToRadians } from "../uitls/helper";
import { INITIAL_Y, SEPERATE_Y } from "../uitls/defaultVal";

export class TomatoAnimationController {
  private _INITIAL_Y = INITIAL_Y;
  private _SEPERATE_Y = SEPERATE_Y;
  public isIntroDone = false;

  private animationApi: SpringRef<{
    positionY: number;
    rotationZ: number;
  }> | null = null;


  setAnimationApi(
    api: SpringRef<{
      positionY: number;
      rotationZ: number;
    }> |null
  ) {
    this.animationApi = api;
  }

  private _introAnimation(target: number) {
    if (!this.animationApi) return;

    const rad = this._Radian(target);

    this.animationApi.start({
      from: { positionY: this._INITIAL_Y, rotationZ: 0 },
      to: async (next) => {
        await next({ positionY: this._SEPERATE_Y });
        await next({ rotationZ: rad });
      },
    });
   
  }

  private _Radian = secondsToRadians;

  introSeperateAndRotate(targetRotation: number) {
    if (!this.animationApi) return;

    if (!this.isIntroDone) {
      this._introAnimation(targetRotation);
      this.isIntroDone = true;
      return;
    }
    // used for init event. Rotate to setted duration of pomo
    this.tickRotate(targetRotation);
  }

  tickRotate(rotation: number) {
    if (!this.animationApi) return;

    const rad = this._Radian(rotation);

    this.animationApi.start({ rotationZ: rad });
  }
}
