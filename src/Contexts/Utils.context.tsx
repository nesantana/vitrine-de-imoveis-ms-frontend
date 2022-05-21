import { iState, iUtilSimple } from '@src/Interfaces'
import { api, urls } from '@src/Services/Api'
import React, { useContext, createContext, useState } from 'react'
import { useLoadingContext } from './Loading.context'

interface iUtilsContext {
  purposes: iUtilSimple[]
  types: iUtilSimple[]
  states: iState[]
  searchUtils(): void
}

export const UtilsContext = createContext({} as iUtilsContext)

export const useUtilsContext = () => useContext(UtilsContext)

export const UtilsProvider: React.FC<any> = ({ children }) => {
  const [purposes, setPurposes] = useState<iUtilSimple[]>([])
  const [types, setTypes] = useState<iUtilSimple[]>([])
  const [states, setStates] = useState<iState[]>([])

  const { setLoading } = useLoadingContext()

  const searchUtils = async () => {
    setLoading(true)
    try {
      const resPurposes: any = await api.get(urls.utils.purposes)

      setPurposes(resPurposes.data)

      const resTypes: any = await api.get(urls.utils.types)

      setTypes(resTypes.data)

      const resStates: any = await api.get(urls.utils.states)
      setStates(resStates.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <UtilsContext.Provider value={{
      purposes,
      types,
      states,
      searchUtils,
    }}
    >
      { children }
    </UtilsContext.Provider>
  )
}
