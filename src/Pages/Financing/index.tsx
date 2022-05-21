import { Box, Flex, Link } from '@chakra-ui/react'
import { Container } from '@src/Components/Container'
import { Dashboard } from '@src/Components/Dashboard'
import Head from 'next/head'
import React from 'react'

export const Financing = () => {
  const breadcrumb = [
    {
      label: 'HOME',
      href: '/',
      active: false,
    },
    {
      label: 'FINANCIAMENTOS',
      href: '/#',
      active: true,
    },
  ]

  const items = [
    {
      id: 0,
      link: 'https://ww3.itau.com.br/imobline/pre/simuladores_new/index.aspx?IDENT_bkl=pre&IMOB_tipobkl=',
      image: 'https://cdn1.valuegaia.com.br/gaiasite/templates/banks/itau.jpg',
    },
    {
      id: 1,
      link: 'https://www.webcasas.com.br/webcasas/?headerandfooter/#/dados-pessoais',
      image: 'https://cdn1.valuegaia.com.br/gaiasite/templates/banks/santander.jpg',
    },
    {
      id: 2,
      link: 'https://www42.bb.com.br/portalbb/imobiliario/creditoimobiliario/simular,802,2250,2250.bbx',
      image: 'https://cdn1.valuegaia.com.br/gaiasite/templates/banks/banco-brasil.jpg',
    },
    {
      id: 3,
      link: 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/encontre-seu-credito/simuladores-imoveis.shtm#box1-comprar',
      image: 'https://cdn1.valuegaia.com.br/gaiasite/templates/banks/bradesco.jpg',
    },
    {
      id: 4,
      link: 'http://www8.caixa.gov.br/siopiinternet/simulaOperacaoInternet.do?method=inicializarCasoUso',
      image: 'https://cdn1.valuegaia.com.br/gaiasite/templates/banks/caixa.jpg',
    },
  ]

  return (
    <>
      <Head>
        <title>
          Financiamento | Vitrine de Imóveis MS
        </title>
        <meta name="description" content="Financiamento | Vitrine de Imóveis MS - A forma mais simples de ser visto na internet." />
      </Head>
      <Dashboard title="Simule seu financiamento" breadcrumb={breadcrumb}>
        <Container>
          <Box fontSize="18px" fontWeight="500" mb="10px">
            Simule seu financiamento de forma simples!
          </Box>

          <Box fontSize="14px" mb="30px">
            Escolha um banco e faça a sua simulação:
          </Box>

          <Flex>
            {
            items.map((item) => (
              <Link href={item.link} target="_blank">
                <Box
                  p="2px"
                  bg="gray.100"
                  mr="30px"
                  borderRadius="5px"
                  _hover={{
                    bg: 'gray.500',
                    shadow: 'lg',
                  }}
                >
                  <Box key={item.id} backgroundImage={`url(${item.image})`} backgroundSize="cover" width="109px" height="109px" borderRadius="5px" />
                </Box>
              </Link>
            ))
          }
          </Flex>

          <Box fontSize="18px" fontWeight="500" mt="60px" mb="10px">
            Precisa de uma consultoria?
          </Box>

          <Box fontSize="14px" mb="30px">
            Preencha o formulário a seguir, dentro de 12h estaremos
            entrando em contato para poder te ajudar!
          </Box>
        </Container>
      </Dashboard>
    </>
  )
}
