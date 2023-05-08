function Employee(props) {
  return (
    <div class="m-2 py-8 px-8 max-w-sm bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <img
        class=" object-cover rounded-full h-[100px] w-[100px] block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
        src={props.img}
        alt="Woman's Face"
      />
      <div class="text-center space-y-2 sm:text-left">
        <div class="space-y-0.5">
          <p class="text-lg text-black font-semibold">{props.name}</p>
          <p class="text-slate-500 font-medium">{props.role}</p>
          <p class="text-slate-500 font-medium">{props.tier}</p>
        </div>
        <button class="px-4 py-1 text-sm text-[#d69c28] font-semibold rounded-full border border-[#f6b42c] hover:text-white hover:bg-[#fe642a] hover:border-transparent focus:outline-none focus:ring-2 focus:ring-[#f6b42c] focus:ring-offset-2">
          View Employee
        </button>
      </div>
    </div>
  );
}

export default Employee;
