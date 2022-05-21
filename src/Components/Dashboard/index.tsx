import {
  Box,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid, GridItem, Link,
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
}

export const Dashboard: React.FC<iDashboard> = ({
  children, title = '', breadcrumb = [], breadcrumbCerter = false,
}) => {
  const a = 'a'
  return (
    <>
      <Header />
      <Banner title={title} />

      {!!breadcrumb.length && (
        <Container>
          <Breadcrumb py="30px" textAlign={breadcrumbCerter ? 'center' : 'initial'}>
            {breadcrumb.map((bread, index) => (
              <BreadcrumbItem key={bread.label + bread.href} color="gray.500">
                <BreadcrumbLink as={Link} textTransform="uppercase" href={bread.href} color={bread.active && 'green'}>
                  {bread.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </Container>
      )}

      { children }

      <Box bg="gray.700" mt="30px" py="60px">
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
