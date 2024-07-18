import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card, Col, Divider, Layout, Row, Spin, Tag } from 'antd';
import { useParams } from 'react-router-dom';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';
import Title from 'antd/es/typography/Title';
import { HeartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom/cjs/react-router-dom';

export default function Single() {

    const [pokeData, setPokeData] = useState(null);
    const [pokeEvolutionData, setPokeEvolutionData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    // Get pokemon data
    const fetchPokeData = async () => {

        setLoading(false)

        let baseURL = `https://pokeapi.co/api/v2/pokemon/${id}`
        try {
            const res = await fetch(baseURL);
            const data = await res.json();
            setPokeData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Get pokemon data
    const fetchPokeEvolution = async () => {

        try {

            let evolutionIdData = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)

            let evolutionIdRes = await evolutionIdData.json();

            let evolutionId = evolutionIdRes?.evolution_chain.url;

            let baseURL = evolutionId

            const res = await fetch(baseURL);
            const data = await res.json();
            setPokeEvolutionData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    let EvolutionOne = pokeEvolutionData?.chain?.evolves_to[0]?.species?.name;

    let EvolutionTwo = pokeEvolutionData?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name;

    useEffect(() => {
        fetchPokeData()
        fetchPokeEvolution()
    }, [])

    return (
        <>
            <Spin spinning={loading} fullscreen size='large' />

            <HeaderLayout />
            <Layout style={{ padding: "30px 15px", minHeight: '90vh', maxWidth: '1170px', margin: "auto", backgroundColor: '#fff' }}>

                <Breadcrumb
                    style={{ marginBottom: '20px' }}
                    separator=">"
                    items={[
                        {
                            title: 'Home',
                            href: '/',
                        },
                        {
                            title: pokeData?.name,
                        },
                    ]}
                />

                {pokeData && (
                    <Row gutter={[24, 24]}>
                        <Col span="10">
                            <Card style={{ textAlign: 'center' }} >
                                <img style={{ maxWidth: "100%" }} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png`} alt="" />
                            </Card>
                        </Col>
                        <Col span="14">

                            <Title style={{ margin: '0 0 10px 0' }} level={1}>{pokeData.name} <Divider type="vertical" />
                                <Link to={`/create?id=${pokeData.id}&name=${pokeData.name}`}>
                                    <HeartOutlined style={{ fontSize: '25px' }} />
                                </Link>
                            </Title>

                            {EvolutionOne && (
                                <Title style={{ margin: 0 }} level={5}>
                                    Evolution:<br />
                                    <b>
                                        {EvolutionOne}
                                        {EvolutionTwo && (
                                            <>
                                                <Divider type="vertical" />
                                                {pokeEvolutionData?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name}
                                            </>
                                        )}
                                    </b>
                                </Title>
                            )}

                            <Title level={5} tyle={{ margin: 0 }}>Type: {
                                pokeData.types.map((data, index) => (
                                    <Tag key={index}>{data?.type?.name}</Tag>
                                ))
                            } </Title>
                            <Title style={{ margin: 0 }} level={5}>Height: {pokeData.height} <Divider type="vertical" /> Weight: {pokeData.weight}</Title>

                            <Divider />

                            <Title level={4} style={{ margin: 0 }}>
                                Abilities:<br /> {
                                    pokeData.abilities.map((data, index) => (
                                        <Tag key={index}>{data.ability.name}</Tag>
                                    ))
                                }
                            </Title>

                            <Divider />

                            <Title level={4} style={{ margin: 0 }}>Move:<br /> {
                                pokeData.moves.map((data, index) => (
                                    <Tag key={index}>{data?.move?.name}</Tag>
                                ))
                            } </Title>
                        </Col>
                    </Row>
                )}
            </Layout>
            <FooterLayout />

        </>
    )

}