import {
  Box, Container, Flex, Icon, Link,
} from '@chakra-ui/react'
import { useMyInformations } from '@src/Contexts/MyInformations.context'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { FaHome, FaMapMarker, FaUser } from 'react-icons/fa'
import {
  FiChevronsLeft, FiChevronsRight, FiDollarSign, FiMessageCircle, FiXCircle,
} from 'react-icons/fi'
import { MdSell } from 'react-icons/md'
import { RiAdvertisementLine } from 'react-icons/ri'

import { isEmpty } from 'lodash'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { api } from '@src/Services/Api'
import { apiFormData } from '@src/Services/ApiFormData'
import { useAlertContext } from '@src/Contexts/Alert.context'
import { useMobileContext } from '@src/Contexts/Mobile.context'

const menuSimple = [
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

const menuAdmin = [
  {
    id: 4,
    label: 'FINANCIAMENTO',
    icon: MdSell,
    link: '/escritorio/financiamento',
  },
  {
    id: 5,
    label: 'ANÚNCIOS',
    icon: RiAdvertisementLine,
    link: '/escritorio/anuncios',
  },
  {
    id: 6,
    label: 'VENCIMENTOS',
    icon: FiDollarSign,
    link: '/escritorio/vencimentos',
  },
]

export const DashboardOffice: React.FC<any> = ({ children }) => {
  const [menu, setMenu] = useState(menuSimple)
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const { searchMyInformations, myInformations, resetMyInformations } = useMyInformations()
  const { asPath, push: routerPush } = useRouter()

  useEffect(() => {
    if (isEmpty(myInformations)) {
      searchMyInformations()
    }
  }, [asPath])

  const changeOpenMenu = async (bool: boolean) => {
    await setCookie(null, 'openMenuOffice', JSON.stringify(bool))

    setOpenMenu(bool)
  }

  const verifyOpenMenu = async () => {
    const { openMenuOffice = 'true' } = await parseCookies(null)

    changeOpenMenu(JSON.parse(openMenuOffice))
  }

  useEffect(() => {
    verifyOpenMenu()
  }, [asPath])

  useEffect(() => {
    if (Number(myInformations.is_admin)) {
      setMenu(
        [
          ...menuSimple,
          ...menuAdmin,
        ],
      )
    } else {
      setMenu(menuSimple)
    }
  }, [myInformations])

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
      resetMyInformations()
    }, 0)

    setTimeout(() => {
      routerPush('/login')
    }, 1000)
  }

  const {
    setIsMobile, isMobile,
  } = useMobileContext()

  const verifyMobile = async () => {
    const { innerWidth: width } = window

    const resolutionMobile = width <= 1200

    const { openMenuOffice = 'true' } = await parseCookies(null)

    setIsMobile(resolutionMobile)
    changeOpenMenu(resolutionMobile ? false : JSON.parse(openMenuOffice))
  }

  useEffect(() => {
    verifyMobile()
    window.addEventListener('resize', verifyMobile)
    return () => window.removeEventListener('resize', verifyMobile)
  }, [])

  return (
    <>
      <Box
        position="absolute"
        top="0"
        left="0"
        width={openMenu ? '300px' : '55px'}
        bottom="0"
        overflowX="hidden"
        overflowY="auto"
        height="100vh"
        bg="green.700"
        zIndex="10"
      >
        <Box padding={openMenu ? '20px' : '0'}>
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            height={openMenu ? 'calc(100vh - 40px)' : '100vh'}
          >
            <Box>
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
                      flexWrap="nowrap"
                    >
                      <Icon as={item.icon} mr="5px" />

                      <Box whiteSpace="nowrap" opacity={openMenu ? '1' : '0'}>
                        {item.label}
                      </Box>
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
                flexWrap="nowrap"
              >
                <Icon as={FiXCircle} mr="5px" />

                <Box whiteSpace="nowrap" opacity={openMenu ? '1' : '0'}>
                  SAIR
                </Box>
              </Flex>
            </Box>

            <Flex
              p="20px"
              color="white"
              alignItems="center"
              cursor="pointer"
              onClick={() => changeOpenMenu(!openMenu)}
              flexWrap="nowrap"
            >
              {
                openMenu ? (
                  <Icon as={FiChevronsLeft} mr="5px" />
                ) : (
                  <Icon as={FiChevronsRight} mr="5px" />
                )
              }

              <Box whiteSpace="nowrap" opacity={openMenu ? '1' : '0'}>
                FECHAR
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Box
        position="absolute"
        top="0"
        right="0"
        left={openMenu && !isMobile ? '300px' : '55px'}
        height="100vh"
        bottom="0"
        p={isMobile ? '20px' : '30px'}
        overflow="auto"
      >
        <Container maxWidth="1100px" width="100%" p="0">
          { children }
        </Container>
      </Box>
    </>
  )
}
