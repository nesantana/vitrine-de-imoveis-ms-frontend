import {
  Badge,
  Box, Button, Flex, Icon, Input,
  InputGroup,
  InputRightAddon, Select,
} from '@chakra-ui/react'
import { MaxNumber } from '@src/Utils/MaxNumber'
import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'

export const Filter: React.FC<any> = ({
  loading,
  isMobile = false,
  characteristics,
  selectedChars,
  toogleChars,
  changeFilters,
  loadingSend,
  bedrooms = [],
  setBedrooms,
  bathrooms = [],
  setBathrooms,
  areaBuild = [],
  setAreaBuild,
  area = [],
  setArea,
  address,
  setAddress,
  types,
  type,
  setType,
  purposes,
  purpose,
  setPurpose,
  term,
  setTerm,
  openFilter = false,
  setOpenFilter = () => {},
}) => (
  <Box
    style={
      isMobile ? {
        position: 'fixed',
        top: '0',
        left: openFilter ? '0' : '-100%',
        width: '100%',
        height: '100%',
        zIndex: 5,
        padding: '30px',
        overflow: 'auto',
      } : {
        padding: '20px 20px 40px 20px',
        borderRadius: '5px',
        position: 'relative',
      }
    }
    bg="gray.100"
    shadow="lg"
  >
    <Flex justifyContent="space-between" alignItems="center">
      BUSQUE SEU IMÓVEL IDEAL

      {isMobile && (
        <Icon as={FiX} fontSize="20px" onClick={() => setOpenFilter(false)} />
      )}
    </Flex>

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
        {purposes.map((p: any) => (
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
        {types.map((t: any) => (
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
      </Flex>
      <Box mt="10px">
        <Flex>
          <InputGroup size="sm">
            <Input
              variant="outline"
              placeholder="Min"
              border="1px"
              bg="white"
              borderColor="gray.700"
              borderRadius="5px"
              onChange={({ target }) => setArea([MaxNumber(target.value), area[1]])}
              value={area[0]}
              _placeholder={{
                color: 'gray.700',
              }}
            />
            <InputRightAddon bg="green.500" borderWidth="1px" borderColor="green.500" color="white">
              m
              {' '}
              <sup>2</sup>
            </InputRightAddon>
          </InputGroup>
          <InputGroup
            size="sm"
            marginLeft="30px"
          >
            <Input
              variant="outline"
              placeholder="Max"
              border="1px"
              bg="white"
              borderColor="gray.700"
              borderRadius="5px"
              type="number"
              max="999"
              onChange={({ target }) => setArea([area[0], MaxNumber(target.value)])}
              maxLength={3}
              value={area[1]}
              _placeholder={{
                color: 'gray.700',
              }}
            />
            <InputRightAddon bg="green.500" borderWidth="1px" borderColor="green.500" color="white">
              m
              {' '}
              <sup>2</sup>
            </InputRightAddon>
          </InputGroup>
        </Flex>
      </Box>
    </Box>

    <Box mt="30px">
      <Flex justifyContent="space-between">
        <Box>
          Área Construída
        </Box>
      </Flex>

      <Box mt="10px">
        <Flex>
          <InputGroup size="sm">
            <Input
              variant="outline"
              placeholder="Min"
              border="1px"
              bg="white"
              borderColor="gray.700"
              borderRadius="5px"
              onChange={({ target }) => setAreaBuild([MaxNumber(target.value), areaBuild[1]])}
              value={areaBuild[0]}
              _placeholder={{
                color: 'gray.700',
              }}
            />
            <InputRightAddon bg="green.500" borderWidth="1px" borderColor="green.500" color="white">
              m
              {' '}
              <sup>2</sup>
            </InputRightAddon>
          </InputGroup>
          <InputGroup
            size="sm"
            marginLeft="30px"
          >
            <Input
              variant="outline"
              placeholder="Max"
              border="1px"
              bg="white"
              borderColor="gray.700"
              borderRadius="5px"
              type="number"
              max="999"
              onChange={({ target }) => setAreaBuild([areaBuild[0], MaxNumber(target.value)])}
              maxLength={3}
              value={areaBuild[1]}
              _placeholder={{
                color: 'gray.700',
              }}
            />
            <InputRightAddon bg="green.500" borderWidth="1px" borderColor="green.500" color="white">
              m
              {' '}
              <sup>2</sup>
            </InputRightAddon>
          </InputGroup>
        </Flex>
      </Box>
    </Box>

    <Box mt="30px">
      <Flex justifyContent="space-between">
        <Box>
          Banheiros
        </Box>
      </Flex>
      <Box mt="10px">
        <Flex>
          <InputGroup size="sm">
            <Input
              variant="outline"
              placeholder="Min"
              border="1px"
              bg="white"
              borderColor="gray.700"
              borderRadius="5px"
              onChange={({ target }) => setBathrooms([MaxNumber(target.value, 9), bathrooms[1]])}
              value={bathrooms[0]}
              _placeholder={{
                color: 'gray.700',
              }}
            />
          </InputGroup>
          <InputGroup
            size="sm"
            marginLeft="30px"
          >
            <Input
              variant="outline"
              placeholder="Max"
              border="1px"
              bg="white"
              borderColor="gray.700"
              borderRadius="5px"
              type="number"
              max="999"
              onChange={({ target }) => setBathrooms([bathrooms[0], MaxNumber(target.value, 9)])}
              maxLength={1}
              value={bathrooms[1]}
              _placeholder={{
                color: 'gray.700',
              }}
            />
          </InputGroup>
        </Flex>
      </Box>
    </Box>

    <Box mt="30px">
      <Flex justifyContent="space-between">
        <Box>
          Quartos
        </Box>
      </Flex>
      <Flex>
        <InputGroup size="sm">
          <Input
            variant="outline"
            placeholder="Min"
            border="1px"
            bg="white"
            borderColor="gray.700"
            borderRadius="5px"
            onChange={({ target }) => setBedrooms([MaxNumber(target.value, 9), bedrooms[1]])}
            value={bedrooms[0]}
            _placeholder={{
              color: 'gray.700',
            }}
          />
        </InputGroup>
        <InputGroup
          size="sm"
          marginLeft="30px"
        >
          <Input
            variant="outline"
            placeholder="Max"
            border="1px"
            bg="white"
            borderColor="gray.700"
            borderRadius="5px"
            type="number"
            max="999"
            onChange={({ target }) => setBedrooms([bedrooms[0], MaxNumber(target.value, 9)])}
            maxLength={1}
            value={bedrooms[1]}
            _placeholder={{
              color: 'gray.700',
            }}
          />
        </InputGroup>
      </Flex>
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
      <Button
        colorScheme="green"
        isFullWidth
        shadow="lg"
        height="40px"
        onClick={() => {
          changeFilters()
          setOpenFilter(false)
        }}
        isLoading={loadingSend}
      >
        Buscar imóveis
      </Button>
    </Box>
  </Box>
)
