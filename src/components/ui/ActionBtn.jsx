import { Button } from "flowbite-react";
const ActionBtn = ({ children }) => {
  return (
    <Button
      type="submit"
      className="bg-primary rounded-lg w-[200px] mt-4 shadow-sm"
    >
      {children}
    </Button>
  );
};

export default ActionBtn;
