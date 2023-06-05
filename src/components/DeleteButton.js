import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import Modal from "react-modal";
import { deleteItemFromFirestore } from "../firebase/utils";

Modal.setAppElement("#root");

function DeleteButton({ id }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleDelete = async (event) => {
    event.stopPropagation();
    event.preventDefault(); // add this line to prevent default behavior
    await deleteItemFromFirestore(id);
    console.log("fired");
    closeModal();
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
      >
        <AiFillDelete className="mr-3" />
        Delete
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation Modal"
        className="border-0 relative flex flex-col w-auto my-6 mx-auto max-w-sm md:max-w-3xl bg-white rounded p-6"
        overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      >
        <h2 className="text-xl font-semibold mb-4">
          Are you sure you want to delete this item?
        </h2>
        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded"
          >
            Yes, delete it
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded"
          >
            No, keep it
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteButton;
