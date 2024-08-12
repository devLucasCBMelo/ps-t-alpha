import { createContext } from "react";

type AppContextType = {
  userToken: string;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
};

const context = createContext({} as AppContextType);

export default context;