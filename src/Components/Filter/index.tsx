import {
  Badge,
  Box, Button, Flex, Icon, Input,
  RangeSlider, RangeSliderFilledTrack,
  RangeSliderThumb, RangeSliderTrack, Select,
} from '@chakra-ui/react'
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
        <Flex color="gray.500">
          { area.map((a: any, index: any) => (
            <>
              <Box key={`${a}${index}area`}>{a}</Box>
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
          { areaBuild.map((a: any, index: any) => (
            <>
              <Box key={`${a}${index}areaBuild`}>{a}</Box>
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
          { bathrooms.map((a: any, index: any) => (
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
          { bedrooms.map((a: any, index: any) => (
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
