import {Box, Button, Form, Heading, Menu, Paragraph, Select, Grid} from "grommet";
import React from "react";
import menusTemplate from "../support/menuDefault";
import axios from "axios";

class Order extends React.Component {

    // 주문 폼에 대한 객체
    orderForm = {
        size: 'tall',
        ice : 'ice',
        count : '1',
        name : 'shonn',
        menuId : '1',
        menuName : 'americano'
    };

    state = {
        isLoading: true,
        menus: '',
        ice : 'ice',
        size: 'tall',
        menuName : 'americano',
        count : '1',
    };

    getMenus = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;
        await axios.get('/item')
            .then(({ data }) => {
                this.setState({
                    loading: true,
                    menus: data
                });
            })
            .catch(e => {  // API 호출이 실패한 경우
                console.error(e);  // 에러표시
                this.setState({
                    loading: false
                });
            })
        this.setState({isLoading: false});
    };

    newOrder = async () => {
        if (this.orderForm.count > 0) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;
            await axios.post('/order', {
                itemId: this.orderForm.menuId,
                count: this.orderForm.count,
                ice: this.orderForm.ice,
                size: this.orderForm.size
            })
                .then((response) => {
                    alert("주문번호 : " + response.data + "번 주문 성공");
                    console.log(response);
                })
                .catch((error) => alert(error.response.data))
        }else{
            alert('count cannot be nagative');
        }
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

    handleChangeItemIce = (e) => {
        console.log(e.target.value);
        this.orderForm.ice = e.target.value;

        this.setState({
            ice: this.orderForm.ice
        });
        console.log(this.orderForm);
    }

    handleChangeItemSize = (e) => {
        console.log(e.target.value);
        this.orderForm.size = e.target.value;

        this.setState({
            size: this.orderForm.size
        });
        console.log(this.orderForm);
    }

    handleChangeItem = (e) => {
        console.log(e);
        e.label = this.orderForm.menuName;
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
        this.getMenus().then(r => console.log(r));
    }

    render() {
        const {isLoading, menus } = this.state;
        const options =
            menus && menus
                .filter(menu => menu.isSell === true)
                .map((menu) => (
                    {
                        label: menu.itemName,
                        onClick: () => {
                            this.orderForm.menuName = menu.itemName;
                            this.orderForm.menuId = menu.id;

                        }
                    }
                ))

        return (
            <>
                <Heading>Order Coffee ☕️</Heading>
                <Grid columns="small" gap="small">
                    <Box pad="medium">
                        <Paragraph>Menu</Paragraph>
                        {isLoading?(
                            <div className="loader">
                                <span className="loader__text">Loading...</span>
                            </div>
                        ):(
                            <Menu
                                label={this.orderForm.menuName}
                                items={options}
                                onChange={this.handleChangeItem}/>
                        )}
                    </Box>
                    <Box pad="medium">
                        <Paragraph>ice or hot</Paragraph>
                        <Select
                            options={['ice', 'hot']}
                            value={this.state.ice}
                            onChange={this.handleChangeItemIce}
                        />
                    </Box>
                    <Box pad="medium">
                        <Paragraph>Size</Paragraph>
                        <Select
                            options={['tall', 'grande', 'venti']}
                            value={this.state.size}
                            onChange={this.handleChangeItemSize}
                        />
                    </Box>
                    <Box pad="medium">
                        <Paragraph>Count</Paragraph>
                        <Select
                            options={['1', '2', '3', '4', '5', '6']}
                            value={this.state.count}
                            onChange={this.handleChangeItemCount}
                        />
                    </Box>
                </Grid>
                <br/>
                <Box direction="row" gap="medium">
                    <Button type="submit" onClick={this.newOrder} primary label="order now!"/>
                </Box>
            </>
        )
    };
}

export default Order;