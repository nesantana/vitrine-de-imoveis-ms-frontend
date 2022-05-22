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

export const FinancingOffice: React.FC<any> = () => {
  const { loading, setLoading } = useLoadingContext()
  const [financings, setFinancings] = useState<any[]>()

  const searchFinancing = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(urls.financing.findAll)

      setFinancings(data as any[])
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

    searchFinancing()
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
          Simulações de Financiamento | Vitrine de Imóveis MS
        </title>
        <meta name="description" content="Simulações de Financiamento | Vitrine de Imóveis MS - A forma mais simples de ser visto na internet." />
      </Head>
      <DashboardOffice>
        <Container>
          <Box mb="30px">Solicitações de Financimento</Box>

          {
          financings?.map((fin, index) => (
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap="10px"
              width="100%"
              key={`${fin.id}financiamento`}
              bg={index % 2 === 0 ? 'gray.100' : 'white'}
              borderRadius="5px"
              padding="20px"
            >
              <GridItem
                colSpan={1}
              >
                <strong>Nome:</strong>
                <br />
                {fin.name}
              </GridItem>
              <GridItem
                colSpan={1}
              >
                <strong>E-mail:</strong>
                <br />
                {fin.email ?? 'Não informado'}
              </GridItem>
              <GridItem
                colSpan={1}
              >
                <strong>Cidade - Estado:</strong>
                <br />
                {fin.city}
                {' '}
                -
                {' '}
                { fin.state}
              </GridItem>
              <GridItem
                colSpan={1}
              >
                <strong>Document:</strong>
                <br />
                { fin.document ?? 'Não informado'}
              </GridItem>
              <GridItem
                colSpan={1}
              >
                <strong>Telefone:</strong>
                <br />
                { fin.phone ?? 'Não informado' }
              </GridItem>
              <GridItem
                colSpan={1}
              >
                <strong>Preço da Casa:</strong>
                <br />
                { formatter.format(fin.price_house) ?? 'Não informado' }
              </GridItem>
              <GridItem
                colSpan={1}
              >
                <strong>Salário:</strong>
                <br />
                { formatter.format(fin.salary) ?? 'Não informado' }
              </GridItem>
              <GridItem
                colSpan={1}
              >
                <strong>Tipo da Casa:</strong>
                <br />
                { fin.type_house ?? 'Não informado' }
              </GridItem>
              <GridItem
                colSpan={1}
              >
                <strong>Parcela Mínima:</strong>
                <br />
                { formatter.format(fin.installment_min) ?? 'Não informado' }
              </GridItem>
              <GridItem
                colSpan={1}
              >
                <strong>Parcela Máxima:</strong>
                <br />
                { formatter.format(fin.installment_max) ?? 'Não informado'}
              </GridItem>
            </Grid>
          ))
        }
        </Container>
      </DashboardOffice>
    </>
  )
}
