import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Link,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { Container } from '@src/Components/Container'
import { DashboardOffice } from '@src/Components/DashboardOffice'
import { useMyInformations } from '@src/Contexts/MyInformations.context'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useLoadingContext } from '@src/Contexts/Loading.context'
import { iContact } from '@src/Interfaces'
import { api, urls } from '@src/Services/Api'
import CopyToClipboard from 'react-copy-to-clipboard'
import { FiClipboard, FiEye, FiPlusSquare } from 'react-icons/fi'
import Masonry from 'react-masonry-css'
import { Loader } from '@src/Components/Loader'
import { FaWhatsapp } from 'react-icons/fa'

export const Office: React.FC<any> = () => {
  const { myInformations, searchMyInformations } = useMyInformations()
  const [openSignature, setOpenSignatura] = useState<boolean>(false)

  useEffect(() => {
    if (isEmpty(myInformations)) {
      searchMyInformations()
    }
  }, [])

  const { loading, setLoading } = useLoadingContext()
  const [contacts, setContacts] = useState<iContact[]>()

  const searchContacts = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(urls.contacts.findOpen)

      setContacts(data as iContact[])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    searchContacts()
  }, [])

  const handleClickRead = async (id: number) => {
    try {
      await api.post(urls.contacts.read + id)

      const newContacts = contacts?.map((contact) => {
        if (contact.id === id) {
          return {
            ...contact,
            read: '1',
          }
        }

        return contact
      })

      setContacts(newContacts)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>
          Escritório | Vitrine de Imóveis MS
        </title>
        <meta name="description" content="Escritório | Vitrine de Imóveis MS - A forma mais simples de ser visto na internet." />
      </Head>
      <DashboardOffice>
        <Container>
          {myInformations.pendding && (
          <Alert status="error" borderRadius="5px" mb="30px">
            <Flex justifyContent="space-between" width="100%">
              <Flex alignItems="center">
                <AlertIcon />
                <AlertTitle>Problemas com sua assinatura!</AlertTitle>
                <AlertDescription>Você já assinou o Vitrine de Imóveis MS?</AlertDescription>
              </Flex>

              <Button colorScheme="orange" onClick={() => setOpenSignatura(!openSignature)}>
                Regualizar
              </Button>
            </Flex>
          </Alert>
          )}

          {openSignature && (
          <Box shadow="lg" p="20px" borderRadius="5px" bg="white" mt="30px" mb="30px">
            <Grid
              templateColumns="repeat(5, 1fr)"
              gap={5}
              width="100%"
              alignItems="center"
            >
              <GridItem colSpan={3}>
                <Box fontWeight="bold" mb="10px" fontSize="20px" color="green.500">
                  Assinatura mensal
                </Box>
                <Box mb="10px">
                  A nossa assinatura mensal te dá opção de usar todo o nosso sistema,
                  {' '}
                  para poder te auxiliar nas vendas e conseguir alcançar novos patamares na
                  {' '}
                  sua carreira como Corretor de Imóveis.
                </Box>

                <Box mb="10px">Faça parte da nossa comunidade de corretores.</Box>

                <Box color="gray.500" mb="10px">A assinatura pode demorar até 24h para ser ativada</Box>
                <Box color="gray.500" mb="20px">
                  É importante que o mesmo e-mail usado na plataforma de
                  {' '}
                  pagamento, seja seu e-mail cadastrado aqui.
                </Box>

                <Link href="http://pag.ae/7Yeg2QUYM" target="_blank">
                  <Button colorScheme="green">
                    Quero ter acesso a tudo!
                  </Button>
                </Link>
              </GridItem>

              <GridItem colSpan={2}>
                <Flex mb="10px" fontSize="107px" alignItems="flex-end" justifyContent="center" color="green.500">
                  <Box fontSize="20px" position="relative" top="-85px" right="5px">R$</Box>
                  97
                  <Box fontSize="20px" position="relative" top="-35px" left="-10px">,00</Box>
                </Flex>
              </GridItem>
            </Grid>
          </Box>
          )}

          <Link href="/escritorio/imoveis/novo/">
            <Flex width="100%" height="180px" bg="gray.200" borderRadius="5px" mb="30px" shadow="sm" flexDirection="column" alignItems="center" justifyContent="center">
              <Icon as={FiPlusSquare} fontSize="70px" strokeWidth={1} color="gray.500" />

              <Box color="gray.700">
                Criar novo imóvel
              </Box>
            </Flex>
          </Link>

          {
            !!contacts?.length && (
              <>
                <Box mb="30px">
                  Contatos não lidos:
                </Box>
                <Masonry
                  breakpointCols={2}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {
            !!contacts?.length && contacts.map((contact: iContact) => (
              <Box
                key={contact.id}
                padding="20px"
                bg="gray.100"
                borderRadius="5px"
                borderTop="2px"
                borderTopColor={Number(contact.read) ? 'gray.900' : 'orange.900'}
                marginBottom="15px"
              >
                <Box>
                  <strong>Título Imóvel:</strong>
                  {' '}
                  {contact.title_propertie}
                </Box>
                <Flex alignItems="center">
                  <Text fontWeight="bold" marginRight="5px">COD. Imóvel:</Text>

                  {contact.id_properties}

                  <Tooltip label="Copiar Código do Imóvel!" hasArrow placement="right">
                    <Box position="relative" top="2px">
                      <CopyToClipboard text={contact.phone}>
                        <Icon as={FiClipboard} marginLeft="5px" cursor="pointer" />
                      </CopyToClipboard>
                    </Box>
                  </Tooltip>

                  <Tooltip label="Ver Imóvel!" hasArrow placement="right">
                    <Link position="relative" top="2px" href={`/imoveis/${contact.id_properties}`} target="_blank">
                      <Icon as={FiEye} marginLeft="5px" cursor="pointer" />
                    </Link>
                  </Tooltip>
                </Flex>
                <Box>
                  <strong>Nome:</strong>
                  {' '}
                  {contact.name}
                </Box>
                <Flex alignItems="center">
                  <Text fontWeight="bold" marginRight="5px">Celular:</Text>

                  {contact.phone}

                  <Tooltip label="Copiar Telefone!" hasArrow placement="right">
                    <Box position="relative" top="2px">
                      <CopyToClipboard text={contact.phone}>
                        <Icon as={FiClipboard} marginLeft="5px" cursor="pointer" />
                      </CopyToClipboard>
                    </Box>
                  </Tooltip>
                  <Tooltip label="Ir para o WhatsApp!" hasArrow placement="right">
                    <Link position="relative" top="2px" href={`https://api.whatsapp.com/send?phone=55${contact.phone}&text=Ol%C3%A1%20${contact.name},%20vi%20que%20se%20interessou%20pelo%20meu%20imóvel:%20${contact.title_propertie},%20através%20do%20Vitrine%20de%20Imóveis%20MS.%20Como%20posso%20te%20ajudar?`} target="_blank">
                      <Icon as={FaWhatsapp} marginLeft="5px" />
                    </Link>
                  </Tooltip>
                </Flex>
                <Flex alignItems="center">
                  <Text fontWeight="bold" marginRight="5px">E-mail:</Text>

                  {contact.email}

                  <Tooltip label="Copiar E-mail!" hasArrow placement="right">
                    <Box position="relative" top="2px">
                      <CopyToClipboard text={contact.email}>
                        <Icon as={FiClipboard} marginLeft="5px" cursor="pointer" />
                      </CopyToClipboard>
                    </Box>
                  </Tooltip>
                </Flex>

                <Box mt="10px" padding="20px" bg="white" borderRadius="5px" cursor="pointer" onClick={() => handleClickRead(contact.id)}>
                  {
                    Number(contact.read) ? (
                      <>
                        <strong>Mensagem:</strong>
                        {' '}
                        {contact.message}
                      </>
                    ) : 'Clique para abrir'
                  }
                </Box>
              </Box>
            ))
          }
                </Masonry>
              </>
            )
        }
        </Container>
      </DashboardOffice>
    </>
  )
}
