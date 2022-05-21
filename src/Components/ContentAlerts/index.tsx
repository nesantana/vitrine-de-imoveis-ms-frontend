import { Box } from '@chakra-ui/react'
import { useAlertContext } from '@src/Contexts/Alert.context'
import React from 'react'
import { AlertBox } from './AlertBox'

export const ContentAlerts: React.FC<any> = () => {
  const { alerts } = useAlertContext()

  return (
    <Box position="fixed" width="300px" top="0" right="20px">
      {
        alerts.map((alert, index) => (
          <AlertBox
            key={alert.type + alert.message + index}
            type={alert.type}
            message={alert.message}
          />
        ))
      }
    </Box>
  )
}
