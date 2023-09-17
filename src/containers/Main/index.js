import { Breadcrumb, Layout } from 'antd'
import { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import MainRouter from 'src/routes/MainRouter'
import SideNav from 'src/components/SideNav'
import HeaderNav from 'src/components/HeaderNav'
import favicon from 'src/assets/images/logo.png'
import breadCrumbItem from 'src/utils/breadcrumb'

const Main = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const { Sider, Header, Content, Footer } = Layout

  const path = location.pathname
  const bIdx = breadCrumbItem.findIndex((x) => x.route === path)
  const itemCrumb = breadCrumbItem[bIdx].items

  return (
    <Fragment>
      <Helmet>
        <title>Dashboard | Yayasan Rahmatul Asri</title>
        <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
      </Helmet>
      <div className="main">
        <Header
          style={{
            paddingInline: '12px',
            background: 'none',
            borderBottom: '1px solid #00B96B',
            position: 'fixed',
            width: '100%',
          }}
        >
          <HeaderNav />
        </Header>
        <Layout style={{ background: 'none' }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{
              overflow: 'auto',
              height: 'calc(100vh - 110px)',
              position: 'fixed',
              left: 0,
              top: '64px',
              bottom: 0,
              background: '#00B96B22',
              borderInlineEnd: '1px solid #00B96B',
            }}
            width={260}
            trigger={
              <div style={{ background: '#00B96B', color: '#dfdfdf' }}>
                {collapsed ? (
                  <i className="ri-arrow-right-s-line"></i>
                ) : (
                  <i className="ri-arrow-left-s-line"></i>
                )}
              </div>
            }
          >
            <SideNav collapsed={collapsed} />
          </Sider>
          <Layout
            style={{
              marginLeft: collapsed ? '80px' : '260px',
              transition: 'all 0.2s',
              marginTop: '64px',
              background: 'none',
            }}
          >
            <Content
              style={{
                background: 'none',
                paddingInline: '24px',
                minHeight: 'calc(100vh - 105px)',
              }}
            >
              <Breadcrumb items={itemCrumb} style={{ marginBlock: 12 }} />
              <MainRouter />
            </Content>
            <Footer
              style={{
                background: 'none',
                textAlign: 'right',
                padding: '12px',
              }}
            >
              Cooked By: binaries.id
            </Footer>
          </Layout>
        </Layout>
      </div>
    </Fragment>
  )
}

export default Main
