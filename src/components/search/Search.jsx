import React, { useContext } from 'react'
import styles from './search.module.scss'

import { TopAlbumsContext } from '../../state/topAlbumsContext'

export default ({ className }) => {
  const { setSearchTerm } = useContext(TopAlbumsContext)

  const handleChange = e => {
    setSearchTerm(e.target.value)
  }

  const handleFocus = event => event.target.select() // easier for user to search again

  return (
    <div className={`${className} ${styles.container}`}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search the list"
        onChange={e => handleChange(e)}
        onFocus={handleFocus}
      />
    </div>
  )
}
