import React, { useEffect } from 'react'
import {
  Box, Flex, Image, Link,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useFavoritesContext } from '@src/Contexts/Favorite.context'
import { Container } from '../Container'

export const Header: React.FC<any> = () => {
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
          <Flex justifyContent="space-between">
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
      <Flex width="100%" justifyItems="center" alignItems="center" py="30px">
        <Box margin="auto" justifyContent="center" textAlign="center">
          <Link href="/">
            <Image src="/logo.png" width="346px" />
          </Link>

          <Box>
            A forma mais fácil de estar e ser visto na web
          </Box>
        </Box>
      </Flex>
      <Box>
        <Container>
          <Flex bg="gray.600" width="100%" padding="0 0 0 20px" justifyContent="space-between">
            <Flex>
              {menu.map((item) => (
                <Link
                  key={item.id}
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
                    <Box bg="green.500" height="5px" borderRadius="5px" width="100%" position="absolute" left="0" bottom="-2px" />
                  )
                }
                </Link>
              ))}
            </Flex>

            <Link
              px="40px"
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

              {
                  asPath === '/meu-escritorio' && (
                    <Box bg="green.500" height="5px" borderRadius="5px" width="100%" position="absolute" left="0" bottom="-2px" />
                  )
                }
            </Link>
          </Flex>
        </Container>
      </Box>
    </>
  )
}
