import { Button } from "flowbite-react";
const SubmitBtn = ({ busy }) => {
  return (
    <Button
      type="submit"
      className="bg-primary rounded-lg w-[200px] mt-4 shadow-sm"
      disabled={busy}
    >
      {busy ? "submitting..." : "submit"}
    </Button>
  );
};

export default SubmitBtn;
