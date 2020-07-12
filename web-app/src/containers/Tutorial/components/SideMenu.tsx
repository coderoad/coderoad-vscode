import * as React from 'react'
import { Menu, Icon, Drawer } from '@alifd/next'

const { Item, Divider } = Menu

const styles = {
  drawer: {
    padding: 0,
  },
  menu: {
    margin: 0,
    height: '100%',
  },
  active: {
    color: 'white',
    backgroundColor: 'rgb(85, 132, 255)',
  },
  itemText: {
    marginLeft: '0.5rem',
  },
}

interface Props {
  visible: boolean
  toggleVisible(visible: boolean): void
  page: 'level' | 'settings' | 'review'
  setPage(page: 'level' | 'settings' | 'review'): void
}

const SideMenu = (props: Props) => {
  const onMenuClose = () => {
    props.toggleVisible(false)
  }
  return (
    <Drawer
      bodyStyle={styles.drawer}
      title="Menu"
      visible={props.visible}
      placement="left"
      closeable="mask"
      onClose={onMenuClose}
    >
      <Menu style={styles.menu} defaultOpenKeys="sub-menu">
        <Item
          key="level"
          disabled={props.page === 'level'}
          style={props.page === 'level' ? styles.active : {}}
          onClick={() => {
            onMenuClose()
            props.setPage('level')
          }}
        >
          <Icon type="detail" size="small" color="#EBEBEB" />
          <span style={styles.itemText}>Level</span>
        </Item>
        <Item
          key="review"
          disabled={props.page === 'review'}
          style={props.page === 'review' ? styles.active : {}}
          onClick={() => {
            onMenuClose()
            props.setPage('review')
          }}
        >
          <Icon type="list" size="small" color="#EBEBEB" />
          <span style={styles.itemText}>Review</span>
        </Item>
        {/* <Divider key="divider" />
        <Item
          key="settings"
          disabled={props.page === 'settings'}
          style={props.page === 'settings' ? styles.active : {}}
          onClick={() => {
            onMenuClose()
            props.setPage('settings')
          }}
        >
          <Icon type="set" size="small" color="#EBEBEB" />
          <span style={styles.itemText}>Settings</span>
        </Item> */}
      </Menu>
    </Drawer>
  )
}

export default SideMenu
