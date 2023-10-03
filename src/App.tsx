import './App.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost, fetchUsers } from "./redux/Actions";

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
  const myState = useSelector((state) => state);
  const { posts, initialPost, clicked, users, editItem } = myState;
  console.log("Everything:", myState)
  const [input, setInput] = useState({
    title: "",
    body: "",
    userId: ""
  });

  const handleAddPost = () => {
    dispatch(addPost({ ...input, id: posts.length + 1 }));
    setInput({ title: "", body: "", userId: "Select a user" }); // Clear the input fields after adding a post
  };

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers())
  }, [dispatch]);

  let listusers = [];
  for (let i = 0; i <= 9; i++) {
    listusers.push(
      <option value={i + 1}>User {i + 1}</option>
    )
  }
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
          <select name="cars" id="cars" value={input.userId} className='rounded-lg border-2 !border-solid px-2 border-black' onChange={(e) => {
            const selectedUserId = e.target.value;
            setInput({ ...input, userId: selectedUserId })
            console.log("Selected user id", selectedUserId)
          }}>
            <option value="Select a user">Select a user</option>
            {listusers}
          </select>
          <button onClick={() => { }} />
          <button className='rounded-lg bg-gray-800 text-white px-5 py-2' onClick={handleAddPost}>Add Post</button></div>
        <UserDrop users={users} />
      </div>

      <div className='sm:grid sm:grid-cols-2'>
      {posts.map((item) => {
        return (
          <div className='px-10' key={item.id}>
            <div className='mt-5 p-10 border-2 border-solid border-gray-600 rounded-xl max-sm:w-full max-sm:min-w-[300px] sm:max-w-[600px]'>
              <div className='flex justify-between items-center'>
                <div className='w-[20%]'>
                <div className='w-[60px] h-[60px] bg-gray-400 flex justify-center items-center rounded-lg'>
                  <svg
                    fill="#000000"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="40px"
                    height="40px"
                    viewBox="0 0 395.71 395.71"
                    xmlSpace="preserve"
                  >
                    <g>
                      <path
                        d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
            c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
            C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
            c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
                      />
                    </g>
                  </svg>
                </div>
                </div>
                <h1 className='!font-sans ml-2 font-bold max-sm:w-[100px] text-ellipsis whitespace-nowrap overflow-hidden'>{item.title}</h1>
                <div>
                  <NewDrop item={item} setIsOpen={setIsOpen} />
                </div>
                {/* <Example isOpen={isOpen} setIsOpen={setIsOpen} /> */}
                {/* <button className='bg-yellow-800 rounded-lg min-w-[100px] text-white' onClick={() => setIsOpen(!isOpen)}>Click</button> */}
              </div>
              <div className='justify-start mt-2'>
                <h1>Last saved 22:55 27/09/2023</h1>
              </div>
            </div>
          </div>
        )
      })}
      </div>
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen} item={initialPost} clicked={clicked} editId={editItem} />
    </div >
  )
}


export default App
