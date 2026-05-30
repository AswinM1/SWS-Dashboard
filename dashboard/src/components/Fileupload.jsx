import { useEffect, useRef, useState } from "react";
import axios from 'axios'
import {io} from 'socket.io-client'
export default function App() {
  
  const socket=io("http://localhost:3000");
  useEffect(()=>
  {
    socket.on("new file uploaded",(data)=>
    {
      alert(data.file)
      
    })

  },[])
  const handleFiles=async(selectedfiles)=>
    {
    const formData=new FormData()
    selectedfiles.forEach((data)=>
    {
      formData.append("files",data)
    })
  await axios.post(
      "http://localhost:3000/files",
      formData
    );
       
  }
  

 
  const[files,setFiles]=useState([]);
  
  const inputRef = useRef();


  const handleDrop = async(e) => {
  e.preventDefault();

  console.log(e.dataTransfer.files);
  const selectedfiles=Array.from(e.dataTransfer.files)
  setFiles((prev)=>[...prev,...selectedfiles])

  await handleFiles(selectedfiles)
};
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        Random docs
      </h1>

      <div
        className="border-2 border-dashed rounded-xl p-20 text-center cursor-pointer"
        onClick={() =>
          inputRef.current.click()
        }
        onDragOver={(e)=>e.preventDefault()}
        onDrop={handleDrop}
      >
        <h2 className="text-2xl font-semibold">
          Upload files
        </h2>

        <p className="text-gray-500 mt-2">
          Click to browse
        </p>

        <input
          type="file"
          hidden
          ref={inputRef}
          onChange={async(e)=>
          {
            e.preventDefault()
            const selectedfiles=Array.from(e.target.files)
            setFiles((prev)=>[...prev,...selectedfiles])
            await handleFiles(selectedfiles)

          }
          }
         
        />
      </div>
      <div className="mt-5">
        {files.map((val,idx)=>
        (
          <div className="text-black">
            {val.name}
          </div>
        ))}
      </div>
    </div>
  );
}