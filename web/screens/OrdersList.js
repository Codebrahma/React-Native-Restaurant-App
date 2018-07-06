import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import colors from '../../src/constants/colors';

const styles = {
  card: {
    width: '60vw',
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    display: 'flex',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: colors.blue,
    fontWeight: 'bold',
  },
  orderHeading: {
    marginTop: '1%',
    color: colors.primaryColor,
    fontWeight: 'bold',
  },
};

class OrdersList extends React.Component {
   mapItems = items => items.map(item => (
     <CardContent key={item}>
       <div>
         <Typography>{`ItemId: ${item.id}`}</Typography>
         <Typography>{`Rs. ${item.price}`}</Typography>
       </div>
     </CardContent>
   ))

  showAllOrders = () => {
    const { orders } = this.props.ordersList;
    return orders.map(order => (
      <ListItem key={order}>
        <Card style={styles.card}>
          <CardContent>
            <Typography component="h1" style={styles.orderHeading}>
              Order Id:
            </Typography>
            <Typography component="h2">
              {order._id}
            </Typography>
            <Typography component="h1" style={styles.orderHeading}>
            Total Price:
            </Typography>
            <Typography component="h2">
              {`Rs. ${order.totalCost}`}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography style={styles.heading} component="h1">Items Ordered: </Typography>
          </CardContent>
          {(order.items).map(this.mapItems)}
        </Card>
      </ListItem>
    ));
  }
  render() {
    return (
      <div style={styles.list}>
        <List>
          {this.showAllOrders()}
        </List>
      </div>
    );
  }
}

OrdersList.propTypes = {
  orders: PropTypes.instanceOf(Object).isRequired,
  ordersList: PropTypes.arrayOf(React.PropTypes.Object).isRequired,
};

const mapStateToProps = ({ orders }) => ({ ordersList: orders.ordersList });
export default connect(mapStateToProps, {})(withStyles(styles)(OrdersList));
