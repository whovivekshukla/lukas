const TextAreaComponent = ({ label, value, name }) => {
  return (
    <div>
      <label className="form-control">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <textarea
          name={name}
          className="textarea textarea-bordered h-24"
          placeholder={label}
          defaultValue={value.map((item) => JSON.stringify(item, null, 2))}
        ></textarea>
        <div className="label">
          <span className="label-text-alt">
            You can enter as array of Objects and in exactly <br></br> above
            format.
          </span>
        </div>
      </label>
    </div>
  );
};
export default TextAreaComponent;
