import React from 'react'
import styles from './footer.module.scss'

import iTunes from '../../assets/itunes.png'

const Footer = () => (
  <footer className={styles.container}>
    <p className={`${styles.footer__text} text-white`}>Powered by</p>
    <img className={styles.footer__img} src={iTunes} alt="iTunes logo" />
  </footer>
)

export default Footer
