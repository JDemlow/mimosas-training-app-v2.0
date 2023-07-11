import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import {
  collection,
  getDocs,
  
} from "firebase/firestore";
import { db } from "../firebase";

function AddEmployee(props) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [tier, setTier] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Log Employees
  useEffect(() => {
    const fetchEmployeeData = async () => {
      console.log("Fetching employee data...");
      const employeeQuerySnapshot = await getDocs(collection(db, "employees"));

      const processEmployee = (employee) => {
        console.log("Employee: " + employee.id);
      };

      employeeQuerySnapshot.forEach((doc) => {
        processEmployee({ id: doc.id, ...doc.data() });
      });
    };

    fetchEmployeeData();
  }, []);

  return (
    <>
      <button
        onClick={handleShow}
        className="m-2 mx-auto block rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a] focus:outline-none"
      >
        Add New Employee
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setName("");
              setRole("");
              setTier("");
              props.newEmployee(name, role, tier);
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
                  placeholder="John"
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
                  placeholder="Bartender"
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
                  placeholder="Tier 3"
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
            onClick={handleClose}
            form="editModal"
          >
            Add Employee
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEmployee;
