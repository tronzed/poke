import React, { useEffect, useState, useCallback } from 'react';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';
import { Button, Card, Col, Flex, Form, Input, Layout, Row, Select } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import pokeball from '../image/pokeball.png';
import queryString from 'query-string';

export default function CreateBox() {


    const API_KEY = 'YOUR_API_KEY';

    const headers = {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY
      };


    const { TextArea } = Input;

    const navigate = useHistory();
    const location = useLocation();
    const [form] = Form.useForm();
    const { id, name } = queryString.parse(location.search);

    const [pokemonOption, setPokemonOption] = useState([]);
    const [pokemonImg, setPokemonImg] = useState(null);

    const fetchPokemonName = useCallback(async () => {
        try {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=500');
            const data = await res.json();
            console.log(data);

            setPokemonOption(data.results.map((item, index) => ({ value: index + 1, label: item.name })));
        } catch (error) {
            console.log(error);
        }
    }, []);

    const fetchFavPokemon = useCallback(() => {
        setPokemonImg(id);
        console.log(name, id);
        form.setFieldsValue({ "pokemon_id": parseInt(id) });
    }, [id, name, form]);

    const imageUrl = (value) => {
        setPokemonImg(value);
    }

    const onFinish = (value) => {
        fetch('http://localhost:3000/blogs/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(value)
        }).then(() => {
            navigate.push('/list');
            console.log('done here');
        });
    }

    useEffect(() => {
        fetchFavPokemon();
        fetchPokemonName();
    }, [fetchFavPokemon, fetchPokemonName]);

    return (
        <>
            <HeaderLayout />
            <Layout style={{ padding: "30px 15px", minHeight: '100vh', maxWidth: '1170px', margin: "auto", backgroundColor: '#fff' }}>
                <Form form={form} onFinish={onFinish} layout='vertical' style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
                    <Row gutter={[24, 24]}>
                        <Col span={10}>
                            <Card style={{ height: '300px' }}>
                                <Flex justify='center'>
                                    <img style={{ maxWidth: '100%' }} src={
                                        !pokemonImg ? pokeball : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonImg}.png`
                                    } alt="Pokemon" />
                                </Flex>
                            </Card>
                        </Col>
                        <Col span={14}>
                            <Form.Item name="pokemon_id" label="Pokemon Name">
                                <Select
                                    placeholder={'Select Pokemon'}
                                    style={{ width: '100%' }}
                                    options={pokemonOption}
                                    onChange={(value) => imageUrl(value)}
                                />
                            </Form.Item>
                            <Form.Item name="name" label="Title">
                                <Input block type='large' placeholder="Enter Title Here" />
                            </Form.Item>
                            <Form.Item name="message" label="Message">
                                <TextArea rows={4} type='large' placeholder="Enter Message Here" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Flex justify='end' gap={'small'}>
                        <Button><Link to="/list">Cancel</Link></Button>
                        <Button htmlType='submit'>Submit</Button>
                    </Flex>
                </Form>
            </Layout>
            <FooterLayout />
        </>
    );
}
