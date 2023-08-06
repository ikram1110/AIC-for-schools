import { Layout } from "antd";
import { Fragment, useState } from "react";
import { Helmet } from "react-helmet-async";
import MainRouter from "../../routes/MainRouter";
import SideNav from "../../components/SideNav";
import HeaderNav from "../../components/HeaderNav";

const Main = () => {
  const [header, setHeader] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const { Sider, Header, Content, Footer } = Layout;

  return (
    <Fragment>
      <Helmet>
        <title>Dashboard | AIS for Schools</title>
      </Helmet>
      <div className="main">
        <Header
          style={{
            paddingInline: "12px",
            background: "none",
            borderBottom: "1px solid #00B96B",
            position: "fixed",
            width: "100%",
          }}
        >
          <HeaderNav />
        </Header>
        <Layout style={{ background: "none" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{
              overflow: "auto",
              height: "calc(100vh - 110px)",
              position: "fixed",
              left: 0,
              top: "64px",
              bottom: 0,
              background: "none",
            }}
            width={260}
            trigger={
              <div style={{ background: "#00B96B", color: "#dfdfdf" }}>
                {collapsed ? (
                  <i className="ri-arrow-right-s-line"></i>
                ) : (
                  <i className="ri-arrow-left-s-line"></i>
                )}
              </div>
            }
          >
            <SideNav collapsed={collapsed} setHeader={setHeader} />
          </Sider>
          <Layout
            style={{
              marginLeft: collapsed ? "80px" : "260px",
              transition: "all 0.2s",
              marginTop: "64px",
              background: "none",
            }}
          >
            <Content
              style={{
                background: "none",
                paddingInline: "24px",
                minHeight: "calc(100vh - 105px)",
              }}
            >
              <h1>{header}</h1>
              <MainRouter />
            </Content>
            <Footer
              style={{
                background: "none",
                textAlign: "right",
                padding: "12px",
              }}
            >
              Cooked By: binaries.id
            </Footer>
          </Layout>
        </Layout>
      </div>
    </Fragment>
  );
};

export default Main;
