import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import noImage from '../img/download.jpeg';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader
} from '@mui/material';
import '../App.css';

const Object = () => {
  const [objectData, setobjectData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const classes = useStyles();
  let {id} = useParams();
 
  useEffect(() => {
    console.log('OBJECT useEffect fired');
    const regex = /^[0-9]+$/;
    async function fetchData() {
      
      try {
        const {data: object} = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        );
        setobjectData(object);
        setLoading(false);
        
      } catch (e) {
        setError({ status: e.response.status, message: e.message });
        setLoading(false);}
        //console.log(e.message);
    }

    if(Number(id)<1 ){
      setError({ status:"400", message: "ID param is invalid" });
      setLoading(false);
      return

    } 
    if(!regex.test(id)){
      setError({ status:"400", message: "ID param is invalid" });
      setLoading(false);
      return
    }  

  
    fetchData();
  }, [id]);
 
  if (error) {
    // Handle the error state and render an error message
    return (
      <div>
        <h2>Error {error.status}</h2>
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
                <dt className='title'>Artist Display Bio:</dt>
                {objectData && objectData.artistDisplayBio ? (
                  <dd>{objectData.artistDisplayBio}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Artist Gender:</dt>
                {objectData && objectData.artistGender ? (
                  <dd>{objectData.artistGender}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Artist Role:</dt>
                {objectData && objectData.artistRole ? (
                  <dd>{objectData.artistRole}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Artist Prefix:</dt>
                {objectData && objectData.artistPrefix ? (
                  <dd>{objectData.artistPrefix}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Artist Suffix:</dt>
                {objectData && objectData.artistSuffix ? (
                  <dd>{objectData.artistSuffix}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Artist AlphaSort:</dt>
                {objectData && objectData.artistAlphaSort ? (
                  <dd>{objectData.artistAlphaSort}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Artist Nationality:</dt>
                {objectData && objectData.artistNationality ? (
                  <dd>{objectData.artistNationality}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Artist Wikidata_URL:</dt>
                {objectData && objectData.artistWikidata_URL ? (
                  <dd>
                     <a href={objectData.artistWikidata_URL} target="_blank" rel="noopener noreferrer" className="linko" >
                    {objectData.artistWikidata_URL}
                    </a>
                    </dd>
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
                <dt className='title'>Classification:</dt>
                {objectData && objectData.classification ? (
                  <dd>{objectData.classification}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Culture:</dt>
                {objectData && objectData.culture ? (
                  <dd>{objectData.culture}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Dimensions:</dt>
                {objectData && objectData.dimensions ? (
                  <dd>{objectData.dimensions}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Period:</dt>
                {objectData && objectData.period ? (
                  <dd>{objectData.period}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Accession Number:</dt>
                {objectData && objectData.accessionNumber ? (
                  <dd>{objectData.accessionNumber}</dd>
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
              <div>
                <dt className='title'>Dynasty:</dt>
                {objectData && objectData.dynasty ? (
                  <dd>{objectData.dynasty}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Reign:</dt>
                {objectData && objectData.reign ? (
                  <dd>{objectData.reign}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              <div>
                <dt className='title'>Portfolio:</dt>
                {objectData && objectData.portfolio ? (
                  <dd>{objectData.portfolio}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </div>
              </dl>
              </Typography>  
          </CardContent>
    </Card>

    )
  }
  
  
};

export default Object;
