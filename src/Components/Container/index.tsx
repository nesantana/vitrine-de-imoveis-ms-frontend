import React from 'react'
import { Container as ContainerChakra } from '@chakra-ui/react'

export const Container: React.FC<any> = ({ children, ...props }) => (
  <ContainerChakra maxWidth="1330" width="100%" {...props}>
    { children }
  </ContainerChakra>
)
