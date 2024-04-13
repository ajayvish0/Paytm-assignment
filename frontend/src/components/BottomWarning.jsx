import { Link } from "react-router-dom";

const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div className="text-sm py-2 flex justify-center">
      <p className="text-">{label}</p>
      <Link
        to={to}
        className="  underline  underline-offset-2 cursor-pointer pl-1 "
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default BottomWarning;
