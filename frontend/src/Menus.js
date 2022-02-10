import React from 'react';
import PropTypes from 'prop-types';

function Menus({id, itemName, price, stockNumber}){
    return <option key = {id} value = {id}> {itemName} </option>
}

Menus.propTypes ={
    id:PropTypes.number.isRequired,
    itemName:PropTypes.string.isRequired,
    price:PropTypes.number.isRequired,
    stockNumber:PropTypes.number.isRequired
};

export default Menus;