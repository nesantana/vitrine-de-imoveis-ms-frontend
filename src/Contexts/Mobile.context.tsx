import React, { useContext, createContext, useState } from 'react'

interface iMobile {
  isMobile: boolean
  setIsMobile(item: boolean): void
}

export const MobileContext = createContext({} as iMobile)

export const useMobileContext = () => useContext(MobileContext)

export const MobileProvider: React.FC<any> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  return (
    <MobileContext.Provider value={{
      isMobile,
      setIsMobile,
    }}
    >
      { children }
    </MobileContext.Provider>
  )
}
