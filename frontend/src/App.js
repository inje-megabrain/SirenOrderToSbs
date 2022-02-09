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
    TextArea,
    Select
} from 'grommet';
import { Home } from 'grommet-icons';
import axios from 'axios';
import Menus from './Menus';
import menusTemplate from './menuDefault';
import React from 'react';

class App extends React.Component {

    // 주문 폼에 대한 객체
    orderForm = {
        size: 'tall',
        ice : 'ICE',
        count : 1,
        name : 'shonn',
        menuId : 1,
        menuName : ''
    };

    state = {
        isLoading: true,
        menus: menusTemplate,
        menuName : this.orderForm.menuName,
        count : this.orderForm.count,
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

    newOrder = async () => {
        await axios.post('/order', {
            itemId:this.orderForm.menuId,
            count:this.orderForm.count 
        })
        .then((response) => {
            alert("주문번호 : " + response.data + "번 주문 성공");
            console.log(response);
        })
        .catch((error) => console.log(error))
    };

    getItemIdBySelectedItem = (e) => {
        if(e.itemName === this.orderForm.menuName){
            return true;
        }
    };

    handleChangeItemCount = (e) => {
        console.log(e.target.value);
        this.orderForm.count = e.target.value;

        this.setState({
            count: this.orderForm.count
        });
        console.log(this.orderForm);
    }
    handleChangeItemName = (e) => {
        console.log(e.value);

        // 상품명, 상품ID 할당
        this.orderForm.menuName = e.value;
        this.orderForm.menuId = this.state.menus.filter(this.getItemIdBySelectedItem).at(0).id;
        
        this.setState({
            menuName: this.orderForm.menuName
        })
        console.log(this.orderForm);
        //console.log(this.state.menus.filter(this.getItemIdBySelectedItem));
    };

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({isLoading:false});
        // },6000);
        this.getMenus().then(r => console.log(r));
    }

    render() {
        const {isLoading, menus, menuName} = this.state;

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
                                    <Select
                                        className="menus"
                                        value={this.state.menuName}
                                        //placeholder=""
                                        onChange={this.handleChangeItemName}
                                        options={
                                             menus && menus.map((menu)=>(
                                                menu.itemName
                                        ))}
                                    />
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
                            <Paragraph>Count</Paragraph>
                            <input
                                type="number"
                                placeholder="type here"
                                value={ this.state.count }
                                onChange={this.handleChangeItemCount}
                            />
                        </Box>
                    </Box>
                    <br/>
                    <Box direction="row" gap="medium">
                        <Button type="submit" onClick={this.newOrder} primary label="Submit"/>
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