import {
  Box, Button, Container, Flex,
  FormControl, FormLabel, Grid, GridItem, Icon,
  Image, Input, Link, Select, Tooltip,
} from '@chakra-ui/react'
import { DashboardOffice } from '@src/Components/DashboardOffice'
import { InputWithLabel } from '@src/Components/InputWithLabel'
import { useAlertContext } from '@src/Contexts/Alert.context'
import { useMyInformations } from '@src/Contexts/MyInformations.context'
import { useUtilsContext } from '@src/Contexts/Utils.context'
import { api, urls } from '@src/Services/Api'
import { apiFormData } from '@src/Services/ApiFormData'
import axios from 'axios'
import { isEmpty } from 'lodash'
import Head from 'next/head'
import React, {
  useEffect, useMemo, useState,
} from 'react'
import {
  FiImage, FiInfo, FiPlus, FiX,
} from 'react-icons/fi'

interface iProfessionalDocument {
  id: string,
  state: string
  document: string
}

export const MyProfile: React.FC<any> = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [document, setDocument] = useState<string>('')
  const [zipCode, setZipCode] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [neighborhood, setNeighborhood] = useState<string>('')
  const [number, setNumber] = useState<string>('')
  const [complement, setComplement] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [stateDocument, setStateDocument] = useState<string>('MS')
  const [numberDocument, setNumberDocument] = useState<string>('')
  const [professionalDocument, setProfessionalDocument] = useState<iProfessionalDocument[]>([])

  const { states, searchUtils } = useUtilsContext()
  const { setAlert } = useAlertContext()
  const { myInformations, searchMyInformations } = useMyInformations()
  const [loadingSave, setLoadingSave] = useState<boolean>(false)
  const [photo, setPhoto] = useState<string>('')

  const emptyProfessionalDocument = () => ({
    id: `${new Date().getTime() + Math.random()}`,
    state: '',
    document: '',
  })

  const filteredStates = useMemo(() => {
    let newStates: any = [...states]

    professionalDocument.map((doc) => {
      newStates = states.filter((state) => state.initials !== doc.state)

      return doc
    })

    return newStates ?? []
  }, [professionalDocument, states])

  const addNewProfessionalDocument = () => {
    const newProfessionalDocument = [
      ...professionalDocument,
      {
        ...emptyProfessionalDocument(),
        state: stateDocument,
        document: numberDocument,
      },
    ]

    setProfessionalDocument(newProfessionalDocument)
    setStateDocument('')
    setNumberDocument('')
  }

  const removeAProfessionalDocument = (id: string) => {
    const newProfessionalDocument = professionalDocument.filter(
      (item) => id !== item.id,
    )

    setProfessionalDocument(newProfessionalDocument)
  }

  const [loadingZipcode, setLoadingZipcode] = useState<boolean>(false)

  const findZipcode = async (zipcode: string) => {
    const zipClear = zipcode.replace('-', '')

    if (zipClear.length === 8) {
      setLoadingZipcode(true)
      try {
        const { data } = await axios({
          method: 'get',
          url: urls.zipcode.replace('#zipcode', zipClear),
        })

        if (data.erro) {
          setAlert({
            type: 'error',
            message: 'Não conseguimos encontrar este CEP',
          })

          return
        }

        setStreet(data.logradouro)
        setNeighborhood(data.bairro)
      } catch (error: any) {
        setAlert({
          type: 'error',
          message: 'Não conseguimos encontrar este CEP',
        })
      } finally {
        setLoadingZipcode(false)
      }
    }
  }

  useEffect(() => {
    if (!states.length) {
      searchUtils()
    }

    if (isEmpty(myInformations)) {
      searchMyInformations()
    }
  }, [])

  useEffect(() => {
    if (!isEmpty(myInformations)) {
      setProfessionalDocument(JSON.parse(myInformations.professional_document) ?? [])
      setName(myInformations.name ?? '')
      setUsername(myInformations.username ?? '')
      setPhone(myInformations.phone ?? '')
      setEmail(myInformations.email ?? '')
      setDocument(myInformations.document ?? '')
      setZipCode(myInformations.zipcode ?? '')
      setStreet(myInformations.street ?? '')
      setNeighborhood(myInformations.neighborhood ?? '')
      setNumber(myInformations.number ?? '')
      setComplement(myInformations.complement ?? '')
      setPhoto(myInformations.photo ?? '')
    }
  }, [myInformations])

  const handleSave = async () => {
    setLoadingSave(true)
    try {
      const params = {
        id: myInformations.id,
        name,
        phone,
        username,
        document,
        zipcode: zipCode,
        street,
        neighborhood,
        number,
        complement,
        professional_document: JSON.stringify(professionalDocument),
      }

      await api.post(urls.users.edit, params)

      setAlert({
        type: 'success',
        message: 'Atualizado com sucesso!',
      })
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: error.response.data.error,
      })
    } finally {
      setLoadingSave(false)
    }
  }

  const uploadImage = async (files: FileList) => {
    const file = files[0]

    const formData = new FormData()

    formData.append('photo', file)
    formData.append('id', `${myInformations.id}`)

    try {
      await apiFormData.post(urls.users.upload, formData)

      searchMyInformations()
      setAlert({
        type: 'success',
        message: 'Foto atualizada com sucesso.',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>
          Meu perfil | Vitrine de Imóveis MS
        </title>
        <meta name="description" content="Meu perfil | Vitrine de Imóveis MS - A forma mais simples de ser visto na internet." />
      </Head>
      <DashboardOffice>
        <Container maxWidth="770px" width="100%">
          <Box>
            Perfil
          </Box>
          <Grid
            templateColumns="repeat(5, 1fr)"
            gap={30}
            width="100%"
            bg="gray.100"
            p="20px"
            borderRadius="5px"
            shadow="lg"
          >
            <GridItem colSpan={2}>
              {photo ? (
                <Flex
                  height="244px"
                  width="100%"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="5px"
                  backgroundImage={`url(${urls.images}${photo})`}
                  backgroundSize="cover"
                  backgroundPosition="center center"
                />
              ) : (
                <Flex
                  height="244px"
                  width="100%"
                  bg="gray.300"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="5px"
                >
                  <Icon as={FiImage} fontSize={60} color="gray.500" />
                </Flex>
              )}
              <Box
                mt="5px"
                color="gray.500"
                fontSize="14px"
                cursor="pointer"
                _hover={{ textDecoration: 'underline' }}
                position="relative"
              >
                <Box pointerEvents="none">
                  Trocar foto
                </Box>

                <Input cursor="pointer" height="100%" type="file" onChange={({ target }) => uploadImage(target.files as FileList)} position="absolute" top="0" bottom="0" left="0" right="0" opacity="0" />
              </Box>
            </GridItem>
            <GridItem colSpan={3}>
              <Grid
                templateColumns="repeat(5, 1fr)"
                gap={5}
                width="100%"
              >
                <GridItem colSpan={5}>
                  <InputWithLabel label="Nome" setValue={setName} value={name} />
                </GridItem>
                <GridItem colSpan={5}>
                  <InputWithLabel label="E-mail" setValue={setEmail} value={email} />
                </GridItem>
                <GridItem colSpan={5}>
                  <InputWithLabel label="Celular" setValue={setPhone} value={phone} />
                </GridItem>
                <GridItem colSpan={5}>
                  <InputWithLabel label="Link do Escritório" setValue={setUsername} value={username} />
                  <Tooltip label="Esse será o link para apresentar seus imóveis, seu escritório virtual!" hasArrow>
                    <Flex color="gray.500" _hover={{ color: 'gray.700' }} fontSize="13px" mt="5px" justifyContent="space-between">
                      <Link href={`https://vitrinedeimoveisms.com.br/${username}`} target="_blank">
                        https://vitrinedeimoveisms.com.br/
                        { username }
                      </Link>

                      <Icon as={FiInfo} />
                    </Flex>
                  </Tooltip>
                </GridItem>
                <GridItem colSpan={3}>
                  <InputWithLabel label="CPF/CNPJ" setValue={setDocument} value={document} />
                </GridItem>
                <GridItem colSpan={2} position="relative">
                  <InputWithLabel
                    label="CEP"
                    setValue={(value) => {
                      setZipCode(value)
                      findZipcode(value)
                    }}
                    value={zipCode}
                  />
                  {
                  loadingZipcode && (
                  <Image src="/loader.svg" width="22px" position="absolute" right="10px" top="23px" />
                  )
                }
                </GridItem>
                <GridItem colSpan={5}>
                  <InputWithLabel label="Logradouro" disabled setValue={setStreet} value={street} />
                </GridItem>
                <GridItem colSpan={3}>
                  <InputWithLabel label="Bairro" disabled setValue={setNeighborhood} value={neighborhood} />
                </GridItem>
                <GridItem colSpan={2}>
                  <InputWithLabel label="Número" setValue={setNumber} value={number} />
                </GridItem>
                <GridItem colSpan={5}>
                  <InputWithLabel label="Complemento" setValue={setComplement} value={complement} />
                </GridItem>
                <GridItem colSpan={5} mt="30px">
                  Informações sobre o CRECI:
                </GridItem>
                {
                !!professionalDocument.length && (
                  <GridItem colSpan={5} position="relative">
                    <Grid
                      templateColumns="repeat(7, 1fr)"
                      gap={5}
                      width="100%"
                      alignItems="center"
                      bg="white"
                      textAlign="center"
                      p="10px"
                      borderRadius="5px"
                    >
                      <GridItem colSpan={1} />
                      <GridItem colSpan={3}>
                        <Box>
                          Estado
                        </Box>
                      </GridItem>
                      <GridItem colSpan={3}>
                        Número
                      </GridItem>
                    </Grid>
                  </GridItem>
                )
              }
                {
                professionalDocument.map((doc, index) => (
                  <GridItem colSpan={5} position="relative" key={doc.id}>
                    <Grid
                      templateColumns="repeat(7, 1fr)"
                      gap={5}
                      width="100%"
                      alignItems="center"
                      bg="white"
                      textAlign="center"
                      p="10px"
                      borderRadius="5px"
                    >
                      <GridItem colSpan={1}>
                        <Button isFullWidth onClick={() => removeAProfessionalDocument(doc.id)} colorScheme="red">
                          <Icon as={FiX} />
                        </Button>
                      </GridItem>
                      <GridItem colSpan={3}>
                        <Box>
                          {doc.state}
                        </Box>
                      </GridItem>
                      <GridItem colSpan={3}>
                        <Box>
                          {doc.document}
                        </Box>
                      </GridItem>
                    </Grid>
                  </GridItem>
                ))
              }
                <GridItem colSpan={5} position="relative">
                  <Grid
                    templateColumns="repeat(5, 1fr)"
                    gap={5}
                    width="100%"
                    alignItems="flex-end"
                  >
                    <GridItem colSpan={2}>
                      <FormControl
                        mt="15px"
                        position="relative"
                      >
                        <FormLabel
                          htmlFor="states"
                          position="absolute"
                          top="-12px"
                          left="20px"
                          display="inline-block"
                          bg="gray.100"
                          zIndex="1"
                          px="5px"
                        >
                          Estados
                        </FormLabel>
                        <Select
                          id="states"
                          border="1px"
                          borderColor="gray.700"
                          borderRadius="5px"
                          onChange={({ target }) => setStateDocument(target.value)}
                          value={stateDocument}
                        >
                          {filteredStates.map((state: any) => (
                            <option
                              key={state.initials}
                              value={state.initials}
                            >
                              {state.name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <InputWithLabel
                        label="Número"
                        id="number_document"
                        setValue={(value) => setNumberDocument(value)}
                        value={numberDocument}
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Button isFullWidth isDisabled={!numberDocument || !stateDocument} colorScheme="green" onClick={addNewProfessionalDocument}>
                        <Icon as={FiPlus} />
                      </Button>
                    </GridItem>
                  </Grid>
                </GridItem>
                <GridItem colSpan={5} mt="30px">
                  <Flex>
                    <Button onClick={handleSave} isLoading={loadingSave} colorScheme="green" display="inline-block" width="auto" margin="0 0 0 auto">
                      Salvar alterações
                    </Button>
                  </Flex>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </Container>
      </DashboardOffice>
    </>
  )
}
