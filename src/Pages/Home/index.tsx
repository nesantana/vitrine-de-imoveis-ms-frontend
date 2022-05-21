import {
  Badge,
  Box, Button, Flex, Grid, GridItem, Icon, Image, Link,
} from '@chakra-ui/react'
import { Container } from '@src/Components/Container'
import { Dashboard } from '@src/Components/Dashboard'
import { api, urls } from '@src/Services/Api'
import React, { useEffect, useState } from 'react'
import { FiImage, FiMapPin, FiStar } from 'react-icons/fi'
import {
  FaArrowsAlt, FaDoorOpen, FaBed, FaBath,
} from 'react-icons/fa'
import { useUtilsContext } from '@src/Contexts/Utils.context'
import { Property } from '@src/Components/Property'
import { useLoadingContext } from '@src/Contexts/Loading.context'
import { Loader } from '@src/Components/Loader'
import Head from 'next/head'

export const Home: React.FC<any> = () => {
  const [properties, setProperties] = useState<any[]>()
  const { purposes, types, searchUtils } = useUtilsContext()
  const { setLoading, loading } = useLoadingContext()

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
      </Head>
      <Dashboard>
        <Container>
          { loading ? (
            <Loader />
          ) : (
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap={3}
              mt="30px"
              width="100%"
              background="#FFFFFF"
            >
              {
              properties?.map((property: any) => (
                <GridItem
                  key={property.id}
                  colSpan={1}
                >
                  <Property property={property} />
                </GridItem>
              ))
            }
            </Grid>
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
