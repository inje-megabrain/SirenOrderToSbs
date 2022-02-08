import React, {useState, useEffect} from 'react';
import {
    Anchor,
    Button,
    Footer,
    Grommet,
    Header,
    Heading,
    Main,
    Menu,
    Paragraph,
    Text,
    Form,
    Box,
    RadioButtonGroup, Select, TextArea
} from 'grommet';
import { Home } from 'grommet-icons';
import axios from 'axios';

function App() {
    const [size, setSize] = useState('tall');
    const [ice, setIce] = useState('ICE');
    const [num, setNumber] = useState('1');
    const [name, setName] = useState('shonn');
    const [menu, setMenu] = useState('Cafe Latte');
    const [orderNumber, setorderNumber] = useState('');

    // server Check
    function checkServerStatus() {
        axios.get('/ping')
        .then((response) => console.log( response.data + "!" + " Server is survival"))
        .catch((error) => console.log("Server is dead " + error));
    }
    checkServerStatus();

    function getMenus() {
        axios.get('/item')
            .then(function (response) {
                // 성공했을 때
                console.log("connection success!" + response.data);

            })
            .catch(function (error) {
                // 에러가 났을 때
                console.log(error);
            })
            .finally(function () {
                // 항상 실행되는 함수
            });
    }

    function sendPost() {
        axios.post('/order', {
            itemId: '2',
            count: num
        })
            .then(function (response) {
                console.log(response)
            }).catch(function (error) {
                console.log(error)
        })
    }

    return (
        <Grommet theme={theme}>
            <Header background="neutral-3">
                <Button hoverIndicator icon={<Home />}/>
                <Menu label="account" items={[{ label: 'user' }, { label: 'admin'}]} />
            </Header>
            <Main pad="large">
                <Heading>Order Coffee ☕️</Heading>
                <Paragraph>SbsBucks</Paragraph>
                <Form
                    onChange={({ value }) => {console.log("Submit: ", value)}}
                    onSubmit={ sendPost }
                >
                        <Box
                            direction="row"
                            border={{ color: 'brand', size: 'small' }}
                            pad="medium"
                        >
                            <Box pad="medium">
                                <Paragraph>Menu</Paragraph>
                                <RadioButtonGroup
                                    name="doc"
                                    options={['Ice Americano', 'Cafe Latte', 'Cafe Mocha', 'Iced Tea']}
                                    value={menu}
                                    onChange={(event) => setMenu(event.target.value)}
                                />
                            </Box>
                            <Box pad="medium">
                                <Paragraph>ICE or HOT</Paragraph>
                            <Select
                                options={['ICE', 'HOT']}
                                value={ice}
                                onChange={({ option }) => setIce(option)}
                            />
                            </Box>
                            <Box pad="medium">
                                <Paragraph>Size</Paragraph>
                                <Select
                                    options={['tall', 'grande', 'venti']}
                                    value={size}
                                    onChange={({ option }) => setSize(option)}
                                />
                            </Box>
                            <Box pad="medium">
                                <Paragraph>Number</Paragraph>
                                <TextArea
                                    placeholder="type here"
                                    value={num}
                                    onChange={event => setNumber(event.target.value)}
                                />
                            </Box>
                        </Box>
                    <br />
                    <Box direction="row" gap="medium">
                        <Button type="submit" primary label="Submit" />
                    </Box>
                </Form>
            </Main>
            <Footer background="neutral-3" pad="medium">
                <Text>Copyright</Text>
                <Anchor label="About" />
            </Footer>
        </Grommet>
    );
}

export default App;

const theme = {
    global: {
        margin: '0px',
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px',
        },
    },
};