import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TodoApp from "./TodoApp";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { FaRegTrashAlt } from "react-icons/fa";

function EditEmployee(props) {
  const [name, setName] = useState(props.name);
  const [role, setRole] = useState(props.role);
  const [tier, setTier] = useState(props.tier);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteEmployee = async (id) => {
    await deleteDoc(doc(db, "employees", id));
    const updatedEmployees = props.employees.filter(
      (employee) => employee.id !== id
    );
    props.setEmployees(updatedEmployees); // Update the state in the parent component
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="rounded-full border border-[#f6b42c] px-4 py-1 text-sm font-semibold text-[#d69c28] hover:border-transparent hover:bg-[#fe642a] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#f6b42c] focus:ring-offset-2"
      >
        Edit Employee
      </button>
      <a className="mt-0 block" href="tasks">
        <button className="my-2 rounded-full border border-[#f6b42c] px-4 py-1 text-sm font-semibold text-[#d69c28] hover:border-transparent hover:bg-[#fe642a] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#f6b42c] focus:ring-offset-2">
          View Training
        </button>
      </a>

      <button onClick={() => deleteEmployee(props.id)}>
        {<FaRegTrashAlt />}
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              handleClose();
              e.preventDefault();
              props.updateEmployee(props.id, { name, role, tier });
            }}
            id="editModal"
            className="w-full max-w-sm"
          >
            <div className="mb-6 md:flex md:items-center">
              <div className="md:w-1/3">
                <label
                  className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                  htmlFor="name"
                >
                  Full Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-[#f6b42c] focus:bg-white focus:outline-none"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mb-6 md:flex md:items-center">
              <div className="md:w-1/3">
                <label
                  className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                  htmlFor="role"
                >
                  Position
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-[#f6b42c] focus:bg-white focus:outline-none"
                  id="role"
                  type="text"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mb-6 md:flex md:items-center">
              <div className="md:w-1/3">
                <label
                  className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                  htmlFor="tier"
                >
                  Current Tier
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-[#f6b42c] focus:bg-white focus:outline-none"
                  id="tier"
                  type="text"
                  value={tier}
                  onChange={(e) => {
                    setTier(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="rounded bg-slate-400 px-4 py-2 font-bold text-white hover:bg-[#fe642a]"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a]"
            form="editModal"
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditEmployee;
