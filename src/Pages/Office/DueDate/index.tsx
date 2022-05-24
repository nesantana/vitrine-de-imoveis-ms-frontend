import {
  Box, Flex, Grid, GridItem, Icon, Link, Tooltip,
} from '@chakra-ui/react'
import { DashboardOffice } from '@src/Components/DashboardOffice'
import { Loader } from '@src/Components/Loader'
import { useAlertContext } from '@src/Contexts/Alert.context'
import { useLoadingContext } from '@src/Contexts/Loading.context'
import { useMyInformations } from '@src/Contexts/MyInformations.context'
import { api, urls } from '@src/Services/Api'
import { isEmpty } from 'lodash'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { HiUserRemove, HiUserAdd } from 'react-icons/hi'

export const DueDate: React.FC<any> = () => {
  const { loading, setLoading } = useLoadingContext()
  const [dueDates, setDueDate] = useState<any[]>()
  const { setAlert } = useAlertContext()

  const searchDueDate = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(urls.dueDate.findAll)

      setDueDate(data as any[])
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

    searchDueDate()
  }, [])

  const renewAccess = async (id: number) => {
    setLoading(true)
    try {
      await api.post(urls.dueDate.renewAccess + id)

      setAlert({
        type: 'success',
        message: 'Acesso renovado com sucesso!',
      })
    } catch (error) {
      console.error(error)

      setAlert({
        type: 'error',
        message: 'Opss, algo deu errado.',
      })
    } finally {
      setLoading(false)
    }
  }

  const removeAccess = async (id: number) => {
    setLoading(true)
    try {
      await api.post(urls.dueDate.removeAccess + id)

      setAlert({
        type: 'success',
        message: 'Acesso removido com sucesso!',
      })
    } catch (error) {
      console.error(error)

      setAlert({
        type: 'error',
        message: 'Opss, algo deu errado.',
      })
    } finally {
      setLoading(false)
    }
  }

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
          Vencimentos | Vitrine de Imóveis MS
        </title>
        <meta name="description" content="Vencimentos | Vitrine de Imóveis MS - A forma mais simples de ser visto na internet." />
      </Head>
      <DashboardOffice>
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap="10px"
          width="100%"
          bg="gray.100"
          borderRadius="5px"
          padding="20px"
        >
          <GridItem
            colSpan={1}
          >
            <strong>Nome:</strong>
          </GridItem>
          <GridItem
            colSpan={1}
          >
            <strong>E-mail:</strong>
          </GridItem>
          <GridItem
            colSpan={1}
          >
            <strong>Ações:</strong>
          </GridItem>
        </Grid>
        {
          dueDates?.map((due, index) => (
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap="10px"
              width="100%"
              key={`${due.id}duedate`}
              bg={index % 2 !== 0 ? 'gray.100' : 'white'}
              borderRadius="5px"
              padding="20px"
            >
              <GridItem
                colSpan={1}
              >
                {due.name}
              </GridItem>
              <GridItem
                colSpan={1}
              >
                {due.email ?? 'Não informado'}
              </GridItem>
              <GridItem
                colSpan={1}
              >
                <Flex>
                  {Number(due.access) ? (
                    <Tooltip label="Remover Acesso!" hasArrow placement="right">
                      <Box position="relative" top="2px" onClick={() => removeAccess(due.id)}>
                        <Icon as={HiUserRemove} marginLeft="5px" fontSize="20px" cursor="pointer" />
                      </Box>
                    </Tooltip>
                  ) : (
                    <Tooltip label="Renovar Acesso!" hasArrow placement="right">
                      <Box position="relative" top="2px" onClick={() => renewAccess(due.id)}>
                        <Icon as={HiUserAdd} marginLeft="5px" fontSize="20px" cursor="pointer" />
                      </Box>
                    </Tooltip>
                  )}
                  <Tooltip label="Falar no WhatsApp!" hasArrow placement="right">
                    <Link position="relative" top="2px" href={`https://api.whatsapp.com/send?phone=55${due.phone}&text=Ol%C3%A1%20${due.name}, a assinatura do seu escritório na plataforma Vitrine de Imóveis MS venceu, vamos negociar?`} target="_blank">
                      <Icon as={FaWhatsapp} fontSize="20px" marginLeft="5px" />
                    </Link>
                  </Tooltip>
                </Flex>
              </GridItem>
            </Grid>
          ))
        }
      </DashboardOffice>
    </>
  )
}
