import {
  Box, Flex, Icon, Tooltip, Link,
} from '@chakra-ui/react'
import { urls } from '@src/Services/Api'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiMail, FiMapPin } from 'react-icons/fi'
import { GiHummingbird } from 'react-icons/gi'

export const Professional: React.FC<any> = ({ professional, property, inProperty }) => {
  const a = ''

  return (
    <Box
      p="10px 10px 0 10px"
      bg="gray.100"
      borderRadius="5px"
      shadow="base"
    >
      <Box
        width="100%"
        height="270px"
        borderRadius="5px"
        backgroundImage={`url(${urls.images}${professional.photo})`}
        backgroundSize="cover"
        backgroundPosition="center center"
      />

      <Box p="20px">
        <Flex mb="10px">
          {professional.name}
        </Flex>
        <Box mb="10px">
          <Flex alignItems="center">
            <Icon as={GiHummingbird} fontSize="30px" mr="5px" />
            <Box>
              {JSON.parse(professional.professional_document).map((doc: any) => (
                <Box key={doc.id}>
                  CRECI
                  {' '}
                  {doc.state}
                  {' '}
                  -
                  {' '}
                  {doc.document}
                </Box>
              ))}
            </Box>
          </Flex>
        </Box>
        <Tooltip label="Clique e fale com o corretor" hasArrow placement="left">
          <Link href={`https://api.whatsapp.com/send?phone=55${professional.phone}&text=Ol%C3%A1%20${professional.name},%20${inProperty ? `estou%20olhando%20o%20imóvel:%20${property.title}%20${process.env.NEXT_PUBLIC_MY_URL}/imoveis/${property.id}` : 'te%20encontrei'}%20atrav%C3%A9s%20do%20Vitrine%20de%20Im%C3%B3veis%20MS`} target="_blank">
            <Flex alignItems="center" mb="10px">
              <Icon as={FaWhatsapp} mr="5px" fontSize="15px" />
              {' '}
              {professional.phone}
            </Flex>
          </Link>
        </Tooltip>
        <Flex alignItems="center" mb="10px">
          <Icon as={FiMail} mr="5px" fontSize="15px" />
          {' '}
          {professional.email}
        </Flex>
        <Flex alignItems="center">
          <Icon as={FiMapPin} fontSize="15px" mr="5px" />
          {professional.street}
          ,
          {professional.number}
        </Flex>
      </Box>
    </Box>
  )
}
