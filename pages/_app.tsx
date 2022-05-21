import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { createGlobalStyle } from 'styled-components'
import { UtilsProvider } from '@src/Contexts/Utils.context'
import { LoadingProvider } from '@src/Contexts/Loading.context'
import { AlertProvider } from '@src/Contexts/Alert.context'
import { ContentAlerts } from '@src/Components/ContentAlerts'
import { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import { api } from '@src/Services/Api'
import { Loader } from '@src/Components/Loader'
import { MyInformationsProvider } from '@src/Contexts/MyInformations.context'
import { apiFormData } from '@src/Services/ApiFormData'
import { FavoritesProvider } from '@src/Contexts/Favorite.context'

const colors = {
  gray: {
    900: '#212121',
    800: '#424242',
    700: '#616161',
    600: '#757575',
    500: '#9e9e9e',
    400: '#bdbdbd',
    300: '#e0e0e0',
    200: '#eeeeee',
    100: '#f5f5f5',
  },
  green: {
    900: '#00560E',
    600: '#008A16',
    500: '#00ab1b',
    400: '#00C51F',
    100: '#00C51F',
  },
  orange: {
    900: '#e65100',
    800: '#ef6c00',
    700: '#f57c00',
    600: '#fb8c00',
    500: '#ff9800',
    400: '#ffa726',
    300: '#ffb74d',
    200: '#ffcc80',
    100: '#ffe0b2',
  },
  red: {
    900: '#b71c1c',
    800: '#c62828',
    700: '#d32f2f',
    600: '#e53935',
    500: '#f44336',
    400: '#e57373',
    300: '#ef9a9a',
    200: '#ffcdd2',
    100: '#ffebee',
  },
}

const theme = extendTheme({ colors })

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Ubuntu Condensed', sans-serif;
    box-sizing: border-box;
    transition: ease-in .1s;
  }

  html,
  body {
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none !important;
  }

  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: -15px; /* gutter size offset */
    width: auto;
  }

  .my-masonry-grid_column {
    padding-left: 15px; /* gutter size */
    background-clip: padding-box;
  }

  .map-container {
    width: 100%;
    height: 300px;
  }

  .ql-toolbar.ql-snow:first-child {
    display: none;
  }

  .quill {
    border: 1px solid #616161;
    border-radius: 5px;
    overflow: hidden;
  }

  .informations {
    ul, ol {
      padding-left: 20px;
    }
  }

  a:focus {
    box-shadow: none !important;
  }
`

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const verifyToken = async () => {
    setLoading(true)
    try {
      const { token } = await parseCookies()

      if (token) {
        api.setToken(token)
        apiFormData.setToken(token)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    verifyToken()
  }, [])

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <ChakraProvider theme={theme}>
      <AlertProvider>
        <LoadingProvider>
          <UtilsProvider>
            <MyInformationsProvider>
              <FavoritesProvider>
                <GlobalStyle />
                <Component {...pageProps} />
                <ContentAlerts />
              </FavoritesProvider>
            </MyInformationsProvider>
          </UtilsProvider>
        </LoadingProvider>
      </AlertProvider>
    </ChakraProvider>
  )
}

export default MyApp
