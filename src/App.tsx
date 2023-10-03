import './App.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost, deletePost, updatePost, fetchUsers } from "./redux/Actions";

import MyModal from './components/Modal'
import NewDrop from './components/NewDrop'
import UserDrop from './components/UserDrop';

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
  const {posts, initialPost, clicked, users, editItem}=myState;
  console.log("Everything:", myState)
  const [input, setInput] = useState({
    title: "",
    body: ""
  });

  const handleAddPost = () => {
        dispatch(addPost({...input, id:posts.length+1, userId: 1}));
        setInput({ title: "", body: "" }); // Clear the input fields after adding a post
      };

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers())
  }, [dispatch]);

  return (
    <div>
      <div className='flex justify-evenly mt-5'>
        <div className='p-2 flex gap-2 w-[80%] max-sm:flex-col'>
      <input
        type="text"
        placeholder="Title"
        value={input.title}
        className='rounded-lg border-2 !border-solid px-2 border-black'
        onChange={(e) => setInput({ ...input, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Body"
        value={input.body}
        className='rounded-lg border-2 !border-solid px-2 border-black'
        onChange={(e) => setInput({ ...input, body: e.target.value })}
      />

      <button className='rounded-lg bg-gray-800 text-white px-5 py-2' onClick={handleAddPost}>Add Post</button></div>
      <UserDrop users={users} />
      </div>

      
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
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen} item={initialPost} clicked={clicked} editId={editItem} />
    </div >
  )
}


export default App
