import {
  Box, Button, Grid, GridItem, Link,
} from '@chakra-ui/react'
import { Container } from '@src/Components/Container'
import { Dashboard } from '@src/Components/Dashboard'
import { api, urls } from '@src/Services/Api'
import React, { useEffect, useState } from 'react'
import { useUtilsContext } from '@src/Contexts/Utils.context'
import { Property } from '@src/Components/Property'
import { useLoadingContext } from '@src/Contexts/Loading.context'
import { Loader } from '@src/Components/Loader'
import Head from 'next/head'
import { useMobileContext } from '@src/Contexts/Mobile.context'
import Masonry from 'react-masonry-css'

export const Home: React.FC<any> = () => {
  const [properties, setProperties] = useState<any[]>()
  const { purposes, types, searchUtils } = useUtilsContext()
  const { setLoading, loading } = useLoadingContext()
  const { isMobile } = useMobileContext()

  const searchProperties = async () => {
    setLoading(true)
    try {
      const { data }: any = await api.get(`${urls.properties.findAll}?home=true`)

      setProperties(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    searchProperties()

    if (!purposes || !types) {
      searchUtils()
    }
  }, [])

  return (
    <>
      <Head>
        <title>Vitrine de Imóveis MS</title>
        <meta name="description" content="A forma mais simples de ser visto na internet." />
        <meta property="og:title" content="Vitrine de Imóveis MS" />
        <meta
          property="og:description"
          content="Vitrine de Imóveis MS - A forma mais simples de ser visto na internet."
        />
        <meta property="og:url" content="https://vitrinedeimoveisms.com.br/" />
        <meta property="og:type" content="website" />
      </Head>
      <Dashboard>
        <Container>
          { loading ? (
            <Loader />
          ) : (
            <Masonry
              breakpointCols={isMobile ? 1 : 3}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {
              properties?.map((property: any) => (
                <Box key={property.id} mt="30px">
                  <Property property={property} />
                </Box>
              ))
            }
            </Masonry>
          ) }

          <Box mt="30px" textAlign="center">
            <Link href="/imoveis/">
              <Button colorScheme="green">Ver todos</Button>
            </Link>
          </Box>
        </Container>
      </Dashboard>
    </>
  )
}
