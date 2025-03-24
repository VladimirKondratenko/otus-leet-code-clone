import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header, Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="/problems">
            <Link to="/problems">Задачи</Link>
          </Menu.Item>
          <Menu.Item key="/users">
            <Link to="/users">Пользователи</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '24px' }}>
        {children}
      </Content>
    </AntLayout>
  );
}; 