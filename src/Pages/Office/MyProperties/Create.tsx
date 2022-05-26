import {
  Badge,
  Box,
  Button,
  Flex,
  FormLabel,
  Grid, GridItem, Icon, Image, Input, InputGroup, InputLeftElement, Select,
} from '@chakra-ui/react'
import { DashboardOffice } from '@src/Components/DashboardOffice'
import { useAlertContext } from '@src/Contexts/Alert.context'
import React, { useEffect, useMemo, useState } from 'react'
import {
  FaArrowsAlt, FaBath, FaBed, FaDoorOpen, FaYoutube,
} from 'react-icons/fa'
import { FiDollarSign, FiPlusSquare } from 'react-icons/fi'
import NumberFormatInput from 'react-number-format'

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { Loader } from '@src/Components/Loader'
import { GoogleAutoComplete } from '@src/Components/GoogleAutoComplete'
import 'react-quill/dist/quill.snow.css'

import dynamic from 'next/dynamic'
import { useUtilsContext } from '@src/Contexts/Utils.context'
import { useLoadingContext } from '@src/Contexts/Loading.context'
import { api, urls } from '@src/Services/Api'
import { useRouter } from 'next/router'
import ScrollContainer from 'react-indiana-drag-scroll'
import { apiFormData } from '@src/Services/ApiFormData'
import Head from 'next/head'
import { useMobileContext } from '@src/Contexts/Mobile.context'
import { TextEditor } from '@src/Components/TextEditor'
import { HiOutlineReceiptTax } from 'react-icons/hi'

const libraries: any = ['places']

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <Loader />,
})

export const Create: React.FC<any> = () => {
  const [value, setValue] = useState<string>('')
  const [purpose, setPurpose] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [area, setArea] = useState<string>('')
  const [areaBuild, setAreaBuild] = useState<string>('')
  const [bedrooms, setBedrooms] = useState<string>('')
  const [suite, setSuite] = useState<string>('')
  const [youtube, setYoutube] = useState<string>('')
  const [iptu, setIptu] = useState<string>('')
  const [bathrooms, setBathrooms] = useState<string>('')

  const { setAlert } = useAlertContext()

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY_GOOGLE as string,
    libraries,
  })

  const center = { lat: -20.4810998, lng: -54.635534 }
  const [address, setAddress] = useState<any>('')
  const [coordinates, setCoordinates] = useState<any>({ lat: null, lng: null })

  const [informations, setInformations] = useState<any>('')
  const [selectedChars, setSelectedChars] = useState<any[]>([])
  const [characteristics, setCharacteristics] = useState<any[]>([])
  const [searchChar, setSearchChar] = useState<string>('')
  const { loading, setLoading } = useLoadingContext()

  const selectedCharsFilter = useMemo(
    () => characteristics.filter((item) => `${item.value.toLowerCase()}`.includes(searchChar.toLowerCase())),
    [characteristics, searchChar],
  )

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

  const { searchUtils, purposes, types } = useUtilsContext()

  useEffect(() => {
    if (!purposes.length || !types.length) {
      searchUtils()
    }

    if (!characteristics.length) {
      searchCharacteristics()
    }
  }, [])

  const toogleChars = (id: number) => {
    if (selectedChars.includes(id)) {
      const newChars = selectedChars.filter((char) => char !== id)

      setSelectedChars(newChars)
      return
    }

    setSelectedChars((lastChars) => [...lastChars, id])
  }

  const router = useRouter()

  const searchPropertyById = async () => {
    setLoading(true)
    try {
      const { data } : any = await api.get(urls.properties.findOne + id)

      setTimeout(() => {
        setAddress(data.address)
      }, 0)

      if (data.coordinates) {
        setCoordinates(JSON.parse(data.coordinates))
      }

      if (data.informations) {
        setInformations(JSON.parse(data.informations))
      }

      if (data.bathrooms) {
        setBathrooms(data.bathrooms)
      }

      if (data.bedrooms) {
        setBedrooms(data.bedrooms)
      }

      if (data.value) {
        setValue(data.value)
      }

      if (data.iptu) {
        setIptu(data.iptu)
      }

      if (data.youtube) {
        setYoutube(data.youtube)
      }

      if (data.suite) {
        setSuite(data.suite)
      }

      if (data.purpose) {
        setPurpose(data.purpose)
      }

      if (data.title) {
        setTitle(data.title)
      }

      if (data.type) {
        setType(data.type)
      }

      if (data.area) {
        setArea(data.area)
      }

      if (data.area_build) {
        setAreaBuild(data.area_build)
      }

      if (data.photos) {
        setPhotos(data.photos ? data.photos.split(',') : [])
      }

      if (data.characteristics.length) {
        const chars: string[] = []

        data.characteristics.forEach((char: any, index: number) => {
          const findChar = characteristics.find(({ value: valueChar }) => valueChar === char)

          chars.push(findChar?.id)
        })

        setSelectedChars(chars)
      }
    } catch (error: any) {
      console.error(error)
      setAlert({
        type: 'error',
        message: error?.response?.data?.error,
      })
    } finally {
      setLoading(false)
    }
  }

  const { id } = router.query

  useEffect(() => {
    if (id) {
      searchPropertyById()
    }
  }, [router.query, characteristics, types, purposes])

  const handleCreate = async () => {
    const params = {
      informations: JSON.stringify(informations),
      value,
      purpose,
      title,
      area,
      type,
      area_build: areaBuild,
      bedrooms,
      youtube,
      iptu,
      suite,
      bathrooms,
      address,
      coordinates: JSON.stringify(coordinates),
      characteristics: selectedChars.join(','),
    }

    setLoading(true)

    let url = urls.properties.create

    if (id) {
      url = urls.properties.update + id
    }

    try {
      const { data } : any = await api.post(url, params)

      setAlert({
        type: 'success',
        message: `Imóvel ${id ? 'Editado' : 'Cadastrado'} com Sucesso!`,
      })

      router.push(`/escritorio/imoveis/${id}`)
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: error.response.data.error,
      })
    } finally {
      setLoading(false)
    }
  }

  const [photos, setPhotos] = useState<string[]>([])
  const [loaderImage, setLoaderImage] = useState<boolean>(false)

  const uploadImage = async (files: FileList) => {
    setLoaderImage(true)
    const formData = new FormData()

    const newFiles = Array.from(files)

    newFiles.forEach((file) => {
      formData.append('photos', file)
    })
    formData.append('id', `${id}`)

    try {
      await apiFormData.post(urls.properties.uploadPhotos, formData)

      searchPropertyById()
      setAlert({
        type: 'success',
        message: 'Fotos atualizadas com sucesso.',
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoaderImage(false)
    }
  }

  const { isMobile } = useMobileContext()

  if (!isLoaded) {
    return (<Loader />)
  }

  return (
    <>
      <Head>
        <title>
          {id ? 'Editar' : 'Criar'}
          {' '}
          Imóvel | Escritório | Vitrine de Imóveis MS
        </title>
        <meta name="description" content={`${id ? 'Editar' : 'Criar'} Imóveis | Escritório | Vitrine de Imóveis MS - A forma mais simples de ser visto na internet.`} />
      </Head>
      <DashboardOffice>
        <Box mb="30px">
          {id ? 'Editar' : 'Criar'}
          {' '}
          imóvel
        </Box>

        {id && (
        <Box position="relative" mb="30px">
          <ScrollContainer horizontal vertical={false}>
            <Flex flexWrap="nowrap" whiteSpace="nowrap">
              <Flex flexDirection="column" flex="1" position="relative" height="270px" minWidth={isMobile ? '100%' : '300px'} width="300px" bg="gray.300" justifyContent="center" alignItems="center" cursor="pointer">
                {
                  loaderImage ? (
                    <Loader />) : (
                      <>
                        <Icon as={FiPlusSquare} strokeWidth="1px" fontSize={60} color="gray.500" />
                        <Box color="gray.500">
                          Adicionar Imagens
                        </Box>

                        <Input
                          cursor="pointer"
                          height="100%"
                          multiple
                          type="file"
                          onChange={({ target }) => uploadImage(target.files as FileList)}
                          position="absolute"
                          top="0"
                          bottom="0"
                          left="0"
                          right="0"
                          opacity="0"
                        />
                      </>
                  )
                }
              </Flex>
              <Flex whiteSpace="nowrap">
                {
                  !!photos.length && photos.map(((img: string) => (
                    <Box key={img} backgroundImage={`url(${urls.images + img})`} height="270px" width="270px" backgroundSize="cover" backgroundPosition="center center" />
                  )))
                }
              </Flex>
            </Flex>
          </ScrollContainer>

          <Flex justifyContent="flex-end" fontSize="14px" mt="5px" alignItems="center">
            <Icon as={FaArrowsAlt} mr="10px" />
            Clique nas imagens e arraste para ver mais fotos ou clique em ampliar
          </Flex>
        </Box>
        )}

        <Grid
          templateColumns={`repeat(${isMobile ? '1' : '12'}, 1fr)`}
          gap={30}
          width="100%"
          background="#FFFFFF"
        >
          <GridItem
            colSpan={isMobile ? 1 : 3}
          >
            <FormLabel htmlFor="value">
              Valor (R$)
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={(
                  <Icon
                    as={FiDollarSign}
                    color="gray.700"
                  />
              )}
              />

              <NumberFormatInput
                customInput={Input}
                allowNegative={false}
                decimalSeparator=","
                decimalPrecision={2}
                thousandSeparator="."
                variant="outline"
                onValueChange={(target) => setValue(target.value)}
                value={value}
                border="1px"
                bg="white"
                paddingLeft="40px"
                borderColor="gray.700"
                borderRadius="5px"
                _placeholder={{
                  color: 'gray.700',
                }}
              />
            </InputGroup>
          </GridItem>
          <GridItem
            colSpan={isMobile ? 1 : 3}
          >
            <FormLabel htmlFor="purpose">
              Finalidade
            </FormLabel>

            <Select
              border="1px"
              borderColor="gray.700"
              borderRadius="5px"
              id="purpose"
              bg="white"
              onChange={({ target }) => setPurpose(target.value)}
              value={purpose}
            >
              <option value="">Selecione...</option>
              {purposes.map((p) => (
                <option key={`${p.id}purposes`} value={p.id}>{p.label}</option>
              ))}
            </Select>
          </GridItem>
          <GridItem
            colSpan={isMobile ? 1 : 3}
          >
            <FormLabel htmlFor="type">
              Tipo de Imóvel
            </FormLabel>

            <Select
              border="1px"
              borderColor="gray.700"
              borderRadius="5px"
              id="type"
              bg="white"
              onChange={({ target }) => setType(target.value)}
              value={type}
            >
              <option value="">Selecione...</option>
              {types.map((t) => (
                <option key={`${t.id}types`} value={t.id}>{t.label}</option>
              ))}
            </Select>
          </GridItem>
          <GridItem
            colSpan={isMobile ? 1 : 12}
          >
            <FormLabel htmlFor="title">
              Título
            </FormLabel>
            <Input
              variant="outline"
              placeholder="Título"
              border="1px"
              id="title"
              bg="white"
              borderColor="gray.700"
              borderRadius="5px"
              onChange={({ target }) => setTitle(target.value)}
              value={title}
              _placeholder={{
                color: 'gray.700',
              }}
            />
          </GridItem>
          <GridItem
            colSpan={isMobile ? 1 : 3}
          >
            <FormLabel htmlFor="area">
              Área
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={(
                  <Icon
                    as={FaArrowsAlt}
                    color="gray.700"
                  />
              )}
              />
              <Input
                variant="outline"
                id="area"
                placeholder="Área total"
                border="1px"
                bg="white"
                borderColor="gray.700"
                borderRadius="5px"
                onChange={({ target }) => setArea(target.value)}
                value={area}
                _placeholder={{
                  color: 'gray.700',
                }}
              />
            </InputGroup>
          </GridItem>
          <GridItem
            colSpan={isMobile ? 1 : 3}
          >
            <FormLabel htmlFor="areaBuild">
              Área total Construída
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={(
                  <Icon
                    as={FaDoorOpen}
                    color="gray.700"
                  />
              )}
              />
              <Input
                variant="outline"
                placeholder="Área total Construída"
                border="1px"
                bg="white"
                id="areaBuild"
                borderColor="gray.700"
                borderRadius="5px"
                onChange={({ target }) => setAreaBuild(target.value)}
                value={areaBuild}
                _placeholder={{
                  color: 'gray.700',
                }}
              />
            </InputGroup>
          </GridItem>
          <GridItem
            colSpan={isMobile ? 1 : 3}
          >
            <FormLabel htmlFor="bedrooms">
              Quartos
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={(
                  <Icon
                    as={FaBed}
                    color="gray.700"
                  />
              )}
              />
              <Input
                variant="outline"
                placeholder="Quartos"
                border="1px"
                id="bedrooms"
                bg="white"
                borderColor="gray.700"
                borderRadius="5px"
                onChange={({ target }) => setBedrooms(target.value)}
                value={bedrooms}
                _placeholder={{
                  color: 'gray.700',
                }}
              />
            </InputGroup>
          </GridItem>
          <GridItem
            colSpan={isMobile ? 1 : 3}
          >
            <FormLabel htmlFor="suite">
              Suítes
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={(
                  <Icon
                    as={FaBed}
                    color="gray.700"
                  />
              )}
              />
              <Input
                variant="outline"
                placeholder="Suítes"
                border="1px"
                id="suite"
                bg="white"
                borderColor="gray.700"
                borderRadius="5px"
                onChange={({ target }) => setSuite(target.value)}
                value={suite}
                _placeholder={{
                  color: 'gray.700',
                }}
              />
            </InputGroup>
          </GridItem>
          <GridItem
            colSpan={isMobile ? 1 : 3}
          >
            <FormLabel htmlFor="bathrooms">
              Banheiros
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={(
                  <Icon
                    as={FaBath}
                    color="gray.700"
                  />
              )}
              />
              <Input
                variant="outline"
                placeholder="Banheiros"
                border="1px"
                id="bathrooms"
                bg="white"
                borderColor="gray.700"
                borderRadius="5px"
                onChange={({ target }) => setBathrooms(target.value)}
                value={bathrooms}
                _placeholder={{
                  color: 'gray.700',
                }}
              />
            </InputGroup>
          </GridItem>
          <GridItem
            colSpan={isMobile ? 1 : 3}
          >
            <FormLabel htmlFor="iptu">
              IPTU
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={(
                  <Icon
                    as={HiOutlineReceiptTax}
                    color="gray.700"
                  />
              )}
              />
              <Input
                variant="outline"
                placeholder="IPTU"
                border="1px"
                id="iptu"
                bg="white"
                borderColor="gray.700"
                borderRadius="5px"
                onChange={({ target }) => setIptu(target.value)}
                value={iptu}
                _placeholder={{
                  color: 'gray.700',
                }}
              />
            </InputGroup>
          </GridItem>
          <GridItem
            colSpan={isMobile ? 1 : 6}
          >
            <FormLabel htmlFor="youtube">
              YouTube
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={(
                  <Icon
                    as={FaYoutube}
                    color="gray.700"
                  />
              )}
              />
              <Input
                variant="outline"
                placeholder="YouTube"
                border="1px"
                id="youtube"
                bg="white"
                borderColor="gray.700"
                borderRadius="5px"
                onChange={({ target }) => setYoutube(target.value)}
                value={youtube}
                _placeholder={{
                  color: 'gray.700',
                }}
              />
            </InputGroup>
          </GridItem>
          <GridItem
            colSpan={isMobile ? 1 : 6}
          >
            <GoogleAutoComplete
              address={address}
              setAddress={setAddress}
              setCoordinates={setCoordinates}
            />

            <Box mt="30px">
              <GoogleMap
                zoom={coordinates.lng && coordinates.lat ? 15 : 11}
                center={coordinates.lng && coordinates.lat ? coordinates : center}
                mapContainerClassName="map-container"
              >
                {(coordinates.lng && coordinates.lat) && <Marker position={coordinates} />}
              </GoogleMap>
            </Box>
          </GridItem>

          <GridItem
            colSpan={isMobile ? 1 : 6}
          >
            <FormLabel>
              Informações
            </FormLabel>
            <Box mb="30px">
              <TextEditor
                setState={(editor: any) => setInformations(editor.getHTML())}
                state={informations}
              />
            </Box>

            <FormLabel>
              Características (Ex.: Quadra de esportes, Psicina, Condomínio fechado)
            </FormLabel>

            <Box bg="gray.100" p="5px 15px 15px" borderRadius="5px" mt="10px">
              <Input
                variant="outline"
                placeholder="Busque pela característica que gostaria de adicionar"
                border="1px"
                borderColor="gray.100"
                borderRadius="5px"
                onChange={({ target }) => setSearchChar(target.value)}
                value={searchChar}
                padding="0"
                _focus={{
                  outline: 'none',
                  boxShadow: 'none',
                  borderColor: 'gray.100',
                }}
                _placeholder={{
                  color: 'gray.700',
                }}
              />
              {
              !loading && selectedCharsFilter.map((char: any) => (
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

            <Flex mt="30px" justifyContent="flex-end">
              <Button colorScheme="green" isLoading={loading} onClick={handleCreate}>
                {id ? 'Editar' : 'Criar'}
                {' '}
                Imóvel
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </DashboardOffice>
    </>
  )
}
