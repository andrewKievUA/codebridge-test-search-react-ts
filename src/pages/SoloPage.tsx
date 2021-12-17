import React,{useEffect} from "react"
import  axios from 'axios'




export const SoloPage = () => {
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
      
    useEffect(()=>{
        // Make a request for a user with a given ID
        axios.get(`https://api.spaceflightnewsapi.net/v3/articles?_id=${window.location.href.slice(27)}`)
        .then(function (response:any) {
            // handle success       
            console.log(response.data)
        })
        .catch(function (error:any) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
   },[])

    return (
        <div>
            This is a SoloPage
        </div>
    )
}
