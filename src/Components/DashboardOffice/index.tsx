import {
  Box, Container, Flex, Icon, Link,
} from '@chakra-ui/react'
import { useMyInformations } from '@src/Contexts/MyInformations.context'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { FaHome, FaMapMarker, FaUser } from 'react-icons/fa'
import { FiMessageCircle, FiXCircle } from 'react-icons/fi'

import { isEmpty } from 'lodash'
import { destroyCookie } from 'nookies'
import { api } from '@src/Services/Api'
import { apiFormData } from '@src/Services/ApiFormData'
import { useAlertContext } from '@src/Contexts/Alert.context'

export const DashboardOffice: React.FC<any> = ({ children }) => {
  const menu = [
    {
      id: 0,
      label: 'HOME',
      icon: FaHome,
      link: '/escritorio',
    },
    {
      id: 1,
      label: 'MEU PERFIL',
      icon: FaUser,
      link: '/escritorio/perfil',
    },
    {
      id: 2,
      label: 'MEUS IMÓVEIS',
      icon: FaMapMarker,
      link: '/escritorio/imoveis',
    },
    {
      id: 3,
      label: 'CONTATOS',
      icon: FiMessageCircle,
      link: '/escritorio/contatos',
    },
  ]

  const { searchMyInformations, myInformations } = useMyInformations()
  const { asPath, push: routerPush } = useRouter()

  useEffect(() => {
    if (isEmpty(myInformations)) {
      searchMyInformations()
    }
  }, [asPath])

  const { setAlert } = useAlertContext()

  const signOut = async () => {
    setAlert({
      type: 'info',
      message: 'Usuário deslogado, redirecionando...',
    })

    await destroyCookie(null, 'token')

    setTimeout(() => {
      api.removeToken()
      apiFormData.removeToken()
      routerPush('/login')
    }, 0)
  }

  return (
    <>
      <Box
        position="absolute"
        top="0"
        left="0"
        width="300px"
        height="100vh"
        bottom="0"
        overflow="auto"
        bg="green.700"
      >
        <Box padding="20px">
          {
            menu.map((item) => (
              <Link
                href={item.link}
                key={item.id + item.label}
              >
                <Flex
                  p="20px"
                  borderBottomWidth="1px"
                  borderBottomColor="#003F0B"
                  color="white"
                  alignItems="center"
                  _hover={{
                    bg: '#003F0B',
                  }}
                  cursor="pointer"
                  bg={item.link === asPath ? '#003F0B' : 'green.700'}
                >
                  <Icon as={item.icon} mr="5px" />
                  {item.label}
                </Flex>
              </Link>
            ))
          }
          <Flex
            p="20px"
            borderBottomWidth="1px"
            borderBottomColor="#003F0B"
            color="white"
            alignItems="center"
            _hover={{
              bg: '#003F0B',
            }}
            cursor="pointer"
            onClick={signOut}
          >
            <Icon as={FiXCircle} mr="5px" />
            SAIR
          </Flex>
        </Box>
      </Box>
      <Box
        position="absolute"
        top="0"
        right="0"
        left="300px"
        height="100vh"
        bottom="0"
        p="30px"
        overflow="auto"
      >
        <Container maxWidth="1100px" width="100%">
          { children }
        </Container>
      </Box>
    </>
  )
}
