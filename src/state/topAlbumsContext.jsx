import React, { createContext, useEffect, useState } from 'react'

import useFetch from '../hooks/useFetch'

export const TopAlbumsContext = createContext()

const TopAlbumsProvider = ({ children }) => {
  const [albumsList, setAlbumsList] = useState(null)
  const [searchTerm, setSearchTerm] = useState(null)

  const URL = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json'

  useEffect(() => {
    const abortController = new AbortController() // allow us to cancel the request
    useFetch(URL, {
      signal: abortController.signal,
    })
      .then(
        res =>
          // console.log(res.feed.entry)
          res.feed.entry
      )
      .then(res => {
        setAlbumsList(res)
      })

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <TopAlbumsContext.Provider value={{ albumsList, setAlbumsList, searchTerm, setSearchTerm }}>
      {children}
    </TopAlbumsContext.Provider>
  )
}

export default TopAlbumsProvider
