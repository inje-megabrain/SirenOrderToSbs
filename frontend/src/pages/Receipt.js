import {Button, Card, CardBody, CardFooter, CardHeader, Heading, Grid} from "grommet";
import {Checkmark, Close} from "grommet-icons";
import React from "react";
import axios from "axios";
import ReceiptsTemplate from "../support/receiptDefault";
import { Paragraph } from "grommet";
import jwt from 'jwt-decode';

class Receipt extends React.Component {

    state = {
        receipts: ReceiptsTemplate,
    }

    getReceipts = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;
        const decoded = jwt(localStorage.getItem('jwtToken'));
        let URL;
        if (decoded.auth==='ROLE_ADMIN')
            URL = '/order';
        else
            URL = '/member/order';
        console.log(decoded.auth);
        await axios.get(URL)
            .then(({ data }) => {
                this.setState({
                    loading: true,
                    receipts: data
                });
                console.log('loaded data id is ' + data.orderId);
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

    acceptOrder = (orderId) =>{
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;
        axios.get('/order/'+orderId+'/accept')
            .then(({ data }) => {
                window.location.reload();
                console.log('order accepted');
                alert('order accepted');
            })
            .catch(e => {  // API 호출이 실패한 경우
                console.error(e);  // 에러표시
                this.setState({
                    loading: false
                });
            })
            .finally(e => {

            });
    }

    closeOrder = (orderId) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;
        axios.get('/order/'+orderId+'/cancel')
            .then(({ data }) => {
                window.location.reload();
                console.log('order canceled');
                alert('order canceled');
            })
            .catch(e => {  // API 호출이 실패한 경우
                console.error(e);  // 에러표시
                this.setState({
                    loading: false
                });
            })
            .finally(e => {

            });
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({isLoading:false});
        // },6000);
        this.getReceipts().then(r => console.log(r));
    }

    render() {
        const {isCanceled, receipts} = this.state;
        return (
            <>
            <Heading>Receipt 🧾</Heading>
            <Grid columns="small" gap="small">{
                receipts && receipts.map((receipt)=>(
                    <>
                    <Card
                          height="medium"
                          pad ="small"
                          width="large"
                          background="light-1"
                          key={receipt.orderId}
                    >
                        <CardBody height="small" pad="xsmall">
                            <Heading level="1" color={receipt.orderStatus !== 'ORDER'?'status-disabled':'status-ok'}>{receipt.orderStatus }</Heading>
                            {
                             receipt.orderItemDtos.map((order) => (
                                 <>
                                    <h2>
                                        {order.count} {order.ice} {order.size} {order.itemName}<br />
                                        ${order.orderPrice * order.count}<br/>
                                    </h2>
                                     { receipt.orderDate} <br />
                                 </>
                        )) }
                            <Paragraph fill ="true">{receipt.orderId }</Paragraph>
                        </CardBody>
                        <CardFooter background="light-1">
                            <Button
                                icon={<Close color="red" />}
                                hoverIndicator
                                disabled={receipt.orderStatus !== "ORDER"}
                                onClick={() => { this.closeOrder(receipt.orderId) }}
                            />
                            <Button
                                icon={<Checkmark color="green" />}
                                hoverIndicator
                                disabled={receipt.orderStatus !== "ORDER"}
                                onClick={() => { this.acceptOrder(receipt.orderId) }}
                            />
                        </CardFooter>
                    </Card>
                    </>
                ))
            }</Grid>
            </>
        )
    }
}

export default Receipt;