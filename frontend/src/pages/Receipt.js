import {Button, Card, CardBody, CardFooter, CardHeader, Heading} from "grommet";
import {Checkmark, Close} from "grommet-icons";
import React from "react";
import axios from "axios";
import ReceiptsTemplate from "../support/receiptDefault";
import { Paragraph } from "grommet";

class Receipt extends React.Component {

    state = {
        isLoading: true,
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

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({isLoading:false});
        // },6000);
        this.getReceipts().then(r => console.log(r));
    }

    render() {
        const {isLoading, receipts} = this.state;
        return (
            <>
            <Heading>Receipt 🧾</Heading>
            <Paragraph>{
                receipts && receipts.map((receipt)=>(
                    <>
                    <Card
                          height="medium"
                          pad ="small"
                          width="large"
                          background="light-1"
                    >
                        <CardHeader pad="small">Order number : <h1>{receipt.orderId }</h1></CardHeader>
                        <CardBody height="small" pad="small">
                            timestamp : { receipt.orderDate} <br /> order : {
                             receipt.orderItemDtos.map((order) => (
                                 order.count + ' ' + order.itemName + ', total $' + (order.orderPrice * order.count)
                        )) }</CardBody>
                        <CardFooter background="light-1">
                            <Button
                                icon={<Close color="red" />}
                                hoverIndicator
                            />
                            <Button
                                icon={<Checkmark color="green" />}
                                hoverIndicator
                            />
                        </CardFooter>
                    </Card>
                    <br />
                    </>
                ))
            }
            </Paragraph>
            </>
        )
    }
}

export default Receipt;