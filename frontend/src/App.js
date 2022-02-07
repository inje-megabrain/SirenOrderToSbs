import React {useState, useEffect} from 'react';
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

function App() {
    const [size, setSize] = useState('tall');
    const [ice, setIce] = useState('ICE');
    const [num, setNumber] = useState('1');
    const [name, setName] = useState('shonn');
    const [menu, setMenu] = useState('Cafe Latte');
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Ordered: ${name}, ${num} ${size} size ${ice} ${menu}`);
    };
    useEffect(() => {
        fetch('/api/hello')
            .then(response => response.text())
            .then(message => {
                setMenu(message);
            });
    },[])

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
                    onSubmit={handleSubmit}
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