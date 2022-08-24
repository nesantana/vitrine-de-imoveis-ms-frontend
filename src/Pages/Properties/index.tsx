import {
  Box, Button, Flex, Grid,
  GridItem, Icon, Image, Link,
} from '@chakra-ui/react'
import { Container } from '@src/Components/Container'
import { Dashboard } from '@src/Components/Dashboard'
import { Filter } from '@src/Components/Filter'
import { Loader } from '@src/Components/Loader'
import { Professional } from '@src/Components/Professional'
import { Property } from '@src/Components/Property'
import { useLoadingContext } from '@src/Contexts/Loading.context'
import { useMobileContext } from '@src/Contexts/Mobile.context'
import { useUtilsContext } from '@src/Contexts/Utils.context'
import { iProperty } from '@src/Interfaces'
import { api, urls } from '@src/Services/Api'
import { isEmpty } from 'lodash'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { BsFillGrid3X2GapFill } from 'react-icons/bs'
import Masonry from 'react-masonry-css'

export const Properties: React.FC<any> = () => {
  const { loading, setLoading } = useLoadingContext()
  const [loadingSend, setLoadingSend] = useState<boolean>(false)

  const [term, setTerm] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [purpose, setPurpose] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [area, setArea] = useState<any[]>(['', ''])
  const [areaBuild, setAreaBuild] = useState<any[]>(['', ''])
  const [bedrooms, setBedrooms] = useState<any[]>(['', ''])
  const [bathrooms, setBathrooms] = useState<any[]>(['', ''])
  const [selectedChars, setSelectedChars] = useState<any[]>([])
  const [characteristics, setCharacteristics] = useState<any[]>([])

  const [properties, setProperties] = useState<iProperty[]>([] as iProperty[])
  const [professional, setProfessional] = useState<any>({})

  const { searchUtils, purposes, types } = useUtilsContext()

  const { query, push: routerPush } = useRouter()
  const [page, setPage] = useState<number>(0)
  const [openFilter, setOpenFilter] = useState<boolean>(false)

  const [view, setView] = useState<'list' | 'grid'>('list')

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

    if (area.some((item) => item !== 0 && item !== null && item !== '')) {
      params.area = `${area[0]},${area[1]}`
    }

    if (areaBuild.some((item) => item !== 0 && item !== null && item !== '')) {
      params.areaBuild = `${areaBuild[0]},${areaBuild[1]}`
    }

    if (bedrooms.some((item) => item !== 0 && item !== null && item !== '')) {
      params.bedrooms = `${bedrooms[0]},${bedrooms[1]}`
    }

    if (bathrooms.some((item) => item !== 0 && item !== null && item !== '')) {
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
      pathname: query.id_professional ? professional.username : '/imoveis/',
      query: params,
    })
  }

  const handleChangePage = async () => {
    searchProperties(true)
  }

  const { isMobile } = useMobileContext()

  return (
    <>
      <Head>
        <title>
          {query.id_professional ? professional.name ?? 'Imóveis' : 'Imóveis'}
          {' '}
          | Vitrine de Imóveis MS
        </title>
        <meta name="description" content="Veja aqui seus imóveis! - A forma mais simples de ser visto na internet." />
        <meta property="og:title" content={`${query.id_professional ? professional.name ?? 'Imóveis' : 'Imóveis'} | Vitrine de Imóveis MS`} />
        <meta
          property="og:description"
          content="Veja aqui seus imóveis! | Vitrine de Imóveis MS - A forma mais simples de ser visto na internet."
        />
        <meta property="og:url" content="https://vitrinedeimoveisms.com.br/" />
        <meta property="og:type" content="website" />
      </Head>
      <Dashboard title={query.id_professional ? professional.name ?? 'Imóveis' : 'Imóveis'} breadcrumb={breadcrumb}>
        <Container>
          <Grid
            templateColumns={`repeat(${isMobile ? '1' : '4'}, 1fr)`}
            gap={30}
            width="100%"
            background="#FFFFFF"
          >
            <GridItem
              colSpan={isMobile ? 1 : 1}
            >
              {
                !isEmpty(professional) && (
                  <Box mb="30px">
                    <Professional professional={professional} />
                  </Box>
                )
              }
              <Box>
                <Filter
                  isMobile={isMobile}
                  loading={loading}
                  characteristics={characteristics}
                  selectedChars={selectedChars}
                  toogleChars={toogleChars}
                  changeFilters={changeFilters}
                  loadingSend={loadingSend}
                  bedrooms={bedrooms}
                  setBedrooms={setBedrooms}
                  bathrooms={bathrooms}
                  setBathrooms={setBathrooms}
                  areaBuild={areaBuild}
                  setAreaBuild={setAreaBuild}
                  area={area}
                  setArea={setArea}
                  address={address}
                  setAddress={setAddress}
                  types={types}
                  type={type}
                  setType={setType}
                  purposes={purposes}
                  purpose={purpose}
                  setPurpose={setPurpose}
                  term={term}
                  setTerm={setTerm}
                  openFilter={openFilter}
                  setOpenFilter={setOpenFilter}
                />
              </Box>

              {
                !isMobile && (
                  <Box mt="30px">
                    <Flex>
                      <Link href="https://www.instagram.com/power_semijoias/" target="_blank">
                        <Image src="/banners/grande-busca-imoveis.png" />
                      </Link>
                    </Flex>
                  </Box>
                )
              }
            </GridItem>
            <GridItem
              colSpan={isMobile ? 1 : 3}
            >
              {
                isMobile && (
                  <Box bg="gray.100" p="20px" mb="30px" borderRadius="5px">
                    <Flex justifyContent="space-between" alignItems="center" onClick={() => setOpenFilter(true)}>
                      Selecione filtros para encontrar o que precisa

                      <Button colorScheme="orange" size="sm">
                        Abrir filtros
                      </Button>
                    </Flex>
                  </Box>
                )
              }

              <Box mb="30px">
                <Flex>
                  <Flex width="40px" height="30px" justifyContent="center" bg={view === 'list' ? 'gray.500' : 'white'} borderRadius="5px" alignItems="center" cursor="pointer" onClick={() => setView('list')}>
                    <Icon as={AiOutlineUnorderedList} fontSize="25px" color={view === 'list' ? 'white' : 'gray.500'} />
                  </Flex>
                  <Flex width="40px" height="30px" bg={view === 'list' ? 'white' : 'gray.500'} borderRadius="5px" justifyContent="center" alignItems="center" cursor="pointer" onClick={() => setView('grid')}>
                    <Icon as={BsFillGrid3X2GapFill} fontSize="30px" color={view === 'list' ? 'gray.500' : 'white'} />
                  </Flex>
                </Flex>
              </Box>

              {
              loading ? (
                <Loader />
              ) : (
                properties.length ? (
                  <Masonry
                    breakpointCols={isMobile ? 1 : (view === 'list' ? 1 : 3)}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {
                    properties?.map((property: any) => (
                      <Box key={`${property.id}property`} mb={isMobile ? '30px' : '15px'}>
                        <Property property={property} small view={view} />
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
