/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dashboard } from '@src/Components/Dashboard'
import { useLoadingContext } from '@src/Contexts/Loading.context'
import { useUtilsContext } from '@src/Contexts/Utils.context'
import { api, urls } from '@src/Services/Api'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Loader } from '@src/Components/Loader'
import {
  Badge,
  Box, Button, Flex, Grid, GridItem, Icon, Image, Input, Link, Textarea,
} from '@chakra-ui/react'
import { Container } from '@src/Components/Container'
import ScrollContainer from 'react-indiana-drag-scroll'
import FsLightbox from 'fslightbox-react'
import {
  FaArrowsAlt, FaBath, FaBed, FaDoorOpen,
} from 'react-icons/fa'
import { iProperty } from '@src/Interfaces'
import { NumberFormat } from '@src/Utils/NumberFormat'
import { FiMapPin } from 'react-icons/fi'
import NumberFormatInput from 'react-number-format'
import { useAlertContext } from '@src/Contexts/Alert.context'
import Head from 'next/head'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { useMobileContext } from '@src/Contexts/Mobile.context'
import { HiOutlineReceiptTax } from 'react-icons/hi'
import { isEmpty } from 'lodash'
import { Professional } from '@src/Components/Professional'

const libraries: any = ['places']

export const Property: React.FC<any> = () => {
  const [property, setProperty] = useState<iProperty>()
  const { purposes, types, searchUtils } = useUtilsContext()
  const { setLoading, loading } = useLoadingContext()
  const [breadcrumb, setBreadcrumb] = useState<any[]>([])
  const { query } = useRouter()
  const [toggler, setToggler] = useState(false)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [coordinates, setCoordinates] = useState<any>({ lat: null, lng: null })
  const [loadingSend, setLoadingSend] = useState<boolean>(false)
  const [professional, setProfessional] = useState<any>({})

  const searchProfessional = async (id: number) => {
    try {
      const { data } = await api.get(urls.users.findId, { id })

      setProfessional(data)
    } catch (error) {
      console.error(error)
    }
  }

  const { setAlert } = useAlertContext()

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY_GOOGLE as string,
    libraries,
  })

  const searchProperty = async () => {
    setLoading(true)
    try {
      const { data } : { data: iProperty } = await api.get(`${urls.properties.findOne}${query.id}`)

      setProperty(data)

      setBreadcrumb([
        {
          label: 'HOME',
          href: '/',
          active: false,
        },
        {
          label: 'IMÓVEIS',
          href: '/imoveis',
          active: false,
        },
        {
          label: data.title,
          href: '#',
          active: true,
        },
      ])

      searchProfessional(Number(data.id_professional))

      setTimeout(() => {
        setCoordinates(JSON.parse(data.coordinates))
      }, 100)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (query.id) {
      searchProperty()
    }

    if (!purposes || !types) {
      searchUtils()
    }
  }, [query])

  const handleSendContact = async () => {
    setLoadingSend(true)
    const params = {
      title_propertie: property?.title,
      id_properties: property?.id,
      id_professional: property?.id_professional,
      name,
      email,
      phone,
      preference: '0',
      message,
    }

    try {
      await api.post(urls.contacts.create, params)

      setAlert({
        type: 'success',
        message: 'Contato enviado com sucesso.',
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingSend(false)
    }
  }

  const { isMobile } = useMobileContext()

  if (loading || !property) {
    return <Loader />
  }

  if (!isLoaded) {
    return (<Loader />)
  }

  return (
    <>
      <Head>
        <title>
          {property.title}
          {' '}
          | Vitrine de Imóveis MS
        </title>
        <meta name="description" content={`${property.title} - A forma mais simples de ser visto na internet.`} />
      </Head>
      <Dashboard bannerHeader={false} title={property.title} breadcrumb={breadcrumb}>
        <Container>
          {property.photos && (
            <>
              <Box position="relative">
                <ScrollContainer horizontal vertical={false}>
                  <Flex wrap="nowrap">
                    {
                  property.photos && property.photos.split(',').map(((img: string) => (
                    <Image key={img} src={urls.images + img} height="270px" width="100%" />
                  )))
                }
                  </Flex>
                </ScrollContainer>
                <Button onClick={() => setToggler(!toggler)} position="absolute" bottom="40px" left="20px" fontSize="14px">
                  Ampliar Fotos
                </Button>

                <Flex justifyContent="flex-end" fontSize="14px" mt="5px" alignItems="center">
                  <Icon as={FaArrowsAlt} mr="10px" />
                  Clique nas imagens e arraste para ver mais fotos ou clique em ampliar
                </Flex>
              </Box>

              <FsLightbox
                toggler={toggler}
                sources={property.photos ? property.photos.split(',').map((img:string) => urls.images + img) : []}
              />
            </>
          )}

          <Grid
            templateColumns={`repeat(${isMobile ? '1' : '3'}, 1fr)`}
            gap={30}
            mt={property.photos ? '30px' : '0'}
            width="100%"
            background="#FFFFFF"
          >
            <GridItem
              colSpan={2}
            >
              <Flex color="green.500" alignItems="flex-end" mb="20px">
                <Box position="relative" top="-15px">R$</Box>
                <Box fontSize="45px">{property.value ? NumberFormat(property.value) : 'A combinar'}</Box>
              </Flex>

              <Flex flexDirection="column" p="20px" bg="gray.100" borderRadius="5px">
                <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
                  <Flex alignItems="center" pr="30px" minWidth={isMobile ? '50%' : 'auto'}>
                    <Icon as={FaArrowsAlt} color="gray.500" width="20px" mr="5px" />
                    <Box color="gray.500" fontSize="14px">
                      { property.area ? `${property.area} m` : 'N/I' }
                      <sup>2</sup>
                    </Box>
                  </Flex>
                  <Flex alignItems="center" fontSize="14px" pr="30px" minWidth={isMobile ? '50%' : 'auto'}>
                    <Icon as={FaDoorOpen} color="gray.500" width="20px" mr="5px" />
                    <Box color="gray.500">
                      { property.area_build ? `${property.area_build} m` : 'N/I' }
                      <sup>2</sup>
                    </Box>
                  </Flex>
                  <Flex alignItems="center" fontSize="14px" pr="30px" minWidth={isMobile ? '50%' : 'auto'}>
                    <Icon as={FaBed} color="gray.500" width="20px" mr="5px" />
                    <Box color="gray.500">
                      { property.bedrooms ? `${property.bedrooms} quartos` : 'N/I' }
                    </Box>
                  </Flex>
                  <Flex alignItems="center" fontSize="14px" pr="30px" minWidth={isMobile ? '50%' : 'auto'}>
                    <Icon as={FaBed} color="gray.500" width="20px" mr="5px" />
                    {' '}
                    +
                    {' '}
                    <Icon as={FaBath} color="gray.500" width="20px" mr="5px" />
                    <Box color="gray.500">
                      { property.suite ? `${property.suite} suítes` : 'N/I' }
                    </Box>
                  </Flex>
                  <Flex alignItems="center" fontSize="14px" pr="30px" minWidth={isMobile ? '50%' : 'auto'}>
                    <Icon as={FaBath} color="gray.500" width="20px" mr="5px" />
                    <Box color="gray.500">
                      { property.bathrooms ? `${property.bathrooms} banheiros` : 'N/I' }
                    </Box>
                  </Flex>
                  <Flex alignItems="center" fontSize="14px" pr="30px" minWidth={isMobile ? '50%' : 'auto'}>
                    <Icon as={HiOutlineReceiptTax} color="gray.500" width="20px" mr="5px" />
                    <Box color="gray.500">
                      { property.iptu ? `IPTU: ${property.iptu}` : 'IPTU: N/I' }
                    </Box>
                  </Flex>
                </Flex>
                <Flex alignItems="center" color="gray.500" mt="15px" pt="15px" borderTop="1px" borderTopColor="gray.400">
                  <Icon as={FiMapPin} fontSize="20px" strokeWidth="1px" mr="10px" />
                  {property.address}
                </Flex>
              </Flex>

              <Box mt="20px">Características:</Box>
              <Flex flexWrap="wrap">
                {
                property?.characteristics.map((char: string) => (
                  <Badge key={char} mr="10px" mt="10px" p="3px 10px" colorScheme="green" color="white" fontSize="14px" borderRadius="5px">
                    { char }
                  </Badge>
                ))
              }
              </Flex>
              {
                !!property.youtube && (
                  <Flex mt="20px" flexDirection="column" className="informations">
                    <Box mb="10px">Vídeo:</Box>
                    <iframe width="100%" height="450" src={`https://www.youtube.com/embed/${property.youtube.split('https://www.youtube.com/watch?v=')[1]}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </Flex>
                )
              }
              {
                !!property.informations && (
                  <Flex mt="20px" flexDirection="column" className="informations">
                    <Box mb="10px">Informações:</Box>
                    <Box padding="20px" bg="gray.100" borderRadius="5px" dangerouslySetInnerHTML={{ __html: JSON.parse(property.informations) }} />
                  </Flex>
                )
              }
              {
                isLoaded ? (
                  <Box mt="30px">
                    <Box mb="10px">
                      Localização Aproximada:
                    </Box>
                    <GoogleMap
                      zoom={15}
                      center={coordinates}
                      mapContainerClassName="map-container"
                    />
                  </Box>
                ) : <Loader />
              }
            </GridItem>
            <GridItem
              colSpan={isMobile ? 2 : 1}
            >
              {
                !isEmpty(professional) ? (
                  <Box mb="30px">
                    <Professional professional={professional} property={property} inProperty />
                  </Box>
                ) : <Loader />
              }

              <Box bg="gray.100" p="20px" borderRadius="5px" shadow="lg" position="relative" pb="40px" width="100%">
                <Box>
                  FALAR COM CORRETOR
                </Box>

                <Box mt="30px">
                  <Input
                    variant="outline"
                    placeholder="Nome"
                    border="1px"
                    bg="white"
                    borderColor="gray.700"
                    borderRadius="5px"
                    onChange={({ target }) => setName(target.value)}
                    value={name}
                    _placeholder={{
                      color: 'gray.700',
                    }}
                  />
                </Box>

                <Box mt="30px">

                  <NumberFormatInput
                    customInput={Input}
                    format="(##) #####-####"
                    variant="outline"
                    placeholder="Telefone"
                    onValueChange={({ value }) => setPhone(value)}
                    value={phone}
                    border="1px"
                    bg="white"
                    borderColor="gray.700"
                    borderRadius="5px"
                    _placeholder={{
                      color: 'gray.700',
                    }}
                  />

                </Box>

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

                <Box mt="30px">
                  <Textarea
                    variant="outline"
                    placeholder="Mensagem"
                    border="1px"
                    bg="white"
                    borderColor="gray.700"
                    borderRadius="5px"
                    height="140px"
                    onChange={({ target }) => setMessage(target.value)}
                    value={message}
                    _placeholder={{
                      color: 'gray.700',
                    }}
                  />
                </Box>

                <Box px="40px" position="absolute" bottom="-20px" width="100%" left="0">
                  <Button colorScheme="green" isFullWidth shadow="lg" height="40px" onClick={handleSendContact} isLoading={loadingSend} disabled={!name || !email || !phone || !message}>
                    Solicitar contato
                  </Button>
                </Box>
              </Box>

              {
                !isMobile && (
                <Box mt="50px">
                  <Flex>
                    <Link href="https://www.instagram.com/power_semijoias/" target="_blank">
                      <Image src="/banners/medio-interno-imoveis.png" />
                    </Link>
                  </Flex>
                </Box>
                )
            }
            </GridItem>
          </Grid>
        </Container>
      </Dashboard>
    </>
  )
}
