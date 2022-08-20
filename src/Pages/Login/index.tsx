import {
  Box, Button, Flex, Input,
} from '@chakra-ui/react'
import { Container } from '@src/Components/Container'
import { Dashboard } from '@src/Components/Dashboard'
import { useAlertContext } from '@src/Contexts/Alert.context'
import { api, urls } from '@src/Services/Api'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { apiFormData } from '@src/Services/ApiFormData'

export const Login: React.FC<any> = () => {
  const [user, setUser] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false)
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false)

  const { setAlert } = useAlertContext()

  const breadcrumb = [
    {
      label: 'HOME',
      href: '/',
      active: false,
    },
    {
      label: 'IMÓVEIS',
      href: '/#',
      active: true,
    },
  ]

  const router = useRouter()

  const handleRegister = async () => {
    setLoadingRegister(true)
    try {
      await api.post(urls.register.keep, { email })

      setAlert({
        type: 'success',
        message: 'Aguarde, estamos te redirecionando...',
      })

      router.push(`/registre-se?email=${email}`)
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: error?.response?.data?.error,
      })
    } finally {
      setLoadingRegister(false)
    }
  }

  const handleSignin = async () => {
    setLoadingLogin(true)
    try {
      const { data } : any = await api.post(urls.users.login, { user, password })

      setAlert({
        type: 'success',
        message: 'Login efetuado com sucesso...',
      })

      localStorage.setItem('token', data.token)
      api.setToken(data.token)
      apiFormData.setToken(data.token)

      router.push('/escritorio')
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: error?.response?.data?.error,
      })
    } finally {
      setLoadingLogin(false)
    }
  }

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem('token')

      if (token) {
        api.setToken(token)
        apiFormData.setToken(token)
        router.push('/escritorio')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    verifyToken()
  }, [router.asPath])

  return (
    <Dashboard
      title="Entre ou cadastre-se"
      breadcrumb={breadcrumb}
      breadcrumbCerter
    >
      <Container>
        <Box
          margin="auto"
          bg="gray.100"
          p="30px"
          width="100%"
          maxWidth="500px"
          mt="30px"
          borderRadius="5px"
          position="relative"
          pb="50px"
          mb="80px"
        >
          <Box>
            JÁ TENHO CONTA
          </Box>
          <Box mt="5px">
            A plataforma que realmente ouve os corretores, menor taxa e maior visibilidade.
          </Box>

          <Box>
            <Box mt="30px">
              <Input
                variant="outline"
                placeholder="Apelido ou E-mail"
                border="1px"
                bg="white"
                borderColor="gray.700"
                borderRadius="5px"
                onChange={({ target }) => setUser(target.value)}
                value={user}
                _placeholder={{
                  color: 'gray.700',
                }}
              />
            </Box>
            <Box mt="15px">
              <Input
                variant="outline"
                placeholder="Senha"
                border="1px"
                bg="white"
                type="password"
                borderColor="gray.700"
                borderRadius="5px"
                onChange={({ target }) => setPassword(target.value)}
                value={password}
                _placeholder={{
                  color: 'gray.700',
                }}
              />
            </Box>
            <Flex
              position="absolute"
              bottom="-20px"
              width="100%"
              left="0"
              justifyContent="center"
            >
              <Button
                width="60%"
                colorScheme="green"
                shadow="lg"
                height="40px"
                onClick={handleSignin}
                isLoading={loadingLogin}
                disabled={!user || !password}
              >
                Entrar
              </Button>
            </Flex>
          </Box>
        </Box>

        <Box
          margin="auto"
          bg="gray.100"
          p="30px"
          width="100%"
          maxWidth="500px"
          mt="30px"
          borderRadius="5px"
          position="relative"
          pb="50px"
          mb="80px"
        >
          <Box>
            AINDA NÃO TENHO CONTA
          </Box>
          <Box mt="5px">
            Vai ficar perdendo tempo enquanto os seus colegas estão ganhando mais dinheiro?
          </Box>

          <Box>
            <Box mt="30px">
              <Input
                variant="outline"
                placeholder="E-mail"
                border="1px"
                bg="white"
                borderColor="gray.700"
                borderRadius="5px"
                onChange={({ target }) => setEmail(target.value)}
                value={email}
                _placeholder={{
                  color: 'gray.700',
                }}
              />
            </Box>
            <Flex
              position="absolute"
              bottom="-20px"
              width="100%"
              left="0"
              justifyContent="center"
            >
              <Button
                width="60%"
                color="white"
                bg="gray.500"
                _hover={{
                  bg: 'gray.700',
                }}
                shadow="lg"
                height="40px"
                onClick={handleRegister}
                isLoading={loadingRegister}
                disabled={!email}
              >
                Criar conta
              </Button>
            </Flex>
          </Box>
        </Box>
      </Container>
    </Dashboard>
  )
}
