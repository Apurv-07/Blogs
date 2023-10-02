import './App.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost, deletePost, updatePost } from "./redux/Actions";

import MyModal from './components/Modal'
import NewDrop from './components/NewDrop'

function App() {
  // const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  // const selectedData = useSelector((state) => state)
  // console.log(selectedData)
  // useEffect(() => {
  //   console.log("Not wunninh")
  //   async function getAllUsers() {
  //     const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  //     const resData = await res.json();
  //     await setData(resData);
  //   }
  //   getAllUsers();
  // }, [])
  const dispatch = useDispatch();
  // const {posts, clicked, initialPost} = useSelector((state) => state);
  const myState=useSelector((state) => state);
  const {posts, initialPost, clicked}=myState;
  console.log("Everything:", myState)
  const [input, setInput] = useState({
    title: "",
    body: ""
  });
  const [editPost, setEditPost] = useState(null);

  const handleAddPost = () => {
        dispatch(addPost({...input, id:posts.length+1, userId: 1}));
        setInput({ title: "", body: "" }); // Clear the input fields after adding a post
      };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={input.title}
        onChange={(e) => setInput({ ...input, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Body"
        value={input.body}
        onChange={(e) => setInput({ ...input, body: e.target.value })}
      />

      <button onClick={handleAddPost}>Add Post</button>
      
      {posts.map((item, index) => {
        return (
          <div className='px-10'>
          <div className='mt-5 p-10 border-2 border-solid border-gray-600' key={item.id}>
            <div className='flex justify-between items-center'>
              <div className='w-[40px] h-[40px] bg-gray-600' />
              <h1 className='!font-sans ml-2 font-bold whitespace-nowrap text-ellipsis overflow-hidden'>{item.title}</h1>
              <div>
                <NewDrop item={item} setIsOpen={setIsOpen} />
              </div>
              {/* <Example isOpen={isOpen} setIsOpen={setIsOpen} /> */}
              {/* <button className='bg-yellow-800 rounded-lg min-w-[100px] text-white' onClick={() => setIsOpen(!isOpen)}>Click</button> */}
            </div>
            <div className='justify-start'>
              <h1>Last saved 22:55 27/09/2023</h1>
            </div>
          </div>
          </div> 
        )
      })}
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen} item={initialPost} clicked={clicked}  />
    </div >
  )
}


export default App
