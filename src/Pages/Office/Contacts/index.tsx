import {
  Box, Flex, Grid, GridItem, Icon, Link, Progress, Text, Tooltip,
} from '@chakra-ui/react'
import { DashboardOffice } from '@src/Components/DashboardOffice'
import { useAlertContext } from '@src/Contexts/Alert.context'
import { useLoadingContext } from '@src/Contexts/Loading.context'
import { api, urls } from '@src/Services/Api'
import React, { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiClipboard, FiEye } from 'react-icons/fi'
import Masonry from 'react-masonry-css'
import CopyToClipboard from 'react-copy-to-clipboard'
import Head from 'next/head'
import { Loader } from '@src/Components/Loader'
import { iContact } from '@src/Interfaces'
import { useMobileContext } from '@src/Contexts/Mobile.context'

export const Contacts: React.FC<any> = () => {
  const { setAlert } = useAlertContext()
  const { loading, setLoading } = useLoadingContext()
  const [contacts, setContacts] = useState<iContact[]>()
  const [loadingReadContact, setLoadingReadContact] = useState(false)

  const searchContacts = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(urls.contacts.findAll)

      setContacts(data as iContact[])
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Opss, algo deu errado.',
      })
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

  const { isMobile } = useMobileContext()

  return (
    <>
      <Head>
        <title>
          Contatos | Vitrine de Imóveis MS
        </title>
        <meta name="description" content="Contatos | Vitrine de Imóveis MS - A forma mais simples de ser visto na internet." />
        <meta property="og:title" content="Contatos | Vitrine de Imóveis MS" />
        <meta
          property="og:description"
          content="Contatos | Vitrine de Imóveis MS - A forma mais simples de ser visto na internet."
        />
        <meta property="og:url" content="https://vitrinedeimoveisms.com.br/" />
        <meta property="og:type" content="website" />
      </Head>
      <DashboardOffice>
        <Box mb="30px">
          Contatos
        </Box>
        {
          loading ? <Loader /> : (
            <Masonry
              breakpointCols={isMobile ? 1 : 2}
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
          )
        }
      </DashboardOffice>
    </>
  )
}
