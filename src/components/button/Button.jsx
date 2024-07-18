const Button = ({ children, onClick }) => {
  return (
    <button
      className="bottom-button w-[180px] h-[40px] flex justify-center items-center gap-2 bg-[#0BA42D] text-white rounded-lg absolute mt-3"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
