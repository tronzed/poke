import React, { useEffect, useState } from 'react';
import { Card, Col, Flex, Layout, Row, Select } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';
import Paragraph from 'antd/es/typography/Paragraph';
export default function Home() {

    const [pokeData, setPokeData] = useState(null);
    const [grid, setGrid] = useState(4);

    // Get pokemon data
    const fetchPokeData = async (value) => {

        let baseURL = `https://pokeapi.co/api/v2/pokemon/?limit=300`

        try {
            const res = await fetch(baseURL);
            const data = await res.json();
            setPokeData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // grid system
    const handleGrid = (value) => {
        setGrid(value);
    }

    // Fetching deta
    useEffect(() => {
        fetchPokeData()
    }, [])

    return (
        <>

            <HeaderLayout pokeData={pokeData} />
            
            <Layout style={{ padding: "30px 15px", minHeight: '100vh', maxWidth: '1170px', margin: "auto", backgroundColor: '#fff' }}>
               
                <Flex style={{ marginBottom: '30px' }} justify='end' gap={'large'}>
                    <Paragraph>The Pokédex is a comprehensive digital encyclopedia in the Pokémon world, providing detailed information about every known species of Pokémon. Each Pokémon entry includes various attributes and data points</Paragraph>
                    <Select
                        style={{ width: '100px' }}
                        placeholder="Grid"
                        onChange={(value) => handleGrid(value)}
                        options={[
                            { value: '4', label: '4' },
                            { value: '6', label: '6' },
                            { value: '8', label: '8' },
                        ]}
                    />
                </Flex>

                {pokeData && (
                    <Row gutter={[15, 15]}>
                        {
                            pokeData.results.map((data, index) => (
                                <Col key={index} span={grid}>
                                    <Card style={{ textAlign: 'center' }} hoverable>
                                        <Link to={`/single/${index + 1}`}>
                                            <img style={{ maxWidth: "100%" }} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`} alt="" />
                                            <Meta title={data.name} />
                                        </Link>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                )}
            </Layout>

            <FooterLayout />

        </>
    )
}