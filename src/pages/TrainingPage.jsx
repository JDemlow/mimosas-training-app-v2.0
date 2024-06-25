import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Employee from "../compontents/Employee";

const TrainingPage = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [trainingTasks, setTrainingTasks] = useState([
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
  ]);

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
      <div className="align-center flex justify-center">
        <div className="shadow-mdalign-center mb-4 flex-col justify-center rounded bg-white p-4">
          <h3 className="text-lg font-semibold">Training Tasks</h3>
          <ul>
            {trainingTasks.map((task, index) => (
              <li key={index} className="my-2 flex items-center">
                <input type="checkbox" id={`task-${index}`} className="mr-2" />
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
