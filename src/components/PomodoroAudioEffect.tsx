import { useEffect } from 'react';
import gearSound from "../assets/gear3.mp3";
import sfxs from '../uitls/sfx.json';
import { usePomodoroAction } from '../context/pomodoroProvider';
import pomoAudio from "../store/soundStore.ts";
import type { PostMessagePayload } from '../type';
import { playComplete, playTicking, stopTicking } from '../uitls/audio';
import { useBoot } from '../context/bootProvider.tsx';


export default function PomodoroAudioEffects() {
    const { subscribe, isReady } = usePomodoroAction();
    const {markReady} = useBoot();

    useEffect(() => {
        const sounds = { ...sfxs.ticking, ...sfxs.complete, gear: gearSound };
        pomoAudio.loadAll(sounds);
        markReady('sounds');

        document.body.addEventListener("click", () => {
            pomoAudio.unlock();
        });

        return () => {
            document.body.removeEventListener("click", () => {
                pomoAudio.unlock();
            });
        };
    }, []);

    useEffect(() => {
        const unsub = subscribe("status", (payload: PostMessagePayload<'status'>['payload']) => {
            const { status } = payload
            if (status === "ticking") {
                playTicking();
                return;
            }

            // Anything else:
            stopTicking();
        });
        const unsub_complete = subscribe("complete", () => {

            playComplete();
        });

        return () => {
            unsub_complete();
            unsub();
        }; // cleanup to prevent leaks
    }, [isReady]);
    return null
}
