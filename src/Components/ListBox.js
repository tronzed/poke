import React, { useEffect, useState } from 'react'
import HeaderLayout from './HeaderLayout'
import { Button, Card, Col, Flex, Layout, Popconfirm, Row, Typography } from 'antd'
import FooterLayout from './FooterLayout'
import { Link } from 'react-router-dom/cjs/react-router-dom';

export default function ListBox() {

  const [blogData, setBlogData] = useState(null);
  const { Title } = Typography
  const { Paragraph } = Typography

  const fetchData = async () => {
    try {
      const res = await fetch('https://api.jsonbin.io/v3/b/669a7dd3acd3cb34a86862c2');
      const data = await res.json();
      setBlogData(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const deleteData = async (id) => {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/669a7dd3acd3cb34a86862c2/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        await fetchData();
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>

      <HeaderLayout />

      <Layout style={{ padding: "30px 15px", minHeight: '100vh', maxWidth: '1170px', margin: "auto", backgroundColor: '#fff' }}>

        <Flex style={{ marginBottom: '30px' }} justify='end' gap={'large'}>
          <Button><Link to={'/create'}>Add Favorite</Link></Button>
        </Flex>

        {console.log('blogData-->',blogData)}

        <Row gutter={[24, 24]}>
          {
            blogData?.record?.blogs?.map((data, index) => (
              <Col span={4}>
                <Card key={index} style={{ marginBottom: '10px' }}>
                  <img style={{ maxWidth: '100%' }} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.pokemon_id}.png`
                  } alt="Pokemon" />
                  <Row gutter={[24, 24]}>
                    <Col span={20}>
                      <Title style={{ margin: '0 0 10px 0' }} level={3}> <Link style={{color:'#000'}} to={`/edit/${data.id}`} > {data.name} </Link> </Title>
                      <Paragraph level={2}>{data.message}</Paragraph>
                      <Popconfirm
                        title="Delete"
                        description="Are you sure to delete this entry?"
                        onConfirm={() => deleteData(data.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button>Delete</Button>
                      </Popconfirm>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))
          }
        </Row>
      </Layout>
      <FooterLayout />
    </>
  )
}
