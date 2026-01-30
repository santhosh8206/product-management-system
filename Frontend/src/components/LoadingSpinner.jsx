import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <div className="text-center my-4">
      <Spinner animation="border" />
    </div>
  );
};

export default LoadingSpinner;
