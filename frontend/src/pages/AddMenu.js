import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Form,
    Heading,
    Paragraph,
    Select,
    TextInput,
    Grid
} from "grommet";
import React, { useContext } from "react";
import axios from "axios";
import {Checkmark, Close} from "grommet-icons";

class AddMenu extends React.Component {

    // 주문 폼에 대한 객체
    menuFrom = {
        itemName: 'espresso',
        price : 3000,
        stockNumber : 999,
    };

    state = {
        isLoading: true,
        items: '',
        itemName: 'espresso',
        price : 3000,
        stockNumber : 999,
    };


    getMenuItems = async () => {
        await axios.get('/item')
            .then(({ data }) => {
                this.setState({
                    loading: true,
                    items: data
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
        await axios.post('/item/new', {
            itemName:this.menuFrom.itemName,
            price:this.menuFrom.price,
            stockNumber:this.menuFrom.stockNumber,
        })
            .then((response) => {
                alert("메뉴 아이템 : " + response.data.id + "번 추가 성공");
                window.location.reload();
                console.log(response);
            })
            .catch((error) => console.log(error))
    };

    handleChangeItemMenuName= (e) => {
        console.log(e.target.value);
        this.menuFrom.itemName = e.target.value;

        this.setState({
            itemName: this.menuFrom.itemName
        });
        console.log(this.menuFrom);
    }

    handleChangeItemPrice= (e) => {
        console.log(e.target.value);
        this.menuFrom.price = e.target.value;

        this.setState({
            price: this.menuFrom.price
        });
        console.log(this.price);
    }

    handleChangeItemStockNumber= (e) => {
        console.log(e.target.value);
        this.menuFrom.stockNumber = e.target.value;

        this.setState({
            stockNumber: this.menuFrom.stockNumber
        });
        console.log(this.stockNumber);
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({isLoading:false});
        // },6000);
        this.getMenuItems().then(r => console.log(r));
    }

    render() {
        const {isLoading, items} = this.state;
        return (
            <>
                <Heading>Insert Menu</Heading>
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
                            <TextInput
                                type="normal"
                                placeholder={ this.state.itemName }
                                onChange={this.handleChangeItemMenuName}
                            />
                        </Box>
                        <Box pad="medium">
                            <Paragraph>Price</Paragraph>
                            <TextInput
                                type="number"
                                placeholder={ this.state.price }
                                onChange={this.handleChangeItemPrice}
                            />
                        </Box>
                        <Box pad="medium">
                            <Paragraph>Stock Number</Paragraph>
                            <TextInput
                                type="number"
                                placeholder={ this.state.stockNumber }
                                onChange={this.handleChangeItemStockNumber}
                            />
                        </Box>
                    </Box>
                    <br/>
                    <Box direction="row" gap="medium">
                        <Button type="submit" onClick={this.newOrder} primary label="Submit"/>
                    </Box>
                    <br/>
                </Form>
                <Grid columns="small" gap="small">
                    {
                        items && items.map((item) => (
                            <Box background="neutral-3" round="small"
                                 key={item.id} pad="medium"
                            >
                                <h2>
                                    {item.id} : {item.itemName}
                                </h2>
                                <h3>
                                    price : ${item.price}<br/>
                                    stock : {item.stockNumber}
                                </h3>
                            </Box>
                        ))
                    }
                </Grid>
            </>
        )
    };
}

export default AddMenu;