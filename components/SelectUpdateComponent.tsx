const SelectUpdateComponent = ({ label, options, name, defaultValue }) => {
  return (
    <div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <select className="select select-bordered" name={name} required disabled>
          {options.map((option) => (
            <option
              key={option}
              value={option}
              selected={option === defaultValue}
            >
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectUpdateComponent;
