import { Menu } from 'antd'
import { getItem } from '../../utils/menu-item'
import navRoute from '../../utils/nav-route'
import { Link } from 'react-router-dom'

const SideNav = () => {
  const onClickMenu = (text) => {
    console.log(text)
  }

  const fnRecursive = (pIdx, routes) => {
    let arr = []
    let idx = 0
    routes.forEach(async (route) => {
      idx++
      arr.push(
        getItem(
          pIdx === '' ? idx : pIdx + '-' + idx,
          route.icon,
          route.children === null ? (
            <Link to={route.href} onClick={() => onClickMenu(route.title)}>
              {route.label}
            </Link>
          ) : (
            route.label
          ),
          route.children === null
            ? null
            : fnRecursive(pIdx + '-' + idx, route.children)
        )
      )
    })
    return arr
  }

  const items = fnRecursive('', navRoute)

  return (
    <>
      <Menu
        theme="light"
        mode="inline"
        items={items}
        style={{
          background: 'none',
          borderInlineEnd: 'none',
        }}
      />
    </>
  )
}
export default SideNav
