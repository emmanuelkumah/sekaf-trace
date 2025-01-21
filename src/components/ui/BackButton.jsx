import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Button
      className="bg-primary rounded-lg w-[100px] mt-4 shadow-sm"
      onClick={handleGoBack}
    >
      Go Back
    </Button>
  );
};

export default BackButton;
