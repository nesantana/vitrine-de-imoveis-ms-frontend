import React, { useEffect, useState } from 'react'
import {
  Box, Flex, Icon, Image, Link,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useFavoritesContext } from '@src/Contexts/Favorite.context'
import { FiMenu, FiX } from 'react-icons/fi'
import { Container } from '../Container'

export const Header: React.FC<any> = ({ isMobile }) => {
  const menu = [
    {
      id: 0,
      label: 'INÍCIO',
      link: '/',
    },
    {
      id: 1,
      label: 'IMÓVEIS',
      link: '/imoveis',
    },
    {
      id: 2,
      label: 'FINANCIAMENTO',
      link: '/financiamento',
    },
    {
      id: 3,
      label: 'ANUNCIE',
      link: '/anuncie',
    },
  ]

  const { asPath } = useRouter()
  const { setFavorites } = useFavoritesContext()

  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const searchFavorites = async () => {
    const { favorites } = await parseCookies(null, 'favorites')

    setFavorites(JSON.parse(favorites))
  }

  useEffect(() => {
    searchFavorites()
  }, [])

  return (
    <>
      <Box bg="green.400" color="#FFFFFF" fontSize="15px" py="8px">
        <Container>
          <Flex justifyContent={isMobile ? 'center' : 'space-between'}>
            {
                !isMobile && (
                  <>
                    <Flex>
                      <Link
                        px="10px"
                        cursor="pointer"
                        _hover={{
                          textDecoration: 'underline',
                        }}
                        href="/imoveis?purpose=0"
                      >
                        COMPRAR
                      </Link>
                      <Box>
                        |
                      </Box>
                      <Link
                        px="10px"
                        cursor="pointer"
                        _hover={{
                          textDecoration: 'underline',
                        }}
                        href="/imoveis?purpose=1"
                      >
                        ALUGAR
                      </Link>
                      <Box>
                        |
                      </Box>
                      <Link
                        px="10px"
                        cursor="pointer"
                        _hover={{
                          textDecoration: 'underline',
                        }}
                        href="/imoveis?purpose=2"
                      >
                        LANÇAMENTOS
                      </Link>
                    </Flex>

                  </>
                )
}
            <Flex>
              <Link
                cursor="pointer"
                _hover={{
                  textDecoration: 'underline',
                }}
                href="/login"
              >
                ENTRAR
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Flex width="100%" justifyItems="center" alignItems="center" p="30px">
        <Box margin="auto" justifyContent="center" textAlign="center">
          <Link href="/">
            <Image src="/logo.png" maxWidth="100%" width="346px" />
          </Link>

          <Box>
            A forma mais fácil de estar e ser visto na web
          </Box>
        </Box>
      </Flex>
      <Box>
        <Container>
          {
            isMobile && (
              <Flex
                bg="gray.600"
                p="20px"
                justifyContent="space-between"
                alignItems="center"
                color="white"
                onClick={() => setOpenMenu(true)}
              >
                MENU
                {' '}
                <Icon as={FiMenu} fontSize="20px" />
              </Flex>
            )
          }

          <Flex
            bg="gray.600"
            width="100%"
            padding={isMobile ? '20px' : '0 0 0 20px'}
            justifyContent={isMobile ? 'flex-start' : 'space-between'}
            style={
              isMobile ? {
                position: 'fixed',
                zIndex: 10,
                left: openMenu ? '0' : '-100%',
                top: 0,
                width: '100%',
                height: '100%',
                flexDirection: 'column',
              } : {}
            }
          >
            {
              isMobile && (
              <Flex
                px="20px"
                py="10px"
                color="#FFFFFF"
                position="relative"
                _hover={{
                  bg: 'green.500',
                }}
                mb="30px"
                alignItems="center"
                justifyContent="space-between"
                onClick={() => setOpenMenu(false)}
              >
                FECHAR MENU

                <Icon as={FiX} fontSize="20px" />
              </Flex>
              )
          }

            <Flex flexDirection={isMobile ? 'column' : 'row'}>
              {menu.map((item) => (
                <Link
                  key={item.id + item.link + item.label}
                  px="20px"
                  py="10px"
                  color="#FFFFFF"
                  href={item.link}
                  position="relative"
                  _hover={{
                    bg: 'green.500',
                  }}
                >
                  {item.label}

                  {
                  (item.link === asPath || (item.link === '/imoveis' && asPath.includes(item.link))) && (
                    <Box bg="green.500" height={isMobile ? '100%' : '5px'} borderRadius="5px" width={isMobile ? '10px' : '100%'} position="absolute" left="0" bottom={isMobile ? '0' : '-2px'} />
                  )
                }
                </Link>
              ))}
            </Flex>

            <Link
              px={isMobile ? '20px' : '40px'}
              py="10px"
              color="#FFFFFF"
              bg="orange.700"
              href="/meu-escritorio"
              position="relative"
              _hover={{
                bg: 'orange.500',
              }}
            >
              MEU ESCRITÓRIO
            </Link>
          </Flex>
        </Container>
      </Box>
    </>
  )
}
