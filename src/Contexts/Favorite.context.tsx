import { iFavorite } from '@src/Interfaces'
import React, { useContext, createContext, useState } from 'react'

interface iFavoriteContext {
  favorites: iFavorite[]
  setFavorite(alert: iFavorite): void
  removeFavorite(id: number): void
  setFavorites(favorites: iFavorite[]): void
  openFavorite: boolean
  setOpenFavorite(bool: boolean): void
}

export const FavoritesContext = createContext({} as iFavoriteContext)

export const useFavoritesContext = () => useContext(FavoritesContext)

export const FavoritesProvider: React.FC<any> = ({ children }) => {
  const [favorites, setFavorites] = useState<iFavorite[]>([] as iFavorite[])
  const [openFavorite, setOpenFavorite] = useState<boolean>(false)

  const setFavorite = async (favorite: iFavorite) => {
    const newFavorites = [
      ...favorites,
      favorite,
    ]

    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setFavorites(newFavorites)
  }

  const removeFavorite = async (id: number) => {
    const newFavorites = favorites.filter((fav) => fav.id !== id)

    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setFavorites(newFavorites)
  }

  return (
    <FavoritesContext.Provider value={{
      favorites,
      setFavorite,
      removeFavorite,
      setFavorites,
      openFavorite,
      setOpenFavorite,
    }}
    >
      { children }
    </FavoritesContext.Provider>
  )
}
