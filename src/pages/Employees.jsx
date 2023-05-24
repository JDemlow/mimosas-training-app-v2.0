import "../index.css";
import Employee from "../compontents/Employee";
import { useState, useEffect } from "react";
import TodoApp from "../compontents/TodoApp";
import AddEmployee from "../compontents/AddEmployee";
import EditEmployee from "../compontents/EditEmployee";
import { db } from "../firebase";
import Header from "../compontents/Header";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
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

  function newEmployee(name, role, tier) {
    const newEmployee = {
      name: name,
      role: role,
      tier: tier,
      img: "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
      createdAt: serverTimestamp(),
    };

    addDoc(collection(db, "employees"), newEmployee)
      .then((docRef) => {
        setEmployees((prevEmployees) =>
          prevEmployees.concat({ ...newEmployee, id: docRef.id })
        );
      })
      .catch((error) => {
        console.error("Error adding employee: ", error);
      });
  }

  const showEmployees = true;
  return (
    <div className="App min-h-screen bg-gradient-to-r from-[#d69c28] to-[#fe642a]">
      {showEmployees ? (
        <>
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
            <AddEmployee newEmployee={newEmployee} />
          </div>
        </>
      ) : (
        <p>You cannot see the employees</p>
      )}
    </div>
  );
}

export default Employees;
