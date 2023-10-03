import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPosts, fetchUserPosts } from '../redux/Actions'

const UserDrop = ({users}) => {
    // const [active, setActive]=useState(1)
    const dispatch=useDispatch();
  return (
    <div  className="w-0">
        <Menu>
                <Menu.Button className="inline-flex w-4 justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 flex-col">
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
                                <Menu.Item onClick={()=>{
                                    dispatch(fetchPosts());
                                }}>
                                   {({ active })=>( <h4 className={`${active ? 'bg-violet-500 text-white' : 'text-gray-200 bg-slate-600'
                                            } group flex mt-1 w-full items-center rounded-md px-2 py-2 text-sm`}>Get All users</h4>)}
                                </Menu.Item>
                            {users.map((item)=>{
                                return (
                                <Menu.Item key={item.id} onClick={()=>{
                                    // setActive(item.id)
                                    dispatch(fetchUserPosts(item.id))
                                }}>
                                   {({ active })=>( <h4 className={`${active ? 'bg-violet-500 text-white' : 'text-gray-200 bg-slate-600'
                                            } group flex mt-1 w-full items-center rounded-md px-2 py-2 text-sm`}>{item.name}</h4>)}
                                </Menu.Item>
                                )
                            })}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
    </div>
  )
}

export default UserDrop