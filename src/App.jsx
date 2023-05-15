import "../src/index.css";
import Employee from "./compontents/Employee";
import { useState } from "react";
import TodoApp from "./compontents/TodoApp";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [role, setRole] = useState("dev");
  const [employees, setEmployees] = useState([
    {
      name: "Tristan",
      role: "Server / Bartender",
      tier: "Tier 4",
      img: "https://images.pexels.com/photos/4926674/pexels-photo-4926674.jpeg",
    },
    {
      name: "Johnathan",
      role: "Server / Bartender",
      tier: "Tier 4",
      img: "https://images.pexels.com/photos/4926672/pexels-photo-4926672.jpeg",
    },
    {
      name: "James",
      role: "Server",
      tier: "Tier 5",
      img: "https://images.pexels.com/photos/4926673/pexels-photo-4926673.jpeg",
    },
    {
      name: "Joe",
      role: "Supervisor / Server",
      tier: "Tier 5",
      img: "https://images.pexels.com/photos/4926675/pexels-photo-4926675.jpeg",
    },
    {
      name: "Zach",
      role: "Supervisor / Bartender",
      tier: "Tier 5",
      img: "https://images.pexels.com/photos/4926676/pexels-photo-4926676.jpeg",
    },
    {
      name: "Alex",
      role: "Server",
      tier: "Tier 3",
      img: "https://images.pexels.com/photos/4926677/pexels-photo-4926677.jpeg",
    },
  ]);
  const showEmployees = true;
  return (
    <div className="App">
      {showEmployees ? (
        <>
          <input
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setRole(e.target.value);
            }}
          />
          <div className="flex flex-wrap justify-center bg-gradient-to-r from-[#d69c28] to-[#fe642a] p-4">
            {employees.map((employee) => {
              console.log(employee);
              return (
                <Employee
                  key={uuidv4()}
                  name={employee.name}
                  role={employee.role}
                  tier={employee.tier}
                  img={employee.img}
                />
              );
            })}
          </div>
          <div>
            <TodoApp />
          </div>
        </>
      ) : (
        <p>You cannot see the employees</p>
      )}
    </div>
  );
}

export default App;
