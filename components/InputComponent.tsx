const InputComponent = ({ labelName, type, name, value }) => {
  return (
    <div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{labelName}</span>
        </div>
        <input
          type={type}
          name={name}
          defaultValue={value}
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs"
          required
        />
      </label>
    </div>
  );
};
export default InputComponent;
