import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const TrainingPage = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const employeeDoc = await getDoc(doc(db, "employees", employeeId));
      if (employeeDoc.exists()) {
        setEmployee(employeeDoc.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchEmployee();
  }, [employeeId]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <h2>{employee.name}</h2>
      <p>{employee.position}</p>
      {/* Display other employee information as needed */}
    </div>
  );
};

export default TrainingPage;
