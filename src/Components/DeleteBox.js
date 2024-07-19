import React from 'react'
import HeaderLayout from './HeaderLayout'
import FooterLayout from './FooterLayout'
import { Button, Form, Input, Layout } from 'antd'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

export default function CreateBox() {

    const { TextArea } = Input;

    const navigate = useHistory();

    const onFinish = (value) => {

        fetch('https://api.jsonbin.io/v3/b/669a7dd3acd3cb34a86862c2', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(value)

        }).then(() => {

            navigate.push('/')

            console.log('done here')
        })


    }


    return (
        <>

            <HeaderLayout />

            <Layout style={{ padding: "30px 15px", minHeight: '100vh', maxWidth: '1170px', margin: "auto", backgroundColor: '#fff' }}>

                <Form onFinish={onFinish} layout='vertical' style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>

                    <Form.Item name="name" label="Title">
                        <Input block type='large' placeholder="Enter Title Here" />
                    </Form.Item>

                    <Form.Item name="message" label="Message">
                        <TextArea type='large' placeholder="Enter Message Here" />
                    </Form.Item>

                    <Button htmlType='submit'>Submit</Button>

                </Form>



            </Layout>

            <FooterLayout />

        </>
    )
}
