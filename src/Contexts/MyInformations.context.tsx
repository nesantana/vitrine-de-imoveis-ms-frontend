import { iInformations } from '@src/Interfaces/iInformations'
import { api, urls } from '@src/Services/Api'
import React, { useContext, createContext, useState } from 'react'
import { useLoadingContext } from './Loading.context'

interface iMyInformations {
  myInformations: iInformations
  searchMyInformations(): void
}

export const MyInformations = createContext({} as iMyInformations)

export const useMyInformations = () => useContext(MyInformations)

export const MyInformationsProvider: React.FC<any> = ({ children }) => {
  const [myInformations, setMyInformations] = useState<iInformations>({} as iInformations)
  const { setLoading } = useLoadingContext()

  const searchMyInformations = async () => {
    setLoading(true)
    try {
      const { data } : any = await api.get(urls.users.findMe)

      setMyInformations(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <MyInformations.Provider value={{
      myInformations,
      searchMyInformations,
    }}
    >
      { children }
    </MyInformations.Provider>
  )
}
