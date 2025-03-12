import {
  useState,
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { IAlert } from "../components/Alert.type";

interface ContextProps {
  children: ReactNode;
}

interface AlertValueType {
  alert: IAlert | undefined;
  setAlert: Dispatch<SetStateAction<IAlert | undefined>>;
}

const defaultValue: AlertValueType = {
  alert: undefined,
  setAlert: () => {},
};

const AlertContext = createContext<AlertValueType>(defaultValue);

const AlertProvider = ({ children }: ContextProps) => {
  const [alert, setAlert] = useState<IAlert>();
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(undefined), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const alertValue: AlertValueType = { alert: alert, setAlert: setAlert };

  return (
    <AlertContext.Provider value={alertValue}>{children}</AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };
