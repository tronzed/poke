import { Flex, Layout, Menu, Select } from 'antd'
import { Header } from 'antd/es/layout/layout'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom'
import { SearchOutlined } from '@ant-design/icons';

export default function HeaderLayout() {

  const [searchData, setSearchData] = useState([]);
  const navigate = useHistory();

  
  const fetchData = async () => {

    let baseURL = `https://pokeapi.co/api/v2/pokemon/?limit=1000`

    try {
      const res = await fetch(baseURL);
      const data = await res.json();

      data?.results?.map((item, index) =>
        setSearchData((prev) => [...prev, { value: item?.name, label: item?.name }])
      );

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const onSearch = (data) => {
    navigate.push(`/single/${data}`)
    navigate.go(0);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header style={{ height: 'unset', padding: '20px 30px' }}>
        <Layout style={{ maxWidth: '1170px', margin: "auto", backgroundColor: 'unset', padding: '0 10px' }}>
          <Flex justify="space-between">
            <Title level={3} style={{ margin: '0' }}>
              <NavLink style={{ color: '#fff' }} to={'/'}>PokeDex.</NavLink>
            </Title>
            <Menu theme="dark" style={{width:"180px",lineHeight:'30px'}} mode="horizontal">
              <Menu.Item>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/list">My Favorite</Link>
              </Menu.Item>
            </Menu>

            <Select
              showSearch={true}
              onChange={(value) => onSearch(value)}
              placeholder='Search Pokemon'
              style={{ width: '300px' }}
              // onSearch={false}
              options={searchData}
              suffixIcon={<SearchOutlined />}
            />
          </Flex>
        </Layout>
      </Header>
    </>
  )
}
