import React, { useState, useContext, useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import styles from './list-item.module.scss'

import { TopAlbumsContext } from '../../state/topAlbumsContext'

import placeholder from '../../assets/top100UK.png'

const ListItem = ({ rank, name, artist, imgSrc }) => {
  const { searchTerm } = useContext(TopAlbumsContext)
  const [visible, setVisible] = useState(false)
  const [artistDetails, setArtistDetails] = useState({
    genre: '',
    from: '',
    bio: '',
  })

  const getArtistDetails = async () => {
    const formattedArtistName = artist.replace(/ /g, '_') // replace spaces w _'s for api
    const URL = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${formattedArtistName}`
    fetch(URL)
      .then(data => data.json())
      .then(res => {
        if (res.artists === null) {
          setArtistDetails({
            genre: 'No data',
            from: 'No data',
            bio: 'No data, sorry.',
          })
          return
        }
        const artistsData = res.artists[0]
        if (artistsData) {
          setArtistDetails({
            genre: artistsData.strGenre,
            from: artistsData.strCountry,
            bio: artistsData.strBiographyEN,
          })
          if (artistsData.strGenre === null || artistsData.strGenre === '') {
            setArtistDetails({ ...artistDetails, genre: 'No data' })
          }
          if (artistsData.strCountry === null || artistsData.strCountry === '') {
            setArtistDetails({ ...artistDetails, from: 'No data' })
          }
          if (artistsData.strBiographyEN === null || artistsData.strBiographyEN === '') {
            setArtistDetails({ ...artistDetails, bio: 'No data' })
          }
        }
      })
  }

  useEffect(() => {
    setVisible(false)
  }, [searchTerm])

  return (
    <>
      <div className={styles.containerRow}>
        <button
          data-style="none"
          type="button"
          onClick={() => {
            setVisible(!visible)
          }}
          className={styles.header}>
          <p className={`${styles.rank} text-white`}>{rank}</p>
          <div className={styles.imgContainer}>
            <img className={styles.img} src={imgSrc || placeholder} alt="album cover art" />
          </div>
          <p className={`${styles.title} text-white`}>
            {
              `${name.replace(/\([^()]*\)/g, '')}` // remove text in brackets
            }
            <span className="text-primary">{artist}</span>
          </p>
        </button>
        <button
          data-style="none"
          type="button"
          onClick={() => {
            getArtistDetails()
            setVisible(!visible)
          }}
          className="text-white">
          See
          {visible ? ' less' : ' more'}
        </button>
      </div>
      <div className={`collapse ${styles.content} ${visible ? 'visible' : 'hidden'}`}>
        <div className={styles.genre}>
          <p className={styles.content__header}>Genre</p>
          <div className={`${styles.content__text} text-white`}>
            {artistDetails.genre || (
              <SkeletonTheme color="lightGray">
                <Skeleton count={1} />
              </SkeletonTheme>
            )}
          </div>
        </div>
        <div className={styles.from}>
          <p className={styles.content__header}>From</p>
          <div className={`${styles.content__text} text-white`}>
            {artistDetails.from || (
              <SkeletonTheme color="lightGray">
                <Skeleton count={1} />
              </SkeletonTheme>
            )}
          </div>
        </div>
        <div className={styles.about}>
          <p className={styles.content__header}>About</p>
          <div className={`${styles.content__text} text-white`}>
            {artistDetails.bio || (
              <SkeletonTheme color="lightGray">
                <Skeleton count={10} />
              </SkeletonTheme>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListItem
