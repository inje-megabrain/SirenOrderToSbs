import React from 'react';
import PropTypes from 'prop-types';
import {Box, Paragraph} from "grommet";

function Menus({key, id, itemName, price, stockNumber}){
    return <Box
        direction="row"
        border={{color: 'brand', size: 'small'}}
        pad="medium"
        >
        <Box pad="medium">
            <Paragraph margin="none">
                {itemName}, <br />
                ${price},
                {stockNumber}
            </Paragraph>
        </Box>
    </Box>;
}
Menus.propTypes ={
    id:PropTypes.number.isRequired,
    itemName:PropTypes.string.isRequired,
    price:PropTypes.number.isRequired,
    stockNumber:PropTypes.number.isRequired
};

export default Menus;