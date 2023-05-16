import "../index.css";
import Employee from "../compontents/Employee";
import { useState } from "react";
import TodoApp from "../compontents/TodoApp";
import AddEmployee from "../compontents/AddEmployee";
import { v4 as uuidv4 } from "uuid";
import EditEmployee from "../compontents/EditEmployee";
import Header from "../compontents/Header";

function Employees() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Tristan",
      role: "Server / Bartender",
      tier: "Tier 4",
      img: "https://images.pexels.com/photos/4926674/pexels-photo-4926674.jpeg",
    },
    {
      id: 2,
      name: "Johnathan",
      role: "Server / Bartender",
      tier: "Tier 4",
      img: "https://images.pexels.com/photos/4926672/pexels-photo-4926672.jpeg",
    },
    {
      id: 3,
      name: "James",
      role: "Server",
      tier: "Tier 5",
      img: "https://images.pexels.com/photos/4926673/pexels-photo-4926673.jpeg",
    },
    {
      id: 4,
      name: "Joe",
      role: "Supervisor / Server",
      tier: "Tier 5",
      img: "https://images.pexels.com/photos/4926675/pexels-photo-4926675.jpeg",
    },
    {
      id: 5,
      name: "Zach",
      role: "Supervisor / Bartender",
      tier: "Tier 5",
      img: "https://images.pexels.com/photos/4926676/pexels-photo-4926676.jpeg",
    },
    {
      id: 6,
      name: "Alex",
      role: "Server",
      tier: "Tier 3",
      img: "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
    },
  ]);

  function updateEmployee(id, newName, newRole, newTier) {
    const updatedEmployees = employees.map((employee) => {
      if (id == employee.id) {
        return { ...employee, name: newName, role: newRole, tier: newTier };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  }

  function newEmployee(name, role, tier) {
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      tier: tier,
      img: "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
    };
    setEmployees([...employees, newEmployee]);
  }

  const showEmployees = true;
  return (
    <div className="App min-h-screen bg-gradient-to-r from-[#d69c28] to-[#fe642a]">
      {showEmployees ? (
        <>
          <div className="flex flex-wrap justify-center p-4">
            {employees.map((employee) => {
              const editEmployee = (
                <EditEmployee
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  tier={employee.tier}
                  updateEmployee={updateEmployee}
                />
              );
              return (
                <Employee
                  key={employee.id}
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
