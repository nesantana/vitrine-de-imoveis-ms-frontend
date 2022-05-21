import React from 'react'
import { Container as ContainerChakra } from '@chakra-ui/react'

export const Container: React.FC<any> = ({ children }) => (
  <ContainerChakra maxWidth="1300" width="100%">
    { children }
  </ContainerChakra>
)
