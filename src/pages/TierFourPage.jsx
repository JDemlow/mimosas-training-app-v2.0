import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Employee from "../components/Employee";
import LoadingSpinner from "../components/LoadingSpinner";

const tierFourTasks = [
  "Train the trainer session",
  "Exceptional menu knowledge & guidance",
  "Exemplary guest service",
  "Guest compliments as part of your life",
  "Picking up shifts",
  "Unsupervised sidework excellence",
  "Doing what’s right when no one is looking",
  "Zero drama",
  "Always prepared & positive",
  "Reliable & helpful to all staff",
];

const TierFourPage = () => {
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
          data.tierFourChecklist || new Array(tierFourTasks.length).fill(false)
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
      tierFourChecklist: updatedChecklist,
    });
  };

  if (!employee) return <LoadingSpinner />;

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
          <h2 className="text-center text-lg font-bold">Tier 4 Checklist</h2>
          <ul className="flex flex-col gap-3.5 p-4">
            {tierFourTasks.map((task, index) => (
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
      <div className="flex flex-col justify-center gap-3 p-3 sm:flex-row">
        <button
          className="rounded bg-gray-400 px-4 py-2 font-bold text-white hover:bg-gray-600"
          onClick={() => navigate(-1)} // Go back to the previous page
        >
          Back
        </button>
        <button
          className="rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a]"
          onClick={() => navigate(`/tier5/${employeeId}`)} // Navigate to TierFivePage
        >
          Proceed to Tier 5
        </button>
      </div>
    </div>
  );
};

export default TierFourPage;
