import { useMutation, useQuery } from '@apollo/client';
import { CREATE_POST, DELETE_POST } from './GraphQL/Mutation';
import { getAll } from "./GraphQL/Query";
import { useState } from "react";

function App() {
  const {loading,error,data,refetch}=useQuery(getAll);
  const [createPost,{ err }]=useMutation(CREATE_POST);
  const [deletePost,{ errr }]=useMutation(DELETE_POST);
  const [title,setTitle]=useState(null) ;
  const [description,setDescription]=useState(null);

  if (loading) return "Loading";
  if (error) return "Error";
  if(data) console.log(data);

  const addPost=()=>{
    createPost({
      variables:{
        title: title,
        description: description,
      }
    })
  }
const removePost=(id)=>{
  deletePost({
    variables: {
      id: id,
    },
  });
};

  return (
    <div className="App">
      {data.getAll.map((data) => (
        <>
        <p key={data.title}>
          {data.title}----{data.description}
        </p>
        <button onClick={()=> {
          removePost(data.id); 
          refetch();
        }
        }> Delete Me </button>
        </>))
      }

  <br/>
  Title: <input onChange={(e)=>setTitle(e.target.value)}/><br/>
  Description: <input onChange={(e)=>setDescription(e.target.value)}/><br/>
  <button onClick={()=> {
    addPost();
    refetch();
  }}
    >
      Add Post</button>
    </div>
  )
}

export default App;
