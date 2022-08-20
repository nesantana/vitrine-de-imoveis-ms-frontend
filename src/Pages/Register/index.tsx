import {
  Box, Button, Container, Flex, Grid, GridItem,
} from '@chakra-ui/react'
import { Dashboard } from '@src/Components/Dashboard'
import { InputWithLabel } from '@src/Components/InputWithLabel'
import { useAlertContext } from '@src/Contexts/Alert.context'
import { api, urls } from '@src/Services/Api'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export const Register: React.FC<any> = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const { setAlert } = useAlertContext()

  const breadcrumb = [
    {
      label: 'HOME',
      href: '/',
      active: false,
    },
    {
      label: 'REGISTRE-SE',
      href: '/#',
      active: true,
    },
  ]

  const router = useRouter()

  const handleRegister = async () => {
    try {
      await api.post(urls.users.create, {
        name,
        email,
        password,
        confirm_password: confirmPassword,
      })

      setAlert({
        type: 'success',
        message: 'Cadastro efetuado com sucesso, aguarde enquanto te redireciono.',
      })

      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: error?.response?.data?.error,
      })
    }
  }

  useEffect(() => {
    const { email: queryEmail } = router.query

    setEmail(queryEmail as string)
  }, [router.query])

  return (
    <>
      <Head>
        <title>
          Registre-se | Vitrine de Imóveis MS
        </title>
        <meta name="description" content="Registre-se - A forma mais simples de ser visto na internet." />
      </Head>
      <Dashboard title="Finalize seu cadastro" breadcrumb={breadcrumb} breadcrumbCerter>
        <Container maxWidth="700px" width="100%">
          <Box padding="20px" bg="gray.100">
            <Box mb="30px">
              <InputWithLabel label="Nome" setValue={setName} value={name} />
            </Box>
            <Box mb="30px">
              <InputWithLabel label="E-mail" setValue={setEmail} value={email} />
            </Box>
            <Box mb="30px">
              <InputWithLabel label="Senha" setValue={setPassword} value={password} />
            </Box>
            <Box mb="30px">
              <InputWithLabel label="Confirmação de Senha" setValue={setConfirmPassword} value={confirmPassword} />
            </Box>
            <Flex
              justifyContent="center"
            >
              <Button
                width="60%"
                colorScheme="green"
                shadow="lg"
                height="40px"
                onClick={handleRegister}
              >
                Me cadastrar
              </Button>
            </Flex>
          </Box>
        </Container>
      </Dashboard>
    </>
  )
}
