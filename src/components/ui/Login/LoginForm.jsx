import { Button, Checkbox, Label, TextInput, Alert } from "flowbite-react";
// import loginFarm from "../assets/images/loginFarm.jpg";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, loading } = useAuthContext();
  //   const { loginUser, error, loading, user } = useAuth();

  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (user) {
  //       navigate("/app");
  //     }
  //   }, [user, navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const success = await loginUser(email, password);
    if (success) {
      navigate("/app");
    }
  };
  return (
    <>
      <div className="bg-primary">
        <section className=" container mx-auto h-screen flex flex-col md:flex-row md:gap-10 justify-center items-center">
          <div className="w-1/2">
            {/* <img
              src={loginFarm}
              alt="Sample image"
              style={{ borderRadius: "20px" }}
            /> */}
          </div>
          <div className="w-1/2">
            <h3 className="text-2xl text-white my-5">Login to the app </h3>
            {/* {error && <Alert variant="destructive">{error}</Alert>} */}
            <form
              className="flex max-w-2xl flex-col gap-4 text-xl"
              onSubmit={handleFormSubmit}
            >
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="username"
                    value="Your email"
                    className="text-white"
                  />
                </div>
                <TextInput
                  id="username"
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    className="text-white"
                    htmlFor="password"
                    value="Your password"
                  />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>

              <Button type="submit" className="bg-secondary">
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default LoginForm;
