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
import Menus from './Menus';
import menusTemplate from './menuDefault';

class App extends React.Component {

    state = {
        isLoading: true,
        menus: menusTemplate,
    };

    getMenus = async () => {

        await axios.get('/item')
            .then(({ data }) => {
                this.setState({
                    loading: true,
                    menus: data
                });
                console.log(data.id);
            })
            .catch(e => {  // API 호출이 실패한 경우
                console.error(e);  // 에러표시
                this.setState({
                    loading: false
                });
            })
            .finally(e => {

            });
        this.setState({isLoading: false});
    };

    componentDidMount() {
        //여기서 영화 데이터 로딩!
        // setTimeout(() => {
        //     this.setState({isLoading:false});
        // },6000);
        this.getMenus().then(r => console.log(r));
    }

    render() {
        const {isLoading, menus} = this.state;
        this.state = {
            size: 'tall',
            ice : 'ICE',
            num : '1',
            name : 'shonn',
            menu : 'Espresso' };

        return (
        <Grommet theme={theme}>
            <Header background="neutral-3">
                <Button hoverIndicator icon={<Home/>}/>
                <Menu label="account" items={[{label: 'user'}, {label: 'admin'}]}/>
            </Header>
            <Main pad="large">
                <Heading>Order Coffee ☕️</Heading>
                <Paragraph>SbsBucks</Paragraph>
                <Form
                    onChange={({value}) => {
                        console.log("Submit: ", value)
                    }}
                >
                    <Box
                        direction="row"
                        border={{color: 'brand', size: 'small'}}
                        pad="medium"
                    >
                        <Box pad="medium">
                            <Paragraph>Menu</Paragraph>
                            <section className="container">
                                {isLoading?(
                                    <div className="loader">
                                        <span className="loader__text">Loading...</span>
                                    </div>
                                ):(
                                    <div className="menus">
                                        {
                                            menus && menus.map((menu)=>(
                                            <Menus
                                                key={menu.id}
                                                id={menu.id}
                                                itemName={menu.itemName}
                                                price={menu.price}
                                                stockNumber={menu.stockNumber}/>
                                            ))
                                        }
                                    </div>
                                )}
                            </section>
                        </Box>
                        <Box pad="medium">
                            <Paragraph>ICE or HOT</Paragraph>
                            <Select
                                options={['ICE', 'HOT']}
                                value={this.ice}
                                onChange={({option}) => this.setState({ ice: option} )}
                            />
                        </Box>
                        <Box pad="medium">
                            <Paragraph>Size</Paragraph>
                            <Select
                                options={['tall', 'grande', 'venti']}
                                value={this.size}
                                onChange={({option}) => this.setState({ size: option} )}
                            />
                        </Box>
                        <Box pad="medium">
                            <Paragraph>Number</Paragraph>
                            <TextArea
                                placeholder="type here"
                                value={this.num}
                                onChange={({option}) => this.setState({ ice: option} )}
                            />
                        </Box>
                    </Box>
                    <br/>
                    <Box direction="row" gap="medium">
                        <Button type="submit" primary label="Submit"/>
                    </Box>
                </Form>
            </Main>
            <Footer background="neutral-3" pad="medium">
                <Text>Copyright</Text>
                <Anchor label="About"/>
            </Footer>
        </Grommet>
        )
    };
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