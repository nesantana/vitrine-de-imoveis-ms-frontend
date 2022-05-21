import {
  Box, FormLabel, Icon, Input, InputGroup, InputLeftElement,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FiMapPin } from 'react-icons/fi'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'

export const GoogleAutoComplete: React.FC<any> = ({ address, setAddress, setCoordinates }) => {
  const {
    ready,
    value: valueAddress,
    setValue: setValueAddress,
    suggestions: { status: statusSuggestions, data: dataSuggestions },
    clearSuggestions,
  } = usePlacesAutocomplete()

  useEffect(() => {
    setValueAddress(address, false)
    clearSuggestions()
  }, [address])

  const handleSelected = async (value: any) => {
    setValueAddress(value, false)
    clearSuggestions()

    const results = await getGeocode({ address: value })
    const res = await getLatLng(results[0])

    setAddress(value)
    setCoordinates({ lat: res.lat, lng: res.lng })
  }

  return (
    <Box position="relative">
      <FormLabel htmlFor="address">
        Endereço
      </FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={(
            <Icon
              as={FiMapPin}
              color="gray.700"
            />
          )}
        />
        <Input
          variant="outline"
          placeholder="Endereço"
          border="1px"
          bg="white"
          id="address"
          borderColor="gray.700"
          borderRadius="5px"
          disabled={!ready}
          onChange={({ target }) => setValueAddress(target.value)}
          value={valueAddress}
          _placeholder={{
            color: 'gray.700',
          }}
        />
      </InputGroup>

      <Box
        position="absolute"
        zIndex="9"
        width="100%"
        shadow="lg"
        top="80px"
        maxHeight="300px"
        overflow="auto"
      >
        {statusSuggestions === 'OK' && dataSuggestions.map((item, index) => (
          <Box
            key={item.place_id}
            bg={index % 2 === 0 ? 'gray.100' : 'white'}
            padding="20px"
            _hover={{
              bg: index % 2 === 0 ? 'gray.300' : 'gray.200',
            }}
            cursor="pointer"
            onClick={() => handleSelected(item.description)}
          >
            <Icon
              as={FiMapPin}
              color="gray.700"
              marginRight="10px"
            />
            {item.description}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
