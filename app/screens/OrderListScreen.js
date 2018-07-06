import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { fetchOrders } from '../../src/actions';
import colors from '../../src/constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    padding: '1%',
    margin: '1%',
    elevation: 2,
    backgroundColor: colors.white,
  },
  divider: {
    margin: '1%',
  },
  heading: {
    color: colors.primaryColor,
    fontSize: 16,
  },
  item: {
    color: colors.blue,
    fontSize: 16,
  },
});

class OrdersList extends React.Component {
  componentWillMount() {
    this.props.fetchOrders();
  }
  mapItems = items => items.map(item => (
    <View>
      <Text>{`OrderId: ${item.id}`}</Text>
      <Text>{`Price: Rs. ${item.price}`}</Text>
    </View>
  ))
  renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.divider}>
        <Text style={styles.heading}>Order Id</Text>
        <Text>{item._id}</Text>
      </View>
      <View style={styles.divider}>
        <Text style={styles.heading}>Total Price:</Text>
        <Text>{`Rs. ${item.totalCost}`}</Text>
      </View>
      <View style={styles.divider}>
        <Text style={styles.item}>Items ordered</Text>
        {item.items.map(this.mapItems)}
      </View>
    </View>
  )
  render() {
    if (this.props.ordersList === null) {
      return (<Text>Nothing found</Text>);
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.ordersList.orders}
          renderItem={this.renderItem}
        />

      </View>
    );
  }
}

OrdersList.propTypes = {
  ordersList: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  fetchOrders: PropTypes.func.isRequired,
};

const mapStateToProps = ({ orders }) => ({ ordersList: orders.ordersList });

export default connect(mapStateToProps, { fetchOrders })(OrdersList);
