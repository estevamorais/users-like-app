import "./index.scss";

const Button = ({ type, action, size, className, children }) => {
  return (
    <>
      <button
        className={`btn btn--${size ? size : "md"} btn--${type} ${className}`}
        onClick={action}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
