import EditEmployee from "./EditEmployee";

function Employee(props) {
  return (
    <div className="m-2 min-w-[350px] max-w-[350px] space-y-2 rounded-xl bg-white px-8 py-8 shadow-lg sm:flex sm:items-center sm:space-x-6 sm:space-y-0 sm:py-4">
      <img
        className=" mx-auto block h-24 h-[100px] w-[100px] rounded-full rounded-full object-cover sm:mx-0 sm:shrink-0"
        src={props.img}
        alt="generic avatar"
      />
      <div className="space-y-2 text-center sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg font-semibold text-black">{props.name}</p>
          <p className="font-medium text-slate-500">{props.role}</p>
          <p className="font-medium text-slate-500">{props.tier}</p>
        </div>

        {props.editEmployee}
      </div>
    </div>
  );
}

export default Employee;
