import {
  Box, Flex, Icon, Link,
} from '@chakra-ui/react'
import { Container } from '@src/Components/Container'
import { DashboardOffice } from '@src/Components/DashboardOffice'
import { Loader } from '@src/Components/Loader'
import { Property } from '@src/Components/Property'
import { useLoadingContext } from '@src/Contexts/Loading.context'
import { useMobileContext } from '@src/Contexts/Mobile.context'
import { useMyInformations } from '@src/Contexts/MyInformations.context'
import { useUtilsContext } from '@src/Contexts/Utils.context'
import { iProperty } from '@src/Interfaces'
import { api, urls } from '@src/Services/Api'
import { isEmpty } from 'lodash'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { FiPlusSquare } from 'react-icons/fi'
import Masonry from 'react-masonry-css'

export const MyProperties: React.FC<any> = () => {
  const [properties, setProperties] = useState<iProperty[]>([] as iProperty[])
  const { myInformations, searchMyInformations } = useMyInformations()
  const { loading, setLoading } = useLoadingContext()

  const searchProperties = async () => {
    setLoading(true)
    try {
      const { data } : any = await api.get(
        urls.properties.findAll,
        { id_professional: myInformations.id },
      )

      setProperties(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const { searchUtils, purposes, types } = useUtilsContext()

  useEffect(() => {
    if (isEmpty(myInformations)) {
      searchMyInformations()
    } else {
      searchProperties()
    }
  }, [myInformations])

  if (!purposes.length || !types.length) {
    searchUtils()
  }

  const { isMobile } = useMobileContext()

  return (
    <>
      <Head>
        <title>
          Meus Imóveis | Escritório | Vitrine de Imóveis MS
        </title>
        <meta name="description" content="Meus Imóveis | Escritório | Vitrine de Imóveis MS - A forma mais simples de ser visto na internet." />
        <meta property="og:title" content="Meus Imóveis | Vitrine de Imóveis MS" />
        <meta
          property="og:description"
          content="Meus Imóveis | Vitrine de Imóveis MS - A forma mais simples de ser visto na internet."
        />
        <meta property="og:url" content="https://vitrinedeimoveisms.com.br/" />
        <meta property="og:type" content="website" />
      </Head>
      <DashboardOffice>
        <Container>
          <Masonry
            breakpointCols={isMobile ? 1 : 3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            <Link href="/escritorio/imoveis/novo/">
              <Flex width="100%" height="430px" bg="gray.200" borderRadius="5px" mb="15px" shadow="sm" flexDirection="column" alignItems="center" justifyContent="center">
                <Icon as={FiPlusSquare} fontSize="100px" strokeWidth={1} color="gray.500" />

                <Box color="gray.700">
                  Criar novo imóvel
                </Box>
              </Flex>
            </Link>
            {
              !!properties.length
              && properties?.map((property: any) => (
                <Box key={property.id} mb="15px">
                  <Property property={property} small hasEdit />
                </Box>
              ))
            }
          </Masonry>
        </Container>
      </DashboardOffice>
    </>
  )
}
