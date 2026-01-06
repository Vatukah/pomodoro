import { useEffect, useState } from "react";
import { useSettingsStore } from "../store/settings.store";
import { useBoot } from "../context/bootProvider";

export function SettingsHydrationGate() {
  const { markReady } = useBoot();
const [hydrated, setHydrated] = useState(
  useSettingsStore.persist.hasHydrated()
);

useEffect(() => {
  if (useSettingsStore.persist.hasHydrated()) {
    setHydrated(true);
    markReady('settings')
    return;
  }

  const unsub = useSettingsStore.persist.onFinishHydration(() => {
    setHydrated(true);
    markReady("settings")
  });

  return () => unsub?.();
}, []);


  return null;
}
