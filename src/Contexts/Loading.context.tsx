import { iUtilSimple } from '@src/Interfaces'
import { api, urls } from '@src/Services/Api'
import React, { useContext, createContext, useState } from 'react'

interface iLoadingContext {
  loading: boolean
  setLoading(bool: boolean): void
}

export const LoadingContext = createContext({} as iLoadingContext)

export const useLoadingContext = () => useContext(LoadingContext)

export const LoadingProvider: React.FC<any> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <LoadingContext.Provider value={{
      loading,
      setLoading,
    }}
    >
      { children }
    </LoadingContext.Provider>
  )
}
