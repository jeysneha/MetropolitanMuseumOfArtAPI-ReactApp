import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams,useLocation} from 'react-router-dom';
import ObjectsListCard from './ObjectsListCard';
import SearchObjects from './SearchObjects';
import {Grid} from '@mui/material';
import { Button } from '@mui/material';


import '../App.css';

const ObjectsList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchData, setSearchData] = useState(undefined);
    const [objectsData, setObjectsData] = useState(undefined);
    const [searchTerm, setSearchTerm] = useState('');
    let cardsData = null;
    let totalpg;
    let previousPage
    let nextPage 
    const arr=[]
    let {page} = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const departmentIds = queryParams.get('departmentIds');
    const regex = /^[0-9]+$/;
     
    const searchValue = async (value) => {
      setSearchTerm(value);
    };
    useEffect(() => {
      
        
        async function fetchData() {
          console.log('on hey load useeffect');
          try {
            let url='https://collectionapi.metmuseum.org/public/collection/v1/objects'
            const {data:departmentsResponse} = await axios.get("https://collectionapi.metmuseum.org/public/collection/v1/departments")
            function  Check(department){
              return department.departmentId === Number(departmentIds)
            }
            if(departmentIds){
            if(departmentsResponse.departments.some(Check)){
                
                url+=`?departmentIds=${departmentIds}`   
              
              }
              else{
                if(Number(departmentIds)<1 || !regex.test(departmentIds)){
                  setError({ status:"400", message: "Deptid is invalid" });
                  setLoading(false);
                return;

                }
                setError({ status:"404", message: "Deptid is unavailable" });
                setLoading(false);

              }
            }
            const {data} = await axios.get(url);
            setObjectsData(data);
            setLoading(false);
            
          } catch (e) {
            
            setError({ status: e.response.status, message: e.message });
            setLoading(false);
            //console.log(e.message);
            //console.log(e);
          }
        }
        fetchData();

        
      }, [departmentIds]);

     
      useEffect(() => {
        
        
        async function fetchData() {
          
          try {
            console.log(`in fetch searchTerm: ${searchTerm}`);
            const {data} = await axios.get(
              'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + searchTerm
            );
            setSearchData(data);
            setLoading(false);
          } catch (e) {
            console.log(e);
            setError({ status: e.response.status, message: e.message });
            setLoading(false);
          }
        }
        if (searchTerm) {
          console.log('searchTerm is set');
          fetchData(); 
  
        }
      }, [searchTerm]);


      useEffect(() => {
        
        // Error handling and validation can be done here
        const regex = /^[0-9]+$/;
        
        if(!regex.test(page)){
          setError({ status:"400", message: "Page param is invalid" });
          setLoading(false);
          return
        }
        if( Number(page)<1 ){
          setError({ status:"400", message: "Page param is invalid" });
          setLoading(false); 
  
        }
                
        if(objectsData && !searchTerm)
        {
          if( Number(page)>(Math.floor(objectsData.total/50)+1)){
          setError({ status:"404", message: "Page does not contain any more events in the list" });
          setLoading(false);
          return;
            }
        }
        if( searchTerm && searchData && searchData.total===0){
          setError({ status:"404", message: `Oops! No search results for the search term provided!!!` });
          setLoading(false);
        return}
        if( searchTerm && searchData && Number(page)>(Math.floor(searchData.total/20)+1)){
          setError({ status:"404", message: `Page does not contain any more events from the search term provided, as your on page ${page} and the total no of results are ${searchData.total}. Make sure YOU ARE ALWAYS ON PAGE 1 WHEN YOU START, AS YOU CAN NAVIGATE TO THE OTHER PAGES EASILY FROM THERE. ALWAYS START TYPING INTO THE TEXT BOX FROM PAGE 1` });
          setLoading(false);
        return}
      
      }, [page,objectsData,searchTerm,searchData]);

  

      
      if (error) {
        // Handle the error state and render an error message
        
        return (
          <div>
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
       
        
        
         if(objectsData &&!searchTerm&& (Number(page)<=(Math.floor(objectsData.total/50)+1))){
          totalpg=Math.floor(objectsData.total/50)+1
          previousPage = Number(page) - 1;
          nextPage = Number(page) + 1;
            const start = (Number(page) - 1) * 50 + 1;
            let end
            if(Number(page)<=Math.floor(objectsData.total/50)){
            end = Number(page) * 50;  }
            else{
              end =(start+ (objectsData.total%50))-1; 
             }
  
            for(let i=start-1;i<end;i++)  {
              arr.push(objectsData.objectIDs[i])
              }
              console.log(arr)
            cardsData =
            arr &&arr.map((id) => {
              return <ObjectsListCard  key={id} id={id} />;
                  });

                }  
                
                  if(searchTerm &&searchData&&searchData.total){
                    totalpg=Math.floor(searchData.total/20)+1
                    previousPage = Number(page) - 1;
                    nextPage = Number(page) + 1;
                    const start = (Number(page) - 1) * 20 + 1;
                    let end
                    if(Number(page)<=Math.floor(searchData.total/20)){
                    end = Number(page) * 20;  }
                    else{
                      end =(start+ (searchData.total%20))-1; 
                     }
                  for(let i=start-1;i<end;i++)  {
                    arr.push(searchData.objectIDs[i])
                    }
                    console.log(arr)
                  cardsData =
                    arr &&
                    arr.map((id) => {
                      return <ObjectsListCard id={id} key={id} />;
                    });
                  }
                  

        return (
          <div> 
      <SearchObjects searchValue={searchValue} />
        <br />
        <br /> 
        <Grid
          container
          spacing={2}
          sx={{
            flexGrow: 1,
            flexDirection: 'row'
          }}
        >
        {cardsData}  
        </Grid>
        <br />
        <br />
        {previousPage >= 1 && !departmentIds && !searchTerm && (
    <Button 
        variant="contained" 
        sx={{ width: '150px', mr: 1 }}  
        component={Link}
        to={`/collection/page/${previousPage}`}
    >
        Previous
    </Button>
)} 
        {previousPage >= 1 && departmentIds && !searchTerm &&(
    <Button 
        variant="contained" 
        sx={{ width: '150px', mr: 1 }}  
        component={Link}
        to={`/collection/page/${previousPage}?departmentIds=${departmentIds}`}
    >
        Previous
    </Button>
)}
        {previousPage >= 1 && searchTerm &&(
    <Button 
        variant="contained" 
        sx={{ width: '150px', mr: 1 }}  
        component={Link}
        to={`/collection/page/${previousPage}`}
    >
        Previous
    </Button>
)}


{nextPage <= totalpg && !departmentIds && !searchTerm &&(
    <Button 
        variant="contained" 
        sx={{ width: '150px', ml: 1 }}  
        component={Link}
        to={`/collection/page/${nextPage}`}
    >    
        Next
    </Button>
)}
{nextPage <= totalpg && departmentIds && !searchTerm &&(
    <Button 
        variant="contained" 
        sx={{ width: '150px', ml: 1 }}  
        component={Link}
        to={`/collection/page/${nextPage}?departmentIds=${departmentIds}`}
    >    
        Next
    </Button>
)}
{nextPage <= totalpg && searchTerm &&(
    <Button 
        variant="contained" 
        sx={{ width: '150px', ml: 1 }}  
        component={Link}
        to={`/collection/page/${nextPage}`}
    >    
        Next
    </Button>
)}
         </div> 
        )
        }

      }
export default ObjectsList;
