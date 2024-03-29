import {
  Badge, Box, Flex, Grid, GridItem, Icon, Image, Link,
} from '@chakra-ui/react'
import { useUtilsContext } from '@src/Contexts/Utils.context'
import { urls } from '@src/Services/Api'
import React, { MouseEvent, useEffect, useMemo } from 'react'
import {
  FaArrowsAlt, FaBath, FaBed, FaDoorOpen,
} from 'react-icons/fa'
import { FiImage, FiMapPin, FiStar } from 'react-icons/fi'
import { useFavoritesContext } from '@src/Contexts/Favorite.context'
import { type } from 'os'

export const Property: React.FC<any> = ({
  property, small = false, hasEdit = false, view = 'grid',
}) => {
  const { types = [], purposes = [] } = useUtilsContext()
  const { favorites, setFavorite, removeFavorite } = useFavoritesContext()

  const handleFavorite = async (e: MouseEvent) => {
    e.preventDefault()

    const findFavorite = favorites.find(({ id }) => id === property.id)

    if (findFavorite) {
      removeFavorite(property.id)
    } else {
      setFavorite({
        id: property.id,
        title: property.title,
        photo: property.photos ? `${urls.images}${property.photos.split(',')[0]}` : '',
      })
    }
  }

  const hasFavorite = useMemo(() => !!favorites.find(({ id }) => id === property.id), [favorites])

  return (
    <Link
      href={hasEdit ? `/escritorio/imoveis/${property.id}` : `/imoveis/${property.id}`}
    >
      <Flex
        borderRadius="5px"
        overflow="hidden"
        position="relative"
        shadow="md"
        cursor="pointer"
        _hover={{
          shadow: 'lg',
        }}
        flexDirection={view === 'list' ? 'row' : 'column'}
      >
        {
          view === 'list' ? (
            property.photos ? (
              <Box backgroundImage={`url(${urls.images + property.photos.split(',')[0]})`} backgroundSize="cover" backgroundPosition="center center" height="300px" width="300px" minWidth="300px" />
            ) : (
              <Flex height="300px" width="300px" minWidth="300px" bg="gray.300" justifyContent="center" alignItems="center">
                <Icon as={FiImage} fontSize={60} color="gray.500" />
              </Flex>
            )
          ) : (
            property.photos ? (
              <Box backgroundImage={`url(${urls.images + property.photos.split(',')[0]})`} backgroundSize="cover" backgroundPosition="center center" height={small ? '190px' : '270px'} width="100%" />
            ) : (
              <Flex height={small ? '190px' : '270px'} width="100%" bg="gray.300" justifyContent="center" alignItems="center">
                <Icon as={FiImage} fontSize={60} color="gray.500" />
              </Flex>
            )
          )
        }
        <Box width="100%" height={view === 'list' ? '300px' : 'auto'} bg="gray.100">
          <Box p={small ? '15px' : '30px'} bg="gray.100" borderBottomWidth="1px" borderBottomColor="gray.300" textAlign="center" fontWeight="bold">
            {property.title}
          </Box>
          <Box p={small ? '15px' : '30px'} bg="gray.100" borderBottomWidth="1px" borderBottomColor="gray.300">
            <Flex alignItems="center">
              <Icon as={FiMapPin} fontSize={small ? '20px' : '42px'} strokeWidth="1px" mr="10px" />
              {property.address}
            </Flex>
          </Box>
          <Box p={small ? '15px' : '30px'} bg="gray.100">
            <Flex justifyContent="space-between" alignItems="center" wrap="wrap">
              <Flex alignItems="center">
                <Icon as={FaArrowsAlt} color="gray.500" width="20px" mr="5px" />
                <Box color="gray.500" fontSize="14px">
                  { `${property.area} ` }
                  m
                  <sup>2</sup>
                </Box>
              </Flex>
              <Flex alignItems="center" fontSize="14px">
                <Icon as={FaDoorOpen} color="gray.500" width="20px" mr="5px" />
                <Box color="gray.500">
                  { `${property.area_build} ` }
                  m
                  <sup>2</sup>
                </Box>
              </Flex>
              <Flex alignItems="center" fontSize="14px">
                <Icon as={FaBed} color="gray.500" width="20px" mr="5px" />
                <Box color="gray.500">
                  { `${property.bedrooms} quartos` }
                </Box>
              </Flex>
              <Flex alignItems="center" fontSize="14px">
                <Icon as={FaBath} color="gray.500" width="20px" mr="5px" />
                <Box color="gray.500">
                  { `${property.bathrooms} banheiros` }
                </Box>
              </Flex>
            </Flex>
            <Flex mt="20px" justifyContent="center" wrap="wrap">
              {
              property?.characteristics.map((char: string) => (
                <Badge
                  key={`${char}char`}
                  mr="10px"
                  mt="10px"
                  p="3px 10px"
                  colorScheme="green"
                  color="white"
                  fontSize={small ? '12px' : '14px'}
                  borderRadius="5px"
                >
                  { char }
                </Badge>
              ))
            }
            </Flex>
          </Box>

          <Box p={view === 'list' ? '0 30px' : '0'} position={view === 'list' ? 'absolute' : 'initial'} bottom="10px" right="-30px">
            <Badge
              mr="10px"
              mt="10px"
              p="3px 10px"
              bg="orange.500"
              color="white"
              fontSize={small ? '12px' : '14px'}
              borderRadius="5px"
              position={view === 'list' ? 'initial' : 'absolute'}
              top={small ? '5px' : '15px'}
              right={small ? '10px' : '20px'}
              shadow="md"
            >
              { `Tipo: ${!!types.length && types[Number(property.type)].label}` }
            </Badge>
            <Badge
              mr="10px"
              mt="10px"
              p="3px 10px"
              bg="gray.900"
              color="white"
              fontSize={small ? '12px' : '14px'}
              borderRadius="5px"
              position={view === 'list' ? 'initial' : 'absolute'}
              top={small ? '5px' : '15px'}
              left={small ? '10px' : '20px'}
              shadow="md"
            >
              { `Finalidade: ${!!purposes.length && purposes[Number(property.purpose)].label}` }
            </Badge>
          </Box>
          <Flex
            position="absolute"
            bg={hasFavorite ? 'orange.500' : 'white'}
            top={small ? (view === 'list' ? '250px' : '140px') : '220px'}
            left="10px"
            height="40px"
            width="40px"
            borderRadius="5px"
            onClick={(e) => handleFavorite(e)}
            shadow="md"
          >
            <Icon as={FiStar} fontSize="20px" color={hasFavorite ? 'white' : 'gray.500'} margin="auto" fill={hasFavorite ? 'white' : 'transparent'} />
          </Flex>
        </Box>
      </Flex>
    </Link>
  )
}
