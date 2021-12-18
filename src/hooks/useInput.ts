import {useState} from "react"


 const useInput = (initial :string)=>{
    const [inputText,setValue] = useState(initial)

     return {
        inputText,
      
        onChange:(e:any)=>setValue(e.target.value),

    }

}

export default useInput