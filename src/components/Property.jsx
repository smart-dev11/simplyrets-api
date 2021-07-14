import React from 'react';
import moment from 'moment';
import { makeStyles, Typography, IconButton } from '@material-ui/core';
import { FavoriteBorderOutlined, Favorite } from '@material-ui/icons';
import { numberWithCommas } from '../utils/helper';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  propertyStr: {
    fontSize: 20,
    paddingTop: 16,
    '& span': {
      paddingLeft: 8,
      paddingRight: 8,
      borderRight: '2px solid #2D2D2D'
    },
    '& span:first-child': {
      paddingLeft: 0,
    },
    '& span:last-child': {
      paddingRight: 0,
      borderRight: 'none',
    }
  },
}));

const Property = ({ property, clickedList, handleClickProperty }) => {
  const classes = useStyles();
  const isClicked = clickedList[property.mlsId];
  const Icon = isClicked ? Favorite : FavoriteBorderOutlined;

  return (
    <div className={classes.container}>
      <div className={classes.imageWrapper}>
        <img src={property.photos[0]} alt={property.agreement} className={classes.image} />
        <IconButton className={classes.icon} onClick={() => handleClickProperty(property.mlsId)}>
          <Icon
            style={{ fontSize: 40, color: isClicked ? 'red' : 'white' }}
            data-testid={isClicked ? 'Favorite' : 'FavoriteOutlined'}
          />
        </IconButton>
      </div>
      <div className={classes.propertyStr}>
        <span>{`${property.property.bedrooms} BR`}</span>
        <span>{`${property.property.bathsFull + property.property.bathsHalf / 2} Bath`}</span>
        <span>{`${property.property.area} Sq Ft`}</span>
      </div>
      <Typography style={{ fontSize: 26, fontWeight: 'bold' }}>
        {`$${numberWithCommas(property.listPrice)}`}
      </Typography>
      <Typography style={{ fontSize: 15 }}>
        {property.address.full}
      </Typography>
      <Typography style={{ fontSize: 14, color: '#979797' }}>
        {`Listed: ${moment(property.listDate).format('MM/DD/YY')}`}
      </Typography>
    </div>
  )
}

// ToDo (Daniel):
// Check ProtoType of property or using typescript
export default Property;
