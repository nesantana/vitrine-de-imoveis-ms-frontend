import {
  Box, Container, Flex, Icon, Link,
} from '@chakra-ui/react'
import { Loader } from '@src/Components/Loader'
import { api, urls } from '@src/Services/Api'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaPhone, FaWhatsapp } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import { GiHummingbird } from 'react-icons/gi'

export const Card: React.FC<any> = () => {
  const a = 'a'
  const [professional, setProfessional] = useState<any>({})

  const { query } = useRouter()

  const searchUsername = async () => {
    try {
      const { data } = await api.get(urls.users.findUsername, { username: query.id_professional })

      setProfessional(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (query.id_professional && isEmpty(professional)) {
      searchUsername()
    }
  }, [query])

  if (!professional) {
    return (<Loader />)
  }

  return (
    <Flex flexDirection="column" justifyContent="space-between" height="100vh">
      <Container maxWidth="370px" width="100%">
        <Flex py="30px" alignItems="center" justifyContent="center">
          {professional.photo && (
            <Box
              width="115px"
              height="115px"
              borderRadius="5px"
              backgroundImage={`url(${urls.images}${professional.photo})`}
              backgroundSize="cover"
              backgroundPosition="center center"
              shadow="base"
            />
          )}

          <Box pl="30px">
            { professional.name }

            {professional.professional_document && (
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
            )}
          </Box>
        </Flex>
        <Box
          p="20px"
          bg="gray.200"
          borderRadius="5px"
          shadow="base"
        >
          {
          professional.phone && (
            <>
              <Link
                href={`https://api.whatsapp.com/send?phone=55${professional.phone}&text=Ol%C3%A1%20${professional.name},%20te%20encontrei%20atrav%C3%A9s%20do%20Vitrine%20de%20Im%C3%B3veis%20MS!`}
                target="_blank"
              >
                <Flex
                  alignItems="center"
                  mb="20px"
                  padding="0 20px"
                  bg="white"
                  height="50px"
                  borderRadius="5px"
                  shadow="base"
                >
                  <Icon as={FaWhatsapp} mr="5px" fontSize="15px" />
                  {' '}
                  Enviar WhatsApp
                </Flex>
              </Link>
              <Link
                href={`tel:+55${professional.phone.replace(/\.|-/g, '').replace(' ', '')}`}
              >
                <Flex
                  alignItems="center"
                  mb="20px"
                  padding="0 20px"
                  bg="white"
                  height="50px"
                  borderRadius="5px"
                  shadow="base"
                >
                  <Icon as={FaPhone} mr="5px" fontSize="15px" />
                  {' '}
                  Ligue
                </Flex>
              </Link>
            </>
          )
          }

          {
          professional.email && (

            <Link
              href={`mailto:${professional.email}`}
            >
              <Flex
                alignItems="center"
                padding="0 20px"
                bg="white"
                height="50px"
                borderRadius="5px"
                shadow="base"
              >
                <Icon as={FiMail} mr="5px" fontSize="15px" />
                {' '}
                {professional.email}
              </Flex>
            </Link>
          )
        }
        </Box>
      </Container>

      <Link href="/" bg="green.900" textAlign="center" padding="10px 20px" color="white">
        Vitrine de Imóveis MS
      </Link>
    </Flex>
  )
}
