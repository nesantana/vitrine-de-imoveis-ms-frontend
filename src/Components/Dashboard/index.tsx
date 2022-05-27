/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Grid, GridItem, Icon, Image, Link, Tooltip,
} from '@chakra-ui/react'
import { useFavoritesContext } from '@src/Contexts/Favorite.context'
import { useMobileContext } from '@src/Contexts/Mobile.context'
import { iFavorite } from '@src/Interfaces'
import React, { ReactNode, useEffect } from 'react'
import {
  FaEye, FaStar, FaTrash, FaWhatsapp,
} from 'react-icons/fa'
import { FiImage, FiX } from 'react-icons/fi'
import { Banner } from '../Banner'
import { Container } from '../Container'
import { Header } from '../Header'

interface iDashboard {
  title?: string
  children: ReactNode
  breadcrumb?: any[],
  breadcrumbCerter?: boolean
  bannerHeader?: boolean
  bannerFooter?: boolean
}

export const Dashboard: React.FC<iDashboard> = ({
  children, title = '', breadcrumb = [], breadcrumbCerter = false,
  bannerHeader = true, bannerFooter = true,
}) => {
  const {
    favorites, removeFavorite, openFavorite, setOpenFavorite,
  } = useFavoritesContext()

  const {
    setIsMobile, isMobile,
  } = useMobileContext()

  const verifyMobile = () => {
    const { innerWidth: width } = window

    const resolutionMobile = width <= 1200

    setIsMobile(resolutionMobile)
  }

  useEffect(() => {
    verifyMobile()
    window.addEventListener('resize', verifyMobile)
    return () => window.removeEventListener('resize', verifyMobile)
  }, [])

  return (
    <>
      <Header isMobile={isMobile} />
      <Banner title={title} isMobile={isMobile} />

      {
        (bannerHeader && !isMobile) && (
        <Box mt="30px" mb="30px">
          <Flex justifyContent="center">
            <Link href="https://api.whatsapp.com/send?phone=5567981513750&text=Ol%C3%A1,%20tenho%20uma%20ideia%20e%20quero%20tirar%20ela%20do%20papel!" target="_blank"><Image src="/banners/grande-header.png" mr="30px" /></Link>
            <Link href="https://api.whatsapp.com/send?phone=5567981513750&text=Ol%C3%A1,%20quero%20anunciar%20no%20Vitrine%20de%20Im%C3%B3veis%20MS!" target="_blank"><Image src="/banners/pequeno-header.png" /></Link>
          </Flex>
        </Box>
        )
      }

      {!!breadcrumb.length && (
        <Container>
          <Breadcrumb pt={bannerHeader && !isMobile ? '0' : '30px'} pb="30px" textAlign={breadcrumbCerter ? 'center' : 'initial'}>
            {breadcrumb.map((bread, index) => (
              <BreadcrumbItem key={bread.label + bread.href + index} color="gray.500">
                <BreadcrumbLink as={Link} textTransform="uppercase" href={bread.href} color={bread.active && 'green'}>
                  {bread.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </Container>
      )}

      { children }

      {
        (bannerFooter && !isMobile) && (
        <Box py="30px">
          <Flex justifyContent="center">
            <Link href="https://api.whatsapp.com/send?phone=5567981513750&text=Ol%C3%A1,%20quero%20anunciar%20no%20Vitrine%20de%20Im%C3%B3veis%20MS!" target="_blank">
              <Image src="/banners/grande-final.png" />
            </Link>
          </Flex>
        </Box>
        )
      }

      <Box bg="gray.700" py="60px" mt={bannerFooter && !isMobile ? '0' : '30px'}>
        <Container>
          <Grid
            templateColumns={`repeat(${isMobile ? '1' : '4'}, 1fr)`}
            gap={30}
            width="100%"
          >
            <GridItem colSpan={3}>
              <Box color="white">
                Corretor responsavel: Elias Camilo
                <br />
                CRECI: 5831 - MS
                <br />
                <br />

                Telefone: (67) 9 8183-3112
                <br />
                E-mail: contato@negociosms.com.br
                <br />
                <br />

                "Somos uma empresa com foco em você cliente, com nossas parcerias
                <br />
                queremos lhe proporcionar um serviço especializado em captação e
                <br />
                escolha de imóveis, selecionamos apenas os melhores imóveis para você."
              </Box>
            </GridItem>
            <GridItem colSpan={1}>
              <div
                className="fb-page"
                data-href="https://www.facebook.com/vitrinedeimoveisms"
                data-tabs="timeline"
                data-width="100%"
                data-height="400"
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
              >
                <blockquote
                  cite="https://www.facebook.com/vitrinedeimoveisms"
                  className="fb-xfbml-parse-ignore"
                >
                  <a href="https://www.facebook.com/vitrinedeimoveisms">Negócios MS - Seu site de imóveis</a>
                </blockquote>
              </div>
            </GridItem>
          </Grid>
        </Container>

        { !!favorites.length && (
        <>
          <Box
            bg="white"
            position="fixed"
            bottom="110px"
            shadow="lg"
            overflow="hidden"
            borderRadius="5px"
            maxWidth="300px"
            zIndex="1"
            className={openFavorite ? 'open-favorites' : 'close-favorites'}
          >
            <Flex alignItems="center" bg="orange.500" height="40px" onClick={() => setOpenFavorite(false)} p="0 20px" color="white" justifyContent="space-between" cursor="pointer">
              Favoritos
              <Icon as={FiX} />
            </Flex>
            <Box overflow="auto" maxHeight="330px">
              {
                favorites.map((fav: iFavorite, index) => (
                  <Flex key={fav.id + fav.title} bg={index % 2 === 0 ? 'white' : 'gray.100'} p="20px" position="relative">
                    {
                      fav.photo.length ? (
                        <Box height="70px" minWidth="70px" width="70px" mr="10px" backgroundImage={`url(${fav.photo})`} backgroundSize="cover" backgroundPosition="center center" />
                      ) : (
                        <Flex height="70px" minWidth="70px" width="70px" mr="10px" bg="gray.300" justifyContent="center" alignItems="center">
                          <Icon as={FiImage} fontSize={20} color="gray.500" />
                        </Flex>
                      )
                    }
                    <Box>
                      <Box fontSize="14px">
                        {fav.title}
                      </Box>

                      <Flex mt="5px" justifyContent="space-between" width="100%">
                        <Flex>
                          <Tooltip label="Compartilhar com alguém no WhatsApp!" hasArrow placement="right">
                            <Link position="relative" top="2px" href={`https://api.whatsapp.com/send?text=Olha o que achei no Vitrine de Imóveis MS! ${fav.title} - veja mais no link: ${process.env.NEXT_PUBLIC_MY_URL}/imoveis/${fav.id}`} target="_blank">
                              <Icon as={FaWhatsapp} marginLeft="5px" />
                            </Link>
                          </Tooltip>
                          <Tooltip label="Ver imóvel!" hasArrow placement="right">
                            <Link position="relative" top="2px" href={`${process.env.NEXT_PUBLIC_MY_URL}/imoveis/${fav.id}`} target="_blank">
                              <Icon as={FaEye} marginLeft="5px" />
                            </Link>
                          </Tooltip>
                        </Flex>
                        <Flex>
                          <Tooltip label="Remover!" hasArrow placement="right">
                            <Box position="absolute" right="30px" bottom="17px" onClick={() => removeFavorite(fav.id)} cursor="pointer">
                              <Icon as={FaTrash} marginLeft="5px" />
                            </Box>
                          </Tooltip>
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                ))
              }
            </Box>
          </Box>
          <Flex
            bg="orange.500"
            position="fixed"
            bottom="30px"
            left="30px"
            height="50px"
            width="50px"
            alignItems="center"
            justifyContent="center"
            shadow={openFavorite ? 'md' : 'none'}
            onClick={() => setOpenFavorite(!openFavorite)}
            borderRadius="5px"
            cursor="pointer"
          >
            <Icon as={FaStar} fill="white" fontSize="20px" />

            <Flex position="absolute" top="-10px" right="-10px" bg="green.500" height="20px" width="20px" alignItems="center" justifyContent="center" color="white" borderRadius="20px" fontSize="12px" fontWeight="bold">
              {favorites.length}
            </Flex>
          </Flex>
        </>
        ) }
      </Box>
    </>
  )
}
