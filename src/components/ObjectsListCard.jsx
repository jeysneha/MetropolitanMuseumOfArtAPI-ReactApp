import React, {useState, useEffect} from 'react';
import axios from 'axios';
import noImage from '../img/download.jpeg';
import {Link} from 'react-router-dom';

import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardHeader
} from '@mui/material';
import '../App.css';

const ObjectsListCard = ({id}) => {
  const [objectData, setobjectData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const classes = useStyles();
  
 
  useEffect(() => {
    console.log('object useEffect fired');
    async function fetchData() {
       
      try {
        const {data: object} = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        );
        setobjectData(object);
        setLoading(false);
        
      } catch (e) {
        setError({ status: e.response.status, message: e.message });
        setLoading(false);
        //console.log(e.message);
      }
    }
    
    fetchData();
  }, [id]);
  if (error) {
    // Handle the error state and render an error message
    return (
      <div>
        <h1>Object {id} is Unavailable in the API</h1>
        <h2>Error: {error.status}</h2>
        <p>{error.message}</p>
      </div>
    );
  }
  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  }
  else{
    return(
      <Grid item xs={12} sm={7} md={5} lg={4} xl={3} key={id}>
        <Card
        variant='outlined'
        sx={{
          maxWidth: 550,
          height: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: 5,
          border: '1px solid #1e8678',
          boxShadow:
            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
        }}
      >
     
      <Link to={`/collection/${id}`}>
        <CardHeader
          title={objectData &&objectData.title?objectData.title:"N/A"}
          sx={{
            borderBottom: '1px solid #1e8678',
            '& .MuiTypography-root': {
            fontWeight: 'bold'}
          }}
        />
        <CardMedia
          component='img'
          sx={{
            height: '600px',
            objectFit: 'cover', 
            width: '100%', 
          }}
          image={
            objectData && objectData.primaryImage
              ? objectData.primaryImage
              : noImage
          }
          title='show image'
        />
        <CardContent>
          <Typography
            variant='body2'
            color='textSecondary'
            component='div'
            sx={{
              borderBottom: '1px solid #1e8678',
              fontWeight: 'bold'
            }}
          >
        <dl>
              <div>
                <dt className='title'>Artist Display Name:</dt>
                {objectData && objectData.artistDisplayName ? (
                  <dd>{objectData.artistDisplayName}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Object Date:</dt>
                {objectData && objectData.objectDate ? (
                  <dd>{objectData.objectDate}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Department:</dt>
                {objectData && objectData.department ? (
                  <dd>{objectData.department}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Medium:</dt>
                {objectData && objectData.medium ? (
                  <dd>{objectData.medium}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Accession Year:</dt>
                {objectData && objectData.accessionYear ? (
                  <dd>{objectData.accessionYear}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              </dl>
          </Typography>
          </CardContent>
          </Link>
        
    </Card>
    </Grid>

    )
  }
  
  
};

export default ObjectsListCard;
