import { Flex, Image } from '@chakra-ui/react'
import React from 'react'

export const Loader: React.FC<any> = () => (
  <Flex justifyContent="center" alignItems="center" p="30px">
    <Image src="/loader.svg" width="50px" mr="10px" />
    Carregando...
  </Flex>
)
