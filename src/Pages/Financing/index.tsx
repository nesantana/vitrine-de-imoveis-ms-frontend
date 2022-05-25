import {
  Box, Button, Flex, FormLabel, Grid, GridItem, Input, Link, Radio, RadioGroup, Select, Stack,
} from '@chakra-ui/react'
import { Container } from '@src/Components/Container'
import { Dashboard } from '@src/Components/Dashboard'
import { useAlertContext } from '@src/Contexts/Alert.context'
import { useMobileContext } from '@src/Contexts/Mobile.context'
import { api, urls } from '@src/Services/Api'
import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

import NumberFormatInput from 'react-number-format'

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

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [document, setDocument] = useState<string>('')
  const [salary, setSalary] = useState<string>('')
  const [priceHouse, setPriceHouse] = useState<string>('')
  const [typeHouse, setTypeHouse] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [installmentMin, setInstallmentMin] = useState<string>('')
  const [installmentMax, setInstallmentMax] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)

  const { setAlert } = useAlertContext()
  const [allStates, setAllStates] = useState<any>([])
  const [allCities, setAllCities] = useState<any>([])

  const searchCity = async (uf: string) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: urls.findCities.replace('#uf', uf),
      })

      setAllCities(data)
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Não conseguímos buscar as cidades para este Estado',
      })
    }
  }

  const handleSend = async () => {
    setLoading(true)
    try {
      const params = {
        name,
        email,
        phone,
        document,
        salary,
        price_house: priceHouse,
        type_house: typeHouse,
        state,
        city,
        installment_min: installmentMin,
        installment_max: installmentMax,
      }

      await api.post(urls.financing.create, { ...params })

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

  const searchStates = async () => {
    try {
      const { data } = await api.get(urls.utils.states)

      setAllStates(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    searchStates()
  }, [])

  const { isMobile } = useMobileContext()

  return (
    <>
      <Head>
        <title>
          Financiamento | Vitrine de Imóveis MS
        </title>
        <meta name="description" content="Financiamento | Vitrine de Imóveis MS - A forma mais simples de ser visto na internet." />
      </Head>
      <Dashboard title="Simule seu financiamento" breadcrumb={breadcrumb} breadcrumbCerter>
        <Container textAlign="center">
          <Box fontSize="18px" fontWeight="500" mb="10px">
            Simule seu financiamento de forma simples!
          </Box>

          <Box fontSize="14px" mb="30px">
            Escolha um banco e faça a sua simulação:
          </Box>

          <Flex justifyContent="center" flexWrap="wrap">
            {
            items.map((item) => (
              <Link href={item.link} key={item.link} target="_blank" mb="30px">
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

          <Box fontSize="18px" fontWeight="500" mt="60px" mb="10px" textAlign="center">
            Precisa de uma consultoria?
          </Box>

          <Box fontSize="14px" mb="30px" textAlign="center">
            Preencha o formulário a seguir, dentro de 12h estaremos
            entrando em contato para poder te ajudar!
          </Box>

          <Flex justifyContent="center">
            <Box
              width="700px"
              bg="gray.100"
              p="20px"
              borderRadius="5px"
              shadow="md"
            >
              <Grid
                templateColumns={`repeat(${isMobile ? '1' : '2'}, 1fr)`}
                gap={isMobile ? '30px' : '20px 30px'}
                width="100%"
              >
                <GridItem
                  colSpan={isMobile ? 1 : 2}
                >
                  <Box fontSize="18px" fontWeight="500">
                    Solicitar consultoria
                  </Box>
                </GridItem>
                <GridItem
                  colSpan={1}
                >
                  <FormLabel htmlFor="name">
                    Nome Completo
                  </FormLabel>
                  <Input
                    variant="outline"
                    placeholder="Nome Completo"
                    border="1px"
                    id="name"
                    bg="white"
                    borderColor="gray.700"
                    borderRadius="5px"
                    onChange={({ target }) => setName(target.value)}
                    value={name}
                    _placeholder={{
                      color: 'gray.700',
                    }}
                  />
                </GridItem>

                <GridItem
                  colSpan={1}
                >
                  <FormLabel htmlFor="email">
                    E-mail
                  </FormLabel>
                  <Input
                    variant="outline"
                    placeholder="E-mail"
                    border="1px"
                    id="email"
                    bg="white"
                    borderColor="gray.700"
                    borderRadius="5px"
                    onChange={({ target }) => setEmail(target.value)}
                    value={email}
                    _placeholder={{
                      color: 'gray.700',
                    }}
                  />
                </GridItem>
                <GridItem
                  colSpan={1}
                >
                  <FormLabel htmlFor="phone">
                    Telefone
                  </FormLabel>
                  <NumberFormatInput
                    customInput={Input}
                    format="(##) #####-####"
                    id="phone"
                    variant="outline"
                    placeholder="Telefone"
                    onValueChange={(target) => setPhone(target.value)}
                    value={phone}
                    border="1px"
                    bg="white"
                    borderColor="gray.700"
                    borderRadius="5px"
                    _placeholder={{
                      color: 'gray.700',
                    }}
                  />
                </GridItem>
                <GridItem
                  colSpan={1}
                >
                  <FormLabel htmlFor="document">
                    Documento (CPF ou CNPJ)
                  </FormLabel>
                  <Input
                    variant="outline"
                    placeholder="Documento (CPF ou CNPJ)"
                    border="1px"
                    id="document"
                    bg="white"
                    borderColor="gray.700"
                    borderRadius="5px"
                    onChange={({ target }) => setDocument(target.value)}
                    value={document}
                    _placeholder={{
                      color: 'gray.700',
                    }}
                  />
                </GridItem>
                <GridItem
                  colSpan={1}
                >
                  <FormLabel htmlFor="salary">
                    Salário
                  </FormLabel>
                  <NumberFormatInput
                    customInput={Input}
                    allowNegative={false}
                    decimalSeparator=","
                    decimalPrecision={2}
                    placeholder="Salário"
                    id="salary"
                    thousandSeparator="."
                    variant="outline"
                    onValueChange={(target) => setSalary(target.value)}
                    value={salary}
                    border="1px"
                    bg="white"
                    borderColor="gray.700"
                    prefix="R$ "
                    borderRadius="5px"
                    _placeholder={{
                      color: 'gray.700',
                    }}
                  />
                </GridItem>
                <GridItem
                  colSpan={1}
                >
                  <FormLabel htmlFor="priceHouse">
                    Preço da Imóvel
                  </FormLabel>
                  <NumberFormatInput
                    customInput={Input}
                    allowNegative={false}
                    decimalSeparator=","
                    decimalPrecision={2}
                    id="priceHouse"
                    placeholder="Preço da Imóvel"
                    thousandSeparator="."
                    prefix="R$ "
                    variant="outline"
                    onValueChange={(target) => setPriceHouse(target.value)}
                    value={priceHouse}
                    border="1px"
                    bg="white"
                    borderColor="gray.700"
                    borderRadius="5px"
                    _placeholder={{
                      color: 'gray.700',
                    }}
                  />
                </GridItem>
                <GridItem
                  colSpan={1}
                >
                  <FormLabel htmlFor="states">
                    Estados
                  </FormLabel>
                  <Select
                    placeholder="Estados"
                    border="1px"
                    id="states"
                    borderColor="gray.700"
                    bg="white"
                    borderRadius="5px"
                    onChange={({ target }) => {
                      setState(target.value)
                      searchCity(target.value)
                    }}
                    value={state}
                  >
                    {allStates.map((st: any) => (
                      <option
                        key={`${st.initials}states`}
                        value={st.initials}
                      >
                        {st.name}
                      </option>
                    ))}
                  </Select>
                </GridItem>
                <GridItem
                  colSpan={1}
                >
                  <FormLabel htmlFor="cities">
                    Cidades
                  </FormLabel>
                  <Select
                    id="cities"
                    placeholder="Cidade"
                    border="1px"
                    borderColor="gray.700"
                    bg="city"
                    borderRadius="5px"
                    onChange={({ target }) => setCity(target.value)}
                    value={city}
                    disabled={!state}
                  >
                    {!!allCities.length && allCities.map((ct: any) => (
                      <option
                        key={`${ct.nome}states`}
                        value={ct.nome}
                      >
                        {ct.nome}
                      </option>
                    ))}
                  </Select>
                </GridItem>
                <GridItem
                  colSpan={1}
                >
                  <FormLabel htmlFor="installmentMin">
                    Parcela Mínima
                  </FormLabel>
                  <Input
                    variant="outline"
                    placeholder="Parcela Mínima"
                    border="1px"
                    id="installmentMin"
                    bg="white"
                    borderColor="gray.700"
                    borderRadius="5px"
                    onChange={({ target }) => setInstallmentMin(target.value)}
                    value={installmentMin}
                    _placeholder={{
                      color: 'gray.700',
                    }}
                  />

                </GridItem>
                <GridItem
                  colSpan={1}
                >
                  <FormLabel htmlFor="installmentMax">
                    Parcela Máxima
                  </FormLabel>
                  <Input
                    variant="outline"
                    placeholder="Parcela Máxima"
                    border="1px"
                    id="installmentMax"
                    bg="white"
                    borderColor="gray.700"
                    borderRadius="5px"
                    onChange={({ target }) => setInstallmentMax(target.value)}
                    value={installmentMax}
                    _placeholder={{
                      color: 'gray.700',
                    }}
                  />
                </GridItem>
                <GridItem
                  colSpan={isMobile ? 1 : 2}
                >
                  <Box>
                    <RadioGroup defaultValue="2" onChange={setTypeHouse} value={typeHouse}>
                      <Stack spacing={5} direction="row">
                        <Radio colorScheme="green" value="Novo">
                          Novo
                        </Radio>
                        <Radio colorScheme="green" value="Usado">
                          Usado
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </Box>
                  <Flex justifyContent="center" mt="30px">
                    <Button colorScheme="green" minWidth="200px" isLoading={loading} onClick={handleSend}>
                      Solicitar
                    </Button>
                  </Flex>
                </GridItem>
              </Grid>
            </Box>
          </Flex>
        </Container>
      </Dashboard>
    </>
  )
}
