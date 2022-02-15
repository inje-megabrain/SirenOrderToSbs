import {Box, Button, RadioButtonGroup, Heading, Menu, Paragraph, Select, Grid} from "grommet";
import {Checkmark} from "grommet-icons";
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
        this.orderForm.menuId = e.target.value;
    }

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
                        value: menu.id
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
                            <RadioButtonGroup
                                label={this.orderForm.menuName}
                                options={options}
                                onChange={this.handleChangeItem}
                                name="Menus"/>
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
                <Button icon={<Checkmark />} type="submit" size = "large" onClick={this.newOrder} label="order now!"/>
            </>
        )
    };
}

export default Order;