import React from "react";
import { Layout, Menu } from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MyLayoutProps = {
  children: React.ReactNode;
};

function Mylayout(props: MyLayoutProps) {
  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth={0}>
        <Menu mode="inline">
          <Menu.Item key="1">
            <a href="/">Home</a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="records">Records</a>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>{props.children}</Content>
        <Footer style={{ textAlign: "center" }}>iHerb Scanner © 2022</Footer>
      </Layout>
    </Layout>
  );
}

export default Mylayout;
