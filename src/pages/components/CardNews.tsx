import "./CardNews.scss"
import React,{useState,useEffect} from 'react';
import  axios from 'axios'
import dateFormat from "dateformat";
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import {Search,SearchIconWrapper,StyledInputBase} from "./SearchInput/SearchInput"


import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


export const CardNews = () => {
    
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  
    interface Inews  {
        featured: Boolean
        id: Number
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
             console.log(response.data);
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


if(globalArrOfData){
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




console.log(globalArrOfDataFiltered);

     return (
       <div>
        
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={0.5}>
         
        </Grid>
        <Grid item xs={11.0}>

        <div className="filter-label monts"> Filter by keywords</div>
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
      
 
        <div className="results monts"> Results: {globalArrOfDataFiltered?globalArrOfDataFiltered.length:null}</div>

        <div className="containerCards">
            {globalArrOfDataFiltered?globalArrOfDataFiltered.map((el,index)=>
            <div className="cardNews" key={index}> 
            <div className="imgCard"><img src={el.imageUrl} alt={"logo"} className="imgCard"/> </div>       
            <div className="dates">{dateFormat(el.publishedAt, "mmmm dS, yyyy")}</div>
            <div className="title monts">{el.title.split(' ').map((e)=>{return(e===inputText)?(<span className="highlight"> {e}</span>):<span>{" "+e}</span>})}</div>
            <div className="small-content monts">{el.summary.split(' ').map((e)=>{return(e===inputText)?(<span className="highlight"> {e}</span>):<span>{" "+e}</span>}).slice(0,30)}</div>
            <a href={`${el.url}`} className="arrow monts" >Read More <img src={require('./arrow.png')}  className="imgArrow"/> </a>
              </div>):null}         
        </div>

        
        </Grid>
        <Grid item xs={0.4}>
          
          </Grid>
      </Grid>
    </Box>

        </div>
    )
}
