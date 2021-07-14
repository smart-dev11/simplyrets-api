import React, { useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import Property from '../components/Property';
import { API_URL, PROPERTIES_KEY, CLICKED_ID_LIST } from '../utils/constant';
import useStateWithLocalStorage from '../utils/customHooks';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    overflowX: 'hidden',
    padding: '20px 40px 40px',
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      padding: '20px 0',
    }
  }
}))

const PropertiesList = () => {
  const classes = useStyles();
  const [propertiesList, setPropertiesList] = useStateWithLocalStorage([], PROPERTIES_KEY);
  const [clickedList, setClickedList] = useStateWithLocalStorage({}, CLICKED_ID_LIST);

  const loadResource = async () => {
    const properties = await fetch(API_URL, {
      headers: new Headers({
        Authorization: 'Basic ' + btoa('simplyrets:simplyrets'),
      })
    }).then(res => res.json());

    setPropertiesList(properties);
  };

  useEffect(() => {
    loadResource();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickProperty = (mlsId) => {
    clickedList[mlsId] = !clickedList[mlsId];
    setClickedList({...clickedList});
  };

  return (
    <>
      <Header />
      <Grid container spacing={4} className={classes.container}>
        {propertiesList.map(property => (
          <Grid item sm={4} xs={12} key={property.mlsId} data-testid="property">
            <Property property={property} clickedList={clickedList} handleClickProperty={handleClickProperty} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default PropertiesList;
