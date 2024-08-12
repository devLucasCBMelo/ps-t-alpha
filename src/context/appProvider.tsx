import { useState } from "react";
import context from "./appContext";

type AppProviderType = {
  children: React.ReactNode
}

function AppProvider({ children }: AppProviderType) {
  const [userToken, setUserToken] = useState('')

  const myContext = {
    userToken,
    setUserToken,
  }

  return (
    <context.Provider value={ myContext }>
      {children}
    </context.Provider>
  )
}

export default AppProvider;
