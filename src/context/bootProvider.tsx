import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { BootKey } from "../type";

interface BootContextValue {
  markReady: (key: BootKey) => void;
  isBooted: boolean;
}

const BootContext = createContext<BootContextValue>({
  markReady: () => {},
  isBooted: false,
});

export function BootProvider({ children }: { children: ReactNode }) {

  const readySet = useRef(new Set<BootKey>());
  const [isBooted, setIsBooted] = useState(false);

  const markReady = useCallback((key: BootKey) => {
    if (isBooted) return;

    readySet.current.add(key);

    if (
      readySet.current.has("model") &&
      readySet.current.has("settings") &&
      readySet.current.has("worker") 
    ) {
      setIsBooted(true);
    }
  }, []);

  return (
    <BootContext.Provider value={{ markReady, isBooted }}>
      {children}
    </BootContext.Provider>
  );
}

export const useBoot = () => useContext(BootContext);
