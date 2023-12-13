const ButtonComponent = ({ label }) => {
  return (
    <div>
      <button className="btn btn-active btn-primary" type="submit">
        {label}
      </button>
    </div>
  );
};
export default ButtonComponent;
