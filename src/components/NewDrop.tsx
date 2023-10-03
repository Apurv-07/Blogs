import { Menu, Transition } from '@headlessui/react'
import React, { Fragment, useState, useEffect } from 'react'
import MyModal from './Modal'
import {  deletePost, editModal, fetchPosts, updatePost, viewPosts } from '../redux/Actions'
import {useDispatch, useSelector} from 'react-redux'

const NewDrop = ({item, setIsOpen}) => {
    const [clicked, setClicked]=useState("");
    const dispatch=useDispatch();
    // console.log(item, "The item here")
    
      const handleDeletePost = (id) => {
        dispatch(deletePost(id));
      };
  
      const handleEdit = (item) => {
        // setClicked('Edit');
        setIsOpen(true);
        dispatch(editModal(item))
        // dispatch(updatePost(id, 'Edit'));
      };
      
    //   useEffect(() => {
    //     console.log("setClicked", clicked);
    //   }, [clicked]);

    const handleViewClick = (id) => {
        setClicked("View")
        console.log("Button clicked");
        setIsOpen(true);
        console.log("View or not", clicked)
        console.log("CURRENT ITEM", item)
        dispatch(viewPosts(id, clicked));
    };

    return (
        <div>
            <Menu>
                <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 flex-col">
                    <div className='bg-black h-1 w-1 rounded-full mt-1' />
                    <div className='bg-black h-1 w-1 rounded-full mt-1' />
                    <div className='bg-black h-1 w-1 rounded-full mt-1' />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button onClick={()=>{handleEdit(item)}}
                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active ? (
                                            <EditActiveIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <EditInactiveIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Edit
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={()=>{handleViewClick(item.id)}}
                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active ? (
                                            <DuplicateActiveIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <DuplicateInactiveIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                        View
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={()=>handleDeletePost(item.id)} // Handle the click outside of the Menu.Item
                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active ? (
                                            <DeleteActiveIcon
                                                className="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <DeleteInactiveIcon
                                                className="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Delete
                                    </button>
                                )}
                            </Menu.Item>
                            
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

function EditInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
        </svg>
    )
}

function EditActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
        </svg>
    )
}

function DuplicateInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 4H12V12H4V4Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <path
                d="M8 8H16V16H8V8Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
        </svg>
    )
}

function DuplicateActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 4H12V12H4V4Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <path
                d="M8 8H16V16H8V8Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
        </svg>
    )
}


function DeleteInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
        </svg>
    )
}

function DeleteActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
        </svg>
    )
}


export default NewDrop