import {
  Box, Button, Flex, FormLabel, Input, Textarea,
} from '@chakra-ui/react'
import { Container } from '@src/Components/Container'
import { Dashboard } from '@src/Components/Dashboard'
import { useAlertContext } from '@src/Contexts/Alert.context'
import { api, urls } from '@src/Services/Api'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

import NumberFormatInput from 'react-number-format'

export const Advertise: React.FC<any> = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [observation, setObservation] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const { setAlert } = useAlertContext()

  const handleSend = async () => {
    setLoading(true)
    try {
      const params = {
        name,
        email,
        phone,
        observation,
      }

      await api.post(urls.advertise.create, { ...params })

      setAlert({
        type: 'success',
        message: 'Aguarde, entraremos em contato com você em breve!',
      })
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Opss, algo deu errado enquanto salvávamos seu contato, entre em contato novamente!',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>
          Anuncie aqui no Vitrine de Imóveis MS
        </title>
        <meta name="description" content="Anuncie aqui no Vitrine de Imóveis MS! - A forma mais simples de ser visto na internet." />
      </Head>
      <Dashboard title="Anuncie aqui!" bannerFooter={false} bannerHeader={false}>
        <Container textAlign="center">
          <Box mt="30px" mb="10px" fontSize="24px" fontWeight="500">Temos algumas opções de anúncios aqui na plataforma.</Box>

          <Box mb="30px">Entre em contato para podermos lhe apresentar a carta de investimento!</Box>

          <Flex justifyContent="center">
            <Box
              width="370px"
              bg="gray.100"
              p="20px"
              borderRadius="5px"
              shadow="md"
            >
              <Box mb="10px" fontSize="18px" fontWeight="500">
                Solicitar contato
              </Box>
              <Input
                mb="20px"
                variant="outline"
                placeholder="Nome da Anunciante (PF ou PJ)"
                border="1px"
                id="name"
                bg="white"
                isFullWidth
                borderColor="gray.700"
                borderRadius="5px"
                onChange={({ target }) => setName(target.value)}
                value={name}
                _placeholder={{
                  color: 'gray.700',
                }}
              />
              <Input
                mb="20px"
                variant="outline"
                placeholder="E-mail"
                border="1px"
                id="email"
                bg="white"
                isFullWidth
                borderColor="gray.700"
                borderRadius="5px"
                onChange={({ target }) => setEmail(target.value)}
                value={email}
                _placeholder={{
                  color: 'gray.700',
                }}
              />

              <NumberFormatInput
                customInput={Input}
                mb="20px"
                format="(##) #####-####"
                variant="outline"
                placeholder="Telefone"
                onChange={({ value } : { value: string }) => setPhone(value)}
                value={phone}
                border="1px"
                bg="white"
                borderColor="gray.700"
                borderRadius="5px"
                _placeholder={{
                  color: 'gray.700',
                }}
              />
              <Textarea
                mb="20px"
                variant="outline"
                placeholder="Observações"
                border="1px"
                id="email"
                bg="white"
                isFullWidth
                borderColor="gray.700"
                height="200px"
                borderRadius="5px"
                onChange={({ target }) => setObservation(target.value)}
                value={observation}
                _placeholder={{
                  color: 'gray.700',
                }}
              />
              <Button colorScheme="green" minWidth="200px" isLoading={loading} onClick={handleSend}>
                Solicitar
              </Button>
            </Box>
          </Flex>
        </Container>
      </Dashboard>
    </>
  )
}
