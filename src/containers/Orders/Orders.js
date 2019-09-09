import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component {

    state = {
        orders: null,
        loading: false
    }

    componentWillMount() {
        axios.get('/orders.json').then((res) => {
            let fetchedorders = [];
            for (let key in res.data) {
                fetchedorders.push({
                    ...res.data[key],
                    id: key
                });
            }

            this.setState({orders: fetchedorders, loading: false});
        }).catch(err => {
            this.setState({loading: false});
        });
    }

    render() {
        let ordersdata = [];
        if (this.state.orders) {
            
        for (let value of this.state.orders) {
            console.log(value);
            ordersdata.push(<Order key={value.id} 
                ingredients={value.ingredients} price={+value.totalprice}/>)
        }
        
    }
    
        return (
            <div>
                {ordersdata}
            </div>
        );
    }
}

export default Orders;