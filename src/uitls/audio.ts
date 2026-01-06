import pomoAudio from '../store/soundStore';
import { useSettingsStore } from '../store/settings.store';

const maxVolume =25;
const settings = useSettingsStore.getState().settings;

export const playTicking=():void=>{
    if(!settings.enableTicking) return;
    const sfx = settings.ticking;
    stopComplete();
    pomoAudio.loop(sfx.sound,sfx.volume/maxVolume);
}

export const playComplete = ():void =>{
    if(!settings.enableComplete) return;
    const sfx = settings.complete;
    pomoAudio.stopAllLoops();
    pomoAudio.play(sfx.sound,{volume:sfx.volume/maxVolume})
}

export const playDemo=(sfxName:string,volume:number):void=>{
    pomoAudio.play(sfxName,{volume:volume/maxVolume},true);
}

export const stopComplete = ():void =>{
    const sfx = settings.complete;
    pomoAudio.stop(sfx.sound);
}

export const stopTicking =()=>{
    const sfx = settings.ticking;
    pomoAudio.stopLoop(sfx.sound);
}

export const playGearIncrease = ()=>{
    pomoAudio.play("gear", { pitch: 1.1 });
}
export const playGearDecrease = ()=>{
    pomoAudio.play("gear", { pitch: 1.2 });
}

export const stopAllPlay=()=>{
    pomoAudio.stopAll();
}