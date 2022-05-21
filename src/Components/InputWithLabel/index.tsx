import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

interface iInputWithLabel {
  value: string
  setValue(value: string): void
  label: string
  placeholder?: string
  disabled?: boolean
  id?: string
}

export const InputWithLabel: React.FC<iInputWithLabel> = ({
  value = '',
  setValue = () => {},
  label = '',
  placeholder = '',
  disabled = false,
  id = '',
}) => (
  <FormControl
    mt="15px"
    position="relative"
  >
    <FormLabel
      htmlFor={id || label}
      position="absolute"
      top="-12px"
      left="20px"
      display="inline-block"
      bg="gray.100"
      zIndex="1"
      px="5px"
    >
      {label}
    </FormLabel>
    <Input
      variant="outline"
      disabled={disabled}
      id={id || label}
      border="1px"
      borderColor="gray.700"
      borderRadius="5px"
      placeholder={placeholder}
      onChange={({ target }) => setValue(target.value)}
      value={value}
      _placeholder={{
        color: 'gray.700',
      }}
      _hover={{
        borderColor: 'gray.900',
        outline: 'none',
      }}
      _focus={{
        boxShadow: 0,
      }}
    />
  </FormControl>
)
