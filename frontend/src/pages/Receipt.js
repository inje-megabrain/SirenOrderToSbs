import {Heading} from "grommet";
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
                console.log(data.orderId);
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
                    <Paragraph>id : { receipt.orderId }<br/>
                        date : { receipt.orderDate }<br />
                        order : { receipt.orderItemDtos.map((order) => (
                            order.itemName + ', ' + order.count + ', ' + order.orderPrice
                        )) }</Paragraph>
            ))
            }
            </Paragraph>
            </>
        )
    }
}

export default Receipt;