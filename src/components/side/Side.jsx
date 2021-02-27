import React from 'react'
import styles from './side.module.scss'

import top100sideimg from '../../assets/top100UK.png'

const Side = ({ className }) => (
  <div className={`${className} ${styles.container}`}>
    <div className={styles.imgContainer}>
      <img src={top100sideimg} alt="top 100 songs art" />
    </div>
  </div>
)

export default Side
