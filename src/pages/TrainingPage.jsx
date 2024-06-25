import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Employee from "../components/Employee";

const trainingTasks = [
  "W4/I9 completed",
  "7shift upload",
  "Toast upload",
  "Rasi upload",
  "Going over Menus",
  "Handbook walkthrough and given",
  "Explanation of tip teir",
  "Tip criteria given",
  "Tip assessment given",
  "Tip quizzes given",
  "Tour of dry storage",
  "Tour of walkin",
  "Tour of bar",
  "Tour of chemical closet",
  "Tour of MBP",
  "Restaurant overview",
  "Explanation of handhelds",
  "Shadow of expo",
  "Food presentations",
  "Communication from expo",
  "Learn table numbers",
  "Manager sign off",
  "General Manager sign off",
  "More in-depth training of toast",
  "Shadow trainer",
  "Learning of table numbers",
  "Trainer sign off",
  "Training manager sign off",
  "Menu training with GM",
  "Shadow trainer",
  "Trainer sign off",
  "GM sign off",
  "Bar training with bar manager",
  "Espresso machine",
  "Cocktails",
  "All alcohol carried",
  "Manager sign off",
];

const TrainingPage = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [checklist, setChecklist] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      const employeeDoc = await getDoc(doc(db, "employees", employeeId));
      if (employeeDoc.exists()) {
        const data = employeeDoc.data();
        setEmployee(data);
        setChecklist(
          data.checklist || new Array(trainingTasks.length).fill(false)
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
      checklist: updatedChecklist,
    });
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="App min-h-screen bg-gradient-to-r from-[#d69c28] to-[#fe642a]">
      <div className="align-center flex justify-center">
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
          <ul className="flex flex-col gap-3.5">
            {trainingTasks.map((task, index) => (
              <li
                key={index}
                className="flex items-center rounded-md bg-gray-100 p-3"
              >
                <input
                  type="checkbox"
                  id={`task-${index}`}
                  className="mr-2"
                  checked={checklist[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
                <label htmlFor={`task-${index}`}>{task}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
