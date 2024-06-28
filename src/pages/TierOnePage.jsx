import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Employee from "../components/Employee";

const tierOneTasks = [
  "Completion of all departmental training & assessments",
  "Active participation on departmental schedule – no less than 3 shifts per week",
];

const TierOnePage = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [checklist, setChecklist] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      const employeeDoc = await getDoc(doc(db, "employees", employeeId));
      if (employeeDoc.exists()) {
        const data = employeeDoc.data();
        setEmployee(data);
        setChecklist(
          data.tierOneChecklist || new Array(tierOneTasks.length).fill(false)
        );
      } else {
        console.log("No such document!");
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleCheckboxChange = async (index) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index] = !updatedChecklist[index];
    setChecklist(updatedChecklist);

    // Update Firestore
    const employeeDocRef = doc(db, "employees", employeeId);
    await updateDoc(employeeDocRef, {
      tierOneChecklist: updatedChecklist,
    });
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="App min-h-screen bg-gradient-to-r from-[#d69c28] to-[#fe642a]">
      <div className="align-center flex justify-center pt-4">
        <Employee
          name={employee.name}
          role={employee.role}
          tier={employee.tier}
          img={employee.img}
          editEmployee={null} // No edit button in this view
        />
      </div>
      <div className="flex w-full justify-center p-4">
        <div className="w-full max-w-lg rounded-md bg-white p-4 shadow-lg">
          <h2 className="text-center text-lg font-bold">Tier 1 Checklist</h2>
          <ul className="flex flex-col gap-3.5 p-4">
            {tierOneTasks.map((task, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-md bg-gray-100 p-3"
              >
                <span
                  className={`${
                    checklist[index] ? "text-gray-500 line-through" : ""
                  } text-xs md:text-base`}
                >
                  {task}
                </span>
                <button
                  className={`rounded px-4 py-2 font-bold text-white ${
                    checklist[index]
                      ? "bg-emerald-500"
                      : "bg-[#f6b42c] hover:bg-[#fe642a]"
                  }`}
                  onClick={() => handleCheckboxChange(index)}
                >
                  Done
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center p-3">
        <button
          className="rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a]"
          onClick={() => navigate(`/tier2/${employeeId}`)} // Navigate to TierTwoPage
        >
          Proceed to Tier 2
        </button>
      </div>
    </div>
  );
};

export default TierOnePage;