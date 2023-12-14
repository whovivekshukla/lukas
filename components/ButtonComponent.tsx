const ButtonComponent = ({ label, disabled }) => {
  return (
    <div>
      <button
        className="btn btn-active btn-primary"
        disabled={disabled}
        type="submit"
      >
        {label}
      </button>
    </div>
  );
};
export default ButtonComponent;
