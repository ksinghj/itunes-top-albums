import React, { useContext } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import styles from './list.module.scss'

import ListItem from '../list-item/ListItem'

import { TopAlbumsContext } from '../../state/topAlbumsContext'

const List = ({ className }) => {
  const { albumsList, searchTerm } = useContext(TopAlbumsContext)

  // eslint-disable-next-line no-unused-vars
  const renderItems = () => {
    // here we render the 100 albums, then user can filter if they want with search
    if (!searchTerm) {
      return (
        (albumsList &&
          albumsList.map((item, index) => (
            <ListItem
              rank={index + 1}
              name={item['im:name'].label}
              artist={item['im:artist'].label}
              imgSrc={item['im:image'][0].label}
              key={item}
            />
          ))) || (
          <SkeletonTheme color="lightGray">
            <section>
              <Skeleton count={10} />
            </section>
          </SkeletonTheme>
        )
      )
    }
    return (
      albumsList &&
      albumsList
        .filter(album => album['im:name'].label.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(item => (
          <ListItem name={item['im:name'].label} artist={item['im:artist'].label} key={item} />
        ))
    )
  }

  return (
    <div className={`${className} ${styles.container}`}>
      <h2 className={`${styles.header} text-white`}>Album</h2>
      <div className={styles.listItems}>{renderItems()}</div>
    </div>
  )
}

export default List
