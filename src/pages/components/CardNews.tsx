import "./CardNews.scss"
import {useState,useEffect} from 'react';
import  axios from 'axios'
import dateFormat from "dateformat";
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import {Search,SearchIconWrapper,StyledInputBase,Item} from "./SearchInput/SearchInput"

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import {Link} from "react-router-dom";




export const CardNews = () => {

    interface Inews  {
        featured: Boolean
        id: number
        imageUrl: "string"
        newsSite: "string"
        publishedAt: "string"
        summary: "string"
        title: "string"
        url: "string"
      }
    const  [globalArrOfData,setGlobalArrOfData] = useState<Inews[]>()
 

    useEffect(()=>{
         // Make a request for a user with a given ID
         axios.get('https://api.spaceflightnewsapi.net/v3/articles?_limit=100')
         .then(function (response:any) {
             // handle success
             setGlobalArrOfData(response.data)
              
         
         })
         .catch(function (error:any) {
             // handle error
             console.log(error);
         })
         .then(function () {
             // always executed
         });
    },[])

 const  [inputText,setInputText] = useState<string>("")
 let globalArrOfDataFiltered = globalArrOfData?.filter((el)=>{
    return el.title.includes(" "+inputText+" ")
})


if(globalArrOfData && !inputText){  //lilte bit optimizating in case of imput Text is empty don't filtering
//Filter Elements    
    globalArrOfDataFiltered= globalArrOfDataFiltered?.concat(globalArrOfData.filter((el)=>el.summary.includes(inputText)))
   
    ///Delete Uniq elements
    globalArrOfDataFiltered?.forEach((elX,indexX)=>{
        globalArrOfDataFiltered?.forEach((el,index)=>{
          if(elX.id===el.id){
              if(indexX !== index){globalArrOfDataFiltered?.splice(indexX,1)}
          }  
        })
      })
}


     return (
       <div>
           
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={0.5}>
         
        </Grid>
        <Grid item xs={11.0}>

        <div className="filter-label monts-600"> Filter by keywords</div>
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onChange={(e)=>{setInputText(e.target.value)}}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>  
      
 
        <div className="results monts-600"> Results: {globalArrOfDataFiltered?globalArrOfDataFiltered.length:null}</div>

        <div className="containerCards">
            {globalArrOfDataFiltered? globalArrOfDataFiltered.map((el,index)=>
          
                <div className="cardNews" key={el.id  || index}> 
                    <div className="imgCard"><img src={el.imageUrl} alt={"logo"} className="imgCard"/> </div>       
                    <div className="dates monts" >{dateFormat(el.publishedAt, "mmmm dS, yyyy")}</div>
                    <div className="title monts" >{el.title.split(' ').map((e)=>{return(e===inputText)?(<span className="highlight"> {e}</span>):<span>{" "+e}</span>}).slice(0,30)}</div>
                    <div className="small-content monts" >{el.summary.split(' ').map((e)=>{return(e===inputText)?(<span className="highlight"> {e}</span>):<span>{" "+e}</span>}).slice(0,30)}</div>
                    <Link to={`/solo/${el.id}`}><a href={`${el.url}`} className="arrow monts-600-bold" >Read More <img src={require('./arrow.png')}  className="imgArrow"/> </a> </Link>
                </div>
            ):null}         
        </div>

        
        </Grid>
        <Grid item xs={0.4}>
         
          </Grid>
      </Grid>
    </Box>
    
        </div>
    )
}
