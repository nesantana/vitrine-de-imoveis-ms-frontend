import {
  Alert, AlertDescription, AlertIcon, Box,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

interface iAlertBox {
  message: string
  type: 'error' | 'success' | 'info' | 'warning' | undefined
}

export const AlertBox: React.FC<iAlertBox> = ({
  message = '',
  type = 'error',
}) => {
  const [open, setOpen] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setOpen(false)
    }, 5000)
  }, [])

  if (open === false) {
    return null
  }

  return (
    <Alert status={type} variant="solid" color="white" py="20px" borderRadius="5px" mt="20px" shadow="lg">
      <AlertIcon color="white" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
