import React from 'react'
import styles from './top.module.scss'

import Search from '../search/Search'

import logo from '../../assets/apple-music-logo-white.png'

const Top = ({ className }) => (
  <div className={`${className} ${styles.container}`}>
    <div className={styles.imgContainer}>
      <img src={logo} alt="company logo" />
    </div>
    <h1 className={styles.header}>Top 100</h1>
    <Search />
  </div>
)

export default Top
