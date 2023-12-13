const SelectComponent = ({ label, props, name }) => {
  return (
    <div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <select className="select select-bordered" name={name} required>

          {props.map(prop => (
            <option key={prop}>{prop}</option>
          ))}
        
        </select>
      </label>
    </div>
  );
};
export default SelectComponent;
