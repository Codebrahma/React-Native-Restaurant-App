import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Colors from '../../src/constants/colors';
import { PrimaryText } from './sharedComponents';

const styles = {
  card: {
    width: '100%',
    height: '250px',
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  container: {
    width: '25vw',
    margin: '2%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  heading: {
    textAlign: 'center',
    color: Colors.primaryColor,
  },
};

const RestaurantItem = ({
  image, name, onClick, classes,
}) => {
  const source = image || '../../assets/images/placeholder-res.png';
  return (
    <div style={styles.container}>
      <Card className={classes.card} onClick={onClick}>
        <CardMedia image={source} className={classes.image} />
        <Typography gutterBottom variant="subheading" component="h2" className={classes.heading}>
          {name}
        </Typography>
      </Card>
    </div>
  );
};

RestaurantItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
};

RestaurantItem.defaultProps = {
  image: null,
};

export default withStyles(styles)(RestaurantItem);
