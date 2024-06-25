import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddEmployee = ({ setEmployees }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [tier, setTier] = useState("");
  const trainingTasksLength = 36; // Number of training tasks

  const addEmployee = async (e) => {
    e.preventDefault();
    const newEmployee = {
      name,
      role,
      tier,
      checklist: new Array(trainingTasksLength).fill(false),
    };

    const docRef = await addDoc(collection(db, "employees"), newEmployee);
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      { id: docRef.id, ...newEmployee },
    ]);
  };

  return (
    <form onSubmit={addEmployee}>
      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Role:</label>
        <input value={role} onChange={(e) => setRole(e.target.value)} />
      </div>
      <div>
        <label>Tier:</label>
        <input value={tier} onChange={(e) => setTier(e.target.value)} />
      </div>
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
