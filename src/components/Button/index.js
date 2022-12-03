import "./index.scss";

const Button = ({ style, action, size, className, children }) => {
  return (
    <>
      <button
        className={`btn btn--${size ? size : "md"} btn--${style} ${className}`}
        onClick={action}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
