import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
} from '@chakra-ui/react'
import { useUtilsContext } from '@src/Contexts/Utils.context'
import { FiMaximize2 } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { Container } from '../Container'

interface iBanner {
  title?: string
}

export const Banner: React.FC<iBanner> = ({ title = '' }) => {
  const { searchUtils, purposes, types } = useUtilsContext()
  const [purpose, setPurpose] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [address, setAddress] = useState<string>('')

  const router = useRouter()

  useEffect(() => {
    if (!purposes.length || !types.length) {
      searchUtils()
    }
  }, [])

  const handleGoProperties = () => {
    const query: any = {}

    if (purpose) {
      query.purpose = purpose
    }

    if (type) {
      query.type = type
    }

    if (address) {
      query.address = address
    }

    router.push({
      pathname: '/imoveis/',
      query,
    })
  }

  if (title) {
    return (
      <Flex height="200px" width="100%" bgImage="url(/fundo.jpg)" bgSize="cover" bgPosition="bottom" alignItems="center" justifyContent="center">
        <Box color="#FFF" fontSize="45px">
          { title }
        </Box>
      </Flex>
    )
  }

  return (
    <Flex height="546px" width="100%" bgImage="url(/fundo.jpg)" bgSize="cover">
      <Container>
        <Grid
          templateColumns="repeat(15, 1fr)"
          gap={3}
          mt="100px"
          p="40px"
          bg="rgba(255, 255, 255, .9)"
          borderRadius="15px"
          padding="30px"
          width="100%"
          mb="30px"
          overflow="hidden"
          background="#FFFFFF"
        >
          <GridItem colSpan={4}>
            <Select
              placeholder="O que precisa?"
              border="1px"
              borderColor="gray.700"
              borderRadius="5px"
              onChange={({ target }) => setPurpose(target.value)}
              value={purpose}
            >
              {purposes.map((pur) => (
                <option key={pur.id} value={pur.id}>{pur.label}</option>
              ))}
            </Select>
          </GridItem>
          <GridItem colSpan={4}>
            <Select
              placeholder="Qual seu tipo de Imóvel?"
              border="1px"
              borderColor="gray.700"
              borderRadius="5px"
              onChange={({ target }) => setType(target.value)}
              value={type}
            >
              {types.map((tp) => (
                <option key={tp.id} value={tp.id}>{tp.label}</option>
              ))}
            </Select>
          </GridItem>
          <GridItem colSpan={4}>
            <Input
              variant="outline"
              placeholder="Busque Bairro ou Cidade?"
              border="1px"
              borderColor="gray.700"
              borderRadius="5px"
              onChange={({ target }) => setAddress(target.value)}
              value={address}
              _placeholder={{
                color: 'gray.700',
              }}
            />
          </GridItem>
          <GridItem colSpan={3}>
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap={3}
              width="100%"
            >
              <GridItem colSpan={2}>
                <Button
                  colorScheme="green"
                  isFullWidth
                  borderRadius="5px"
                  onClick={handleGoProperties}
                >
                  Buscar
                </Button>
              </GridItem>
              <GridItem colSpan={1}>
                <Button
                  colorScheme="green"
                  variant="outline"
                  isFullWidth
                  borderRadius="5px"
                >
                  <FiMaximize2 />
                </Button>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Container>
    </Flex>
  )
}
