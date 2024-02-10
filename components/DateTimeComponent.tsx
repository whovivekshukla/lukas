const DateTimeComponent = ({ labelName, name, value = "" }) => {
  return (
    <div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{labelName}</span>
        </div>
        <input
          type="datetime-local"
          step={1}
          name={name}
          className="input input-bordered input-primary"
          required
        />
      </label>
    </div>
  );
};
export default DateTimeComponent;
