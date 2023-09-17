import { Dropdown } from 'antd'
import logo from 'src/assets/images/logo.png'
import user from 'src/assets/images/user.png'
import { getItem } from 'src/utils/menu-item'

const HeaderNav = () => {
  const items = [
    getItem('profil', <i className="ri-user-line"></i>, 'Profil'),
    getItem('logout', <i className="ri-logout-circle-r-line"></i>, 'Logout'),
  ]
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <img src={logo} alt="app-logo" width={64} />
        <h1
          style={{
            textAlign: 'center',
            color: '#153131',
            marginTop: '0px',
            marginBottom: '0px',
          }}
        >
          YAYASAN RAHMATUL ASRI
        </h1>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <span>Admin AIS</span>
        <Dropdown menu={{ items }} trigger={['click']}>
          <img
            src={user}
            alt="user"
            style={{
              width: '32px',
              height: '32px',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '1px solid #00B96B',
              marginLeft: '12px',
            }}
          />
        </Dropdown>
      </div>
    </div>
  )
}
export default HeaderNav
