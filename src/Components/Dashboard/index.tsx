import {
  Box,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Grid, GridItem, Image, Link,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'
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
  const a = 'a'
  return (
    <>
      <Header />
      <Banner title={title} />

      {
        bannerHeader && (
        <Box mt="30px" mb="30px">
          <Flex justifyContent="center">
            <Image src="/banners/grande-header.png" mr="30px" />
            <Image src="/banners/pequeno-header.png" />
          </Flex>
        </Box>
        )
      }

      {!!breadcrumb.length && (
        <Container>
          <Breadcrumb pt={bannerHeader ? '0' : '30px'} pb="30px" textAlign={breadcrumbCerter ? 'center' : 'initial'}>
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
        bannerFooter && (
        <Box py="30px">
          <Flex justifyContent="center">
            <Image src="/banners/grande-final.png" />
          </Flex>
        </Box>
        )
      }

      <Box bg="gray.700" py="60px" mt={bannerFooter ? '0' : '30px'}>
        <Container>
          <Grid
            templateColumns="repeat(4, 1fr)"
            gap={3}
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
                data-width="330"
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

      </Box>
    </>
  )
}
