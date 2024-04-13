const InputBox = ({ label, placeholder, type, onchange }) => {
  return (
    <div className="flex flex-col justify-center text-left  py-2  ">
      <label className="font-medium">{label}</label>
      <input
        placeholder={placeholder}
        onChange={onchange}
        type={type}
        className="px-2 py-1 mt-1 border-slate-200  w-full border rounded"
      ></input>
    </div>
  );
};

export default InputBox;
