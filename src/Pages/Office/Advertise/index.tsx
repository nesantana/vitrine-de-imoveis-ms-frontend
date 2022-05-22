import { Box, Grid, GridItem } from '@chakra-ui/react'
import { Container } from '@src/Components/Container'
import { DashboardOffice } from '@src/Components/DashboardOffice'
import { Loader } from '@src/Components/Loader'
import { useLoadingContext } from '@src/Contexts/Loading.context'
import { useMyInformations } from '@src/Contexts/MyInformations.context'
import { api, urls } from '@src/Services/Api'
import { formatter } from '@src/Utils/NumberFormat'
import { isEmpty } from 'lodash'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

export const AdvertiseOffice: React.FC<any> = () => {
  const { loading, setLoading } = useLoadingContext()
  const [advertises, setAdvertises] = useState<any[]>()

  const searchAdvertise = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(urls.advertise.findAll)

      setAdvertises(data as any[])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const { myInformations, searchMyInformations } = useMyInformations()

  useEffect(() => {
    if (isEmpty(myInformations)) {
      searchMyInformations()
    }

    searchAdvertise()
  }, [])

  if (loading) {
    return <Loader />
  }

  if (!Number(myInformations.is_admin)) {
    return (
      <Box>
        Sem permissão para acessar.
      </Box>
    )
  }

  return (
    <>
      <Head>
        <title>
          Solicitações de Anúncios | Vitrine de Imóveis MS
        </title>
        <meta name="description" content="Solicitações de Anúncios | Vitrine de Imóveis MS - A forma mais simples de ser visto na internet." />
      </Head>
      <DashboardOffice>
        <Container>
          <Box mb="30px">
            Solicitações de Anúncios
          </Box>
          {
          advertises?.map((adv, index) => (
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap="10px"
              width="100%"
              key={`${adv.id}-adv`}
              bg={index % 2 === 0 ? 'gray.100' : 'white'}
              borderRadius="5px"
              padding="20px"
            >
              <GridItem
                colSpan={1}
              >
                <strong>Nome:</strong>
                <br />
                {adv.name}
              </GridItem>
              <GridItem
                colSpan={1}
              >
                <strong>E-mail:</strong>
                <br />
                {adv.email ?? 'Não informado'}
              </GridItem>
              <GridItem
                colSpan={1}
              >
                <strong>Telefone:</strong>
                <br />
                { adv.phone ?? 'Não informado' }
              </GridItem>
              <GridItem
                colSpan={3}
              >
                <strong>Observações:</strong>
                <br />
                { adv.observation ?? 'Não informado' }
              </GridItem>
            </Grid>
          ))
        }
        </Container>
      </DashboardOffice>
    </>
  )
}
