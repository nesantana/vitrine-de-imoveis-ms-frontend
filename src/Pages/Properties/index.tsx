import {
  Badge,
  Box, Button, Flex, Grid, GridItem, Icon, Input, Link, RangeSlider,
  RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Select, Tooltip, useProps,
} from '@chakra-ui/react'
import { Container } from '@src/Components/Container'
import { Dashboard } from '@src/Components/Dashboard'
import { Loader } from '@src/Components/Loader'
import { Property } from '@src/Components/Property'
import { useLoadingContext } from '@src/Contexts/Loading.context'
import { useUtilsContext } from '@src/Contexts/Utils.context'
import { iProperty } from '@src/Interfaces'
import { api, urls } from '@src/Services/Api'
import { isEmpty } from 'lodash'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import Masonry from 'react-masonry-css'

export const Properties: React.FC<any> = () => {
  const { loading, setLoading } = useLoadingContext()
  const [loadingSend, setLoadingSend] = useState<boolean>(false)

  const [term, setTerm] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [purpose, setPurpose] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [area, setArea] = useState<number[]>([10, 300])
  const [areaBuild, setAreaBuild] = useState<number[]>([10, 90])
  const [bedrooms, setBedrooms] = useState<number[]>([2, 8])
  const [bathrooms, setBathrooms] = useState<number[]>([2, 8])
  const [selectedChars, setSelectedChars] = useState<any[]>([])
  const [characteristics, setCharacteristics] = useState<any[]>([])

  const [properties, setProperties] = useState<iProperty[]>([] as iProperty[])
  const [professional, setProfessional] = useState<any>({})

  const { searchUtils, purposes, types } = useUtilsContext()

  const { query, push: routerPush } = useRouter()
  const [page, setPage] = useState<number>(0)

  const searchCharacteristics = async () => {
    setLoading(true)

    try {
      const { data }: any = await api.get(urls.characteristcs.findAll)

      setCharacteristics(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const searchUsername = async () => {
    try {
      const { data } = await api.get(urls.users.findUsername, { username: query.id_professional })

      setProfessional(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!purposes.length || !types.length) {
      searchUtils()
    }

    if (!characteristics.length) {
      searchCharacteristics()
    }

    if (query.address) {
      setAddress(query.address as string)
    }

    if (query.term) {
      setTerm(query.term as string)
    }

    if (query.purpose) {
      setPurpose(query.purpose as string)
    }

    if (query.type) {
      setType(query.type as string)
    }

    if (query.area) {
      const newArea = `${query.area}`.split(',').map((a: string) => Number(a))
      setArea(newArea)
    }

    if (query.areaBuild) {
      setAreaBuild(`${query.areaBuild}`.split(',').map((a: string) => Number(a)))
    }

    if (query.bedrooms) {
      setBedrooms(`${query.bedrooms}`.split(',').map((a: string) => Number(a)))
    }

    if (query.bathrooms) {
      setBathrooms(`${query.bathrooms}`.split(',').map((a: string) => Number(a)))
    }

    if (query.characteristics) {
      setSelectedChars(`${query.characteristics}`.split(',').map((a: string) => Number(a)))
    }

    if (query) {
      searchProperties()

      if (query.id_professional && isEmpty(professional)) {
        searchUsername()
      }
    }
  }, [query, professional])

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

  const toogleChars = (id: number) => {
    if (selectedChars.includes(id)) {
      const newChars = selectedChars.filter((char) => char !== id)

      setSelectedChars(newChars)
      return
    }

    setSelectedChars((lastChars) => [...lastChars, id])
  }

  const searchProperties = async (changePage = false) => {
    setLoading(true)
    const newQuery = { ...query }

    if (professional) {
      newQuery.id_professional = professional.id
    }

    try {
      const { data } : any = await api.get(urls.properties.findAll, {
        ...newQuery,
        page: changePage ? page + 1 : page,
      })

      if (changePage) {
        setProperties([
          ...properties,
          ...data,
        ])
        setPage(page + 1)
      } else {
        setProperties(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const changeFilters = () => {
    const params: any = {}

    if (purpose) {
      params.purpose = purpose
    }

    if (type) {
      params.type = type
    }

    if (address) {
      params.address = address
    }

    if (area) {
      params.area = `${area[0]},${area[1]}`
    }

    if (areaBuild) {
      params.areaBuild = `${areaBuild[0]},${areaBuild[1]}`
    }

    if (bedrooms) {
      params.bedrooms = `${bedrooms[0]},${bedrooms[1]}`
    }

    if (bathrooms) {
      params.bathrooms = `${bathrooms[0]},${bathrooms[1]}`
    }

    if (selectedChars) {
      let newChars = ''

      selectedChars.map((char, index) => {
        if (index === 0) {
          newChars = char

          return char
        }

        newChars = `${newChars},${char}`
        return char
      })

      params.characteristics = newChars
    }

    routerPush({
      pathname: query.id_professional ? '/imoveis/' : professional.username,
      query: params,
    })
  }

  const handleChangePage = async () => {
    searchProperties(true)
  }

  return (
    <>
      <Head>
        <title>
          {query.id_professional ? professional.name ?? 'Imóveis' : 'Imóveis'}
          {' '}
          | Vitrine de Imóveis MS
        </title>
        <meta name="description" content="Veja aqui seus imóveis! - A forma mais simples de ser visto na internet." />
      </Head>
      <Dashboard title={query.id_professional ? professional.name ?? 'Imóveis' : 'Imóveis'} breadcrumb={breadcrumb}>
        <Container>
          <Grid
            templateColumns="repeat(4, 1fr)"
            gap={30}
            width="100%"
            background="#FFFFFF"
          >
            <GridItem
              colSpan={1}
            >
              {!isEmpty(professional) && (
              <Box mb="30px">
                <Box p="10px 10px 0 10px" bg="gray.100" borderRadius="5px" shadow="base">
                  <Box
                    width="100%"
                    height="270px"
                    borderRadius="5px"
                    backgroundImage={`url(${urls.images}${professional.photo})`}
                    backgroundSize="cover"
                    backgroundPosition="center center"
                  />

                  <Box p="20px">
                    <Flex mb="10px">
                      {professional.name}
                    </Flex>
                    <Tooltip label="Clique e fale com o corretor" hasArrow placement="left">
                      <Link href={`https://api.whatsapp.com/send?phone=55${professional.phone}&text=Ol%C3%A1%20${professional.name},%20te%20encontrei%20atrav%C3%A9s%20do%20Vitrine%20de%20Im%C3%B3veis%20MS`} target="_blank">
                        <Flex alignItems="center" mb="10px">
                          <Icon as={FaWhatsapp} mr="5px" fontSize="15px" />
                          {' '}
                          {professional.phone}
                        </Flex>
                      </Link>
                    </Tooltip>
                    <Flex alignItems="center" mb="10px">
                      <Icon as={FiMail} mr="5px" fontSize="15px" />
                      {' '}
                      {professional.email}
                    </Flex>
                    <Flex alignItems="center">
                      <Icon as={FiMapPin} fontSize="15px" mr="5px" />
                      {professional.street}
                      ,
                      {professional.number}
                    </Flex>
                  </Box>
                </Box>
              </Box>
              )}
              <Box bg="gray.100" p="20px" borderRadius="5px" shadow="lg" position="relative" pb="40px">
                <Box>
                  BUSQUE SEU IMÓVEL IDEAL
                </Box>

                <Box mt="30px">
                  <Input
                    variant="outline"
                    placeholder="Pesquise pelo que quiser..."
                    border="1px"
                    bg="white"
                    borderColor="gray.700"
                    borderRadius="5px"
                    onChange={({ target }) => setTerm(target.value)}
                    value={term}
                    _placeholder={{
                      color: 'gray.700',
                    }}
                  />
                </Box>

                <Box mt="30px">
                  <Select
                    placeholder="O que precisa?"
                    border="1px"
                    borderColor="gray.700"
                    borderRadius="5px"
                    bg="white"
                    onChange={({ target }) => setPurpose(target.value)}
                    value={purpose}
                  >
                    {purposes.map((p) => (
                      <option key={`${p.id}purposes`} value={p.id}>{p.label}</option>
                    ))}
                  </Select>
                </Box>

                <Box mt="30px">
                  <Select
                    placeholder="Qual seu tipo de Imóvel?"
                    border="1px"
                    borderColor="gray.700"
                    borderRadius="5px"
                    bg="white"
                    onChange={({ target }) => setType(target.value)}
                    value={type}
                  >
                    {types.map((t) => (
                      <option key={`${t.id}types`} value={t.id}>{t.label}</option>
                    ))}
                  </Select>
                </Box>

                <Box mt="30px">
                  <Input
                    variant="outline"
                    placeholder="Localização (cidade, bairro, logradouro)"
                    border="1px"
                    bg="white"
                    borderColor="gray.700"
                    borderRadius="5px"
                    onChange={({ target }) => setAddress(target.value)}
                    value={address}
                    _placeholder={{
                      color: 'gray.700',
                    }}
                  />
                </Box>

                <Box mt="30px">
                  <Flex justifyContent="space-between">
                    <Box>
                      Área total
                    </Box>
                    <Flex color="gray.500">
                      { area.map((a, index) => (
                        <>
                          <Box key={`${a}area`}>{a}</Box>
                          {index === 0 && (
                          <Box px="5px">
                            até
                          </Box>
                          )}
                        </>
                      )) }
                      <Box ml="3px">
                        m
                        <sup>2</sup>
                      </Box>
                    </Flex>
                  </Flex>
                  <Box mt="10px">
                    <RangeSlider aria-label={['min', 'max']} colorScheme="green" max={999} value={area} onChange={(e) => setArea(e)}>
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                    </RangeSlider>
                  </Box>
                </Box>

                <Box mt="30px">
                  <Flex justifyContent="space-between">
                    <Box>
                      Área Construída
                    </Box>
                    <Flex color="gray.500">
                      { areaBuild.map((a, index) => (
                        <>
                          <Box key={`${a}areaBuild`}>{a}</Box>
                          {index === 0 && (
                          <Box px="5px">
                            até
                          </Box>
                          )}
                        </>
                      )) }
                      <Box ml="3px">
                        m
                        <sup>2</sup>
                      </Box>
                    </Flex>
                  </Flex>
                  <Box mt="10px">
                    <RangeSlider aria-label={['min', 'max']} colorScheme="green" max={500} value={areaBuild} onChange={(e) => setAreaBuild(e)}>
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                    </RangeSlider>
                  </Box>
                </Box>

                <Box mt="30px">
                  <Flex justifyContent="space-between">
                    <Box>
                      Banheiros
                    </Box>
                    <Flex color="gray.500">
                      { bathrooms.map((a, index) => (
                        <>
                          <Box key={`${a}bathrooms`}>{a}</Box>
                          {index === 0 && (
                          <Box px="5px">
                            até
                          </Box>
                          )}
                        </>
                      )) }
                    </Flex>
                  </Flex>
                  <Box mt="10px">
                    <RangeSlider aria-label={['min', 'max']} colorScheme="green" max={9} value={bathrooms} onChange={(e) => setBathrooms(e)}>
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                    </RangeSlider>
                  </Box>
                </Box>

                <Box mt="30px">
                  <Flex justifyContent="space-between">
                    <Box>
                      Quartos
                    </Box>
                    <Flex color="gray.500">
                      { bedrooms.map((a, index) => (
                        <>
                          <Box key={`${a}bedrooms`}>{a}</Box>
                          {index === 0 && (
                          <Box px="5px">
                            até
                          </Box>
                          )}
                        </>
                      )) }
                    </Flex>
                  </Flex>
                  <Box mt="10px">
                    <RangeSlider aria-label={['min', 'max']} colorScheme="green" max={9} value={bedrooms} onChange={(e) => setBedrooms(e)}>
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                    </RangeSlider>
                  </Box>
                </Box>

                <Box mt="30px">
                  <Box>
                    Carácteristicas
                  </Box>
                  <Box bg="white" p="5px 15px 15px" borderRadius="5px" mt="10px">
                    {
                    !loading && characteristics.map((char: any) => (
                      <Badge
                        key={char.id + char.value}
                        mr="10px"
                        mt="10px"
                        p="3px 8px"
                        bg={selectedChars.includes(char.id) ? 'green.500' : 'gray.500'}
                        color="white"
                        fontSize="14px"
                        borderRadius="5px"
                        cursor="pointer"
                        onClick={() => toogleChars(char.id)}
                      >
                        { char.value }
                      </Badge>
                    ))
                  }
                  </Box>
                </Box>

                <Box mt="30px" width="100%">
                  <Button colorScheme="green" isFullWidth shadow="lg" height="40px" onClick={changeFilters} isLoading={loadingSend}>
                    Buscar imóveis
                  </Button>
                </Box>
              </Box>
            </GridItem>
            <GridItem
              colSpan={3}
            >
              {
              loading ? (
                <Loader />
              ) : (
                properties.length ? (
                  <Masonry
                    breakpointCols={3}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {
                    properties?.map((property: any) => (
                      <Box key={property.id} mb="15px">
                        <Property property={property} small />
                      </Box>
                    ))
                  }
                  </Masonry>
                ) : (
                  <Box>
                    Não encontramos imóveis com o filtro selecionado.
                  </Box>
                )
              )
            }
            </GridItem>
          </Grid>

          <Box mt="30px" textAlign="center">
            <Button onClick={handleChangePage} colorScheme="green">Carregar mais</Button>
          </Box>
        </Container>
      </Dashboard>
    </>
  )
}
