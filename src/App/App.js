import React from 'react'
import styles from './App.module.scss'

import Top from '../components/top/Top'
import Side from '../components/side/Side'
import List from '../components/list/List'
import Footer from '../components/footer/Footer'

import TopAlbumsProvider from '../state/topAlbumsContext'

function App() {
  return (
    <TopAlbumsProvider>
      <div className={styles.container}>
        <Side className={styles.side} />
        <Top className={styles.top} />
        <List className={styles.list} />
        <Footer className={styles.footer} />
      </div>
    </TopAlbumsProvider>
  )
}

export default App
