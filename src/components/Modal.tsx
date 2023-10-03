import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../redux/Actions';



interface propTypes {
  isOpen: any;
  item:
  {
    id: number;
    title: string;
    body: string;
  }
  setIsOpen: (isOpen: boolean) => void;
  editId: any;
};

const MyModal: React.FC<propTypes> = ({ isOpen, setIsOpen, item, clicked, editId }: propTypes) => {
  const dispatch: any = useDispatch();
  console.log(item, "ITEM")

  const [input, setInput] = useState({
    title: '',
    body: '',
  });

  function closeModal() {
    setIsOpen(false);
  }

  function handleEdit() {
    if (editId !== null) {
      dispatch(updatePost({ ...item, ...input }, editId));
      setIsOpen(false);
    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full min-w-[650px] min-h-[400px] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >

                  </Dialog.Title>

                  {clicked === 'Edit' ? (
                    <div className="mt-2 flex gap-5 flex-col min-h-[280px]">
                      {/* <p className="text-[20px] font-bold text-gray-500">
                        {item.title}
                      </p> */}
                      <input
                        className='rounded-lg w-full border-2 h-10 !border-solid px-2 border-black'
                        placeholder='Title'
                        onChange={(e) => setInput({ ...input, title: e.target.value })}
                      />
                      <input
                        className='rounded-lg w-full border-2 h-10 !border-solid px-2 border-black'
                        placeholder='Body'
                        onChange={(e) => setInput({ ...input, body: e.target.value })}
                      />
                      {/* <p className="text-sm text-gray-500">
                        {item.body}
                      </p> */}
                    </div>
                  ) : (
                    <div className="mt-2 min-h-[280px]">
                      <p className="text-[20px] font-bold text-gray-500 !leading-[24px]">
                        {item.title}
                      </p>
                      <p className="text-sm mt-10 text-gray-500">
                        {item.body}
                      </p>
                    </div>
                  )}

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                    {clicked === 'Edit' && (
                      <button
                        type="button"
                        className="inline-flex ml-10 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleEdit}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MyModal;
