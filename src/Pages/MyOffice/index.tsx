import {
  Box, Button, Container, Flex, Grid, GridItem, Icon, Image, Link,
} from '@chakra-ui/react'
import { Dashboard } from '@src/Components/Dashboard'
import Head from 'next/head'
import React from 'react'
import { FcHome, FcSmartphoneTablet, FcStatistics } from 'react-icons/fc'

export const MyOffice: React.FC<any> = () => {
  const a = 'a'
  const breadcrumb = [
    {
      label: 'HOME',
      href: '/',
      active: false,
    },
    {
      label: 'MEU ESCRITÓRIO',
      href: '/#',
      active: true,
    },
  ]

  return (
    <>
      <Head>
        <title>
          Meu Escritório | Vitrine de Imóveis MS
        </title>
        <meta name="description" content="Meu Escritório | Vitrine de Imóveis MS - A forma mais simples de ser visto na internet." />
      </Head>
      <Dashboard title="Meu escritório" breadcrumb={breadcrumb} breadcrumbCerter>
        <Container maxWidth="900px">
          <Box fontSize="34px" fontWeight="500" textAlign="center">
            Agora ficou mais fácil estar inserido na internet!
          </Box>
          <Box textAlign="center" maxWidth="600px" margin="30px auto 60px">
            <Box fontSize="22px" fontWeight="500" mb="20px">
              Já imaginou ter seu escritório virtual?
            </Box>
            <Box mb="10px">
              Nunca foi tão rápido e barato para ter seu escritório virtual!
            </Box>
            <Box mb="10px">
              A nossa ideia é que você assine o seu escritório, pagando super
              pouquinho por mês, tendo acesso a toda a plataforma e podendo alavancar suas vendas.
            </Box>
            <Box>
              Aqui você divulga só o seu link.
            </Box>
          </Box>

          <Box mb="60px">

            <Grid
              templateColumns="repeat(3, 1fr)"
              gap={5}
              width="100%"
              textAlign="center"
            >
              <GridItem colSpan={1}>
                <Box shadow="md" p="20px" bg="#f8f8f8" minHeight="420px">
                  <Box>
                    <Icon as={FcHome} fontSize="100px" />
                  </Box>
                  <Box mb="20px" fontSize="22px" fontWeight="600" color="green.500">
                    Seus imóveis
                  </Box>
                  <Box mb="10px">
                    Aqui você pode cadastrar imóveis a vontade, não temos limitações
                    de imóveis e nem de quantidade de imagens nele.
                  </Box>
                  <Box>
                    Você pode criar novas Características que melhor
                    lhe atenda e solicitar melhorias na plataforma, nossa prioridade é você correto!
                  </Box>
                </Box>
              </GridItem>
              <GridItem colSpan={1}>
                <Box shadow="md" p="20px" bg="#f8f8f8" minHeight="420px">
                  <Box>
                    <Icon as={FcStatistics} fontSize="100px" />
                  </Box>
                  <Box mb="20px" fontSize="22px" fontWeight="600" color="green.500">
                    Escritório Virtual
                  </Box>
                  <Box mb="10px">
                    Já imaginou ser encontrado fácilmente na internet?
                    Nosso maior diferencial é que você pode compartilhar seu link de forma simples.
                  </Box>
                  <Box mb="10px">
                    Você pode trocar o seu epelido a todo momento,
                    e pode compartilhar de forma simples.
                  </Box>
                  <Box color="blue.400" textDecoration="underline">
                    {process.env.NEXT_PUBLIC_MY_URL}
                    /seunome
                  </Box>
                </Box>
              </GridItem>
              <GridItem colSpan={1}>
                <Box shadow="md" p="20px" bg="#f8f8f8" minHeight="420px">
                  <Box>
                    <Icon as={FcSmartphoneTablet} fontSize="100px" />
                  </Box>
                  <Box mb="20px" fontSize="22px" fontWeight="600" color="green.500">
                    Cartão Virtual
                  </Box>
                  <Box mb="10px">
                    Completou o cadastro e saiu com um cartão virtual pronto para ser usado!
                  </Box>
                  <Box mb="10px">
                    Você pode compartilhar seu cartão virtual, é super simples.
                  </Box>
                  <Box>
                    É o último gasto que você terá para estar on-line!
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </Box>

          <Box mb="60px">
            <Box mb="20px" textAlign="center" fontSize="30px">
              A forma mais simples e barata de ter sua marca na internet!
            </Box>
            <Image src="/meu-escritorio.png" />
          </Box>

          <Box mb="20px" textAlign="center" fontSize="30px">
            Não é promoção, é o valor final!
          </Box>

          <Box shadow="lg" p="20px" borderRadius="5px" mt="30px" bg="#f8f8f8">
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

                <Link href="/login">
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
        </Container>
      </Dashboard>
    </>
  )
}
