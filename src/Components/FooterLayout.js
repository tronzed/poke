import { Flex } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import Title from 'antd/es/typography/Title'
import React from 'react'

export default function FooterLayout() {
    return (
        <>
            <Footer style={{ padding: "10px 0" }}>
                <Flex justify="center">
                    <Title level={5} style={{ margin: '0', color: '#414141' }}>© PokeDex Copyright</Title>
                </Flex>
            </Footer>
        </>
    )
}
