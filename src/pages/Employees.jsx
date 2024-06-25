import Employee from "../components/Employee";
import { useState, useEffect } from "react";
import AddEmployee from "../components/AddEmployee";
import EditEmployee from "../components/EditEmployee";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "employees"), (snapshot) => {
      const employeeData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmployees(employeeData);
    });

    return unsubscribe;
  }, []);

  const updateEmployee = async (id, { name, role, tier }) => {
    await updateDoc(doc(db, "employees", id), { name, role, tier });
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) => {
        if (employee.id === id) {
          return { ...employee, name, role, tier };
        }
        return employee;
      })
    );
  };

  return (
    <div className="App min-h-screen bg-gradient-to-r from-[#d69c28] to-[#fe642a]">
      <div className="flex flex-wrap justify-center p-4">
        {employees.map((employee, index) => {
          const editEmployee = (
            <EditEmployee
              id={employee.id}
              name={employee.name}
              role={employee.role}
              tier={employee.tier}
              updateEmployee={updateEmployee}
              employees={employees}
              setEmployees={setEmployees} // Pass the setEmployees function as a prop
            />
          );
          return (
            <Employee
              key={`${employee.id}-${index}`}
              id={employee.id}
              name={employee.name}
              role={employee.role}
              tier={employee.tier}
              img={employee.img}
              editEmployee={editEmployee}
            />
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center bg-gradient-to-r from-[#d69c28] to-[#fe642a] p-4">
        <AddEmployee setEmployees={setEmployees} />
      </div>
    </div>
  );
}

export default Employees;
