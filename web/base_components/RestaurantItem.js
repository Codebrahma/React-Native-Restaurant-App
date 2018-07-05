import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Colors from '../../src/constants/colors';
import { PrimaryText } from './sharedComponents';

const Container = styled.div`
  display: flex;
  width: 25%;
  height: 250px;
  background-color: ${Colors.lightGrey};
  margin: 1%;
  justify-content: space-between;
  align-items: center;
`;

const CuisineDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2%;
`;

const styles = {
  card: {
    width: '100%',
    height: '250px',
  },
  image: {
    width: '100%',
    height: '85%',
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
};

RestaurantItem.defaultProps = {
  image: null,
};

export default withStyles(styles)(RestaurantItem);
