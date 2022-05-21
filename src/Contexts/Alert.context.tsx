import { iAlert } from '@src/Interfaces'
import React, { useContext, createContext, useState } from 'react'

interface iAlertContext {
  alerts: iAlert[]
  setAlert(alert: iAlert): void
}

export const AlertContext = createContext({} as iAlertContext)

export const useAlertContext = () => useContext(AlertContext)

export const AlertProvider: React.FC<any> = ({ children }) => {
  const [alerts, setAlerts] = useState<iAlert[]>([] as iAlert[])

  const setAlert = (alert: iAlert) => {
    const newAlerts = [
      ...alerts,
      alert,
    ]

    setAlerts(newAlerts)
  }

  return (
    <AlertContext.Provider value={{
      alerts,
      setAlert,
    }}
    >
      { children }
    </AlertContext.Provider>
  )
}
