import {useState,useEffect} from "react"
import axios from 'axios'

const useFetch = (url :string)=>{
    interface Inews {
        featured: Boolean
        id: number
        imageUrl: "string"
        newsSite: "string"
        publishedAt: "string"
        summary: "string"
        title: "string"
        url: "string"
    }

  const [globalArrOfData,setStatus] = useState<Inews[]>()


    function fetchNow(url:string) {
        axios.get(url)
        .then(function (response: any) {
            // handle success
           setStatus(response.data)
        })
        .catch(function (error: any) {
            // handle error          
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

useEffect(() => {if(url){fetchNow(url)}}, []) 
    return{globalArrOfData,fetchNow,}
}

export default useFetch