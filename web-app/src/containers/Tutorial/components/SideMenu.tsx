import * as React from 'react'
import { Menu, Icon, Drawer } from '@alifd/next'
import { useTheme } from 'emotion-theming'
import { Theme } from '../../../styles/theme'

const { Item, Divider } = Menu

const styles = {
  drawer: {
    padding: 0,
  },
  menu: {
    margin: 0,
    height: '100%',
  },
  active: (theme: Theme) => ({
    color: theme['$color-white'],
    backgroundColor: theme['$color-brand1-9'],
  }),
  itemText: {
    marginLeft: '0.5rem',
  },
}

interface Props {
  visible: boolean
  toggleVisible(visible: boolean): void
  page: 'about' | 'level' | 'review' | 'settings'
  setPage(page: 'about' | 'level' | 'review' | 'settings'): void
}

const SideMenu = (props: Props) => {
  const onMenuClose = () => {
    props.toggleVisible(false)
  }
  const theme: Theme = useTheme()
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
          style={props.page === 'level' ? styles.active(theme) : {}}
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
          style={props.page === 'review' ? styles.active(theme) : {}}
          onClick={() => {
            onMenuClose()
            props.setPage('review')
          }}
        >
          <Icon type="list" size="small" color="#EBEBEB" />
          <span style={styles.itemText}>Review</span>
        </Item>
        <Divider key="divider" />
        <Item
          key="about"
          disabled={props.page === 'about'}
          style={props.page === 'about' ? styles.active(theme) : {}}
          onClick={() => {
            onMenuClose()
            props.setPage('about')
          }}
        >
          <Icon type="prompt" size="xs" color="#EBEBEB" />
          <span style={styles.itemText}>About</span>
        </Item>
        <Item
          key="settings"
          disabled={props.page === 'settings'}
          style={props.page === 'settings' ? styles.active(theme) : {}}
          onClick={() => {
            onMenuClose()
            props.setPage('settings')
          }}
        >
          <Icon type="set" size="small" color="#EBEBEB" />
          <span style={styles.itemText}>Settings</span>
        </Item>
      </Menu>
    </Drawer>
  )
}

export default SideMenu
