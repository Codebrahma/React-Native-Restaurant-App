import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import Colors from '../../src/constants/colors';
import { PrimaryText } from './sharedComponents';

const styles = {
  card: {
    width: '25%',
    margin: '1%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  title: {
    '&title': {
      color: 'red',
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  actionText: {
    color: Colors.blue,
  },
  price: {
    color: Colors.moneyColor,
  },
};

const FoodItem = ({
  image, item, onClick, classes,
}) => {
  const source = image || '../../assets/images/placeholder-food.png';
  return (
    <Card className={classes.card}>
      <CardHeader
        title={<div style={{ color: Colors.blue }}>{item.food.name}</div>}
        subheader={<div style={{ color: Colors.secondaryColor }}>{item.food.type}</div>}
        className={classes.title}
      />
      <CardMedia
        image={source}
        className={classes.media}
      />
      <CardContent>
        <Typography component="h1" className={classes.price}>{`Rs. ${item.price}`}</Typography>
      </CardContent>
      <CardActions className={classes.actions} onClick={onClick}>
        <Typography component="h2" className={classes.actionText}>Add to cart</Typography>
      </CardActions>
    </Card>
  );
};

FoodItem.propTypes = {
  image: PropTypes.string,
  item: PropTypes.instanceOf(Object).isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
};

FoodItem.defaultProps = {
  image: null,
};

export default withStyles(styles)(FoodItem);

