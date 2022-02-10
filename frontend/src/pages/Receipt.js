import {Button, Card, CardBody, CardFooter, CardHeader, Heading, Grid} from "grommet";
import {Checkmark, Close} from "grommet-icons";
import React from "react";
import axios from "axios";
import ReceiptsTemplate from "../support/receiptDefault";
import { Paragraph } from "grommet";

class Receipt extends React.Component {

    state = {
        receipts: ReceiptsTemplate,
    }

    getReceipts = async () => {
        await axios.get('/order')
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
                        <CardHeader pad="small"> <h1>{receipt.orderStatus} {receipt.orderId }</h1></CardHeader>
                        <CardBody height="small" pad="small">
                            {
                             receipt.orderItemDtos.map((order) => (
                                 <>
                                    <h2>
                                        {order.count} {order.ice} {order.size} {order.itemName}<br />
                                        ${order.orderPrice * order.count}<br/>
                                    </h2>
                                     { receipt.orderDate} <br />
                                 </>
                        )) }</CardBody>
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