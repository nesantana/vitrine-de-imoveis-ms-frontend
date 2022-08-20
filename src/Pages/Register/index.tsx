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
  //contas sociais
  const [conta_i, setconta_i] = useState<string>('')
  const [conta_f, setconta_f] = useState<string>('')
  const [conta_y, setconta_y] = useState<string>('')

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
        //contas sociais
        conta_i,
        conta_f,
        conta_y,
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
        <meta property="og:title" content="Registre-se | Vitrine de Imóveis MS" />
        <meta
          property="og:description"
          content="Registre-se | Vitrine de Imóveis MS - A forma mais simples de ser visto na internet."
        />
        <meta property="og:url" content="https://vitrinedeimoveisms.com.br/" />
        <meta property="og:type" content="website" />
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
             //inserir instagram
            <Box mb="30px">
             <InputWithLabel label="Conta do Instagram" setValue={setconta_i} value={conta_i} />
            </Box>
             //inserir facebook
            <Box mb="30px">
             <InputWithLabel label="Conta do Facebook" setValue={setconta_f} value={conta_f} />
            </Box>
             //inserir youtube
            <Box mb="30px">
             <InputWithLabel label="Conta do Youtube" setValue={setconta_y} value={conta_y} />
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
