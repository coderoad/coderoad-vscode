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
  itemText: {
    marginLeft: '0.5rem',
  },
}

interface Props {
  visible: boolean
  toggleVisible(visible: boolean): void
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
        <Item disabled key="1">
          <Icon type="list" size="small" color="#EBEBEB" />
          <span style={styles.itemText}>Review</span>
        </Item>
        {/* <Divider key="divider" />
        <Item disabled key="2">
          <Icon type="help" size="small" color="#EBEBEB" />
          <span style={styles.itemText}>Help</span>
        </Item> */}
        <Divider key="divider" />
        <Item disabled key="3">
          <Icon type="set" size="small" color="#EBEBEB" />
          <span style={styles.itemText}>Settings</span>
        </Item>
      </Menu>
    </Drawer>
  )
}

export default SideMenu
