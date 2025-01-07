import { Link, Outlet } from "react-router-dom";
import { Navbar, Button } from "flowbite-react";
import logo from "../../assets/RML-logo.jpg";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";

const HomeLayout = () => {
  return (
    <div>
      <nav className="container mx-auto fixed top-0 left-0 right-0 z-50">
        <Navbar fluid rounded>
          <Navbar.Brand as={Link} href="#">
            <img
              src={logo}
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              FarmTrace
            </span>
          </Navbar.Brand>
          <div className="flex md:gap-6 md:order-2">
            <Link to="/tracker">
              <Button className="bg-secondary text-main md:hover:text-white   text-xl">
                Trace Produce
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-[#357960] text-xl">Login</Button>
            </Link>
          </div>
          <Navbar.Toggle />

          <Navbar.Collapse>
            <Navbar.Link href="#" active className="text-xl bg-[#357960]">
              Home
            </Navbar.Link>
            <Navbar.Link as={Link} href="#" className="text-xl">
              About
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </nav>
      <Outlet />
      <footer>
        <section className="grid place-items-center my-6">
          <p>Copyright © 2024 GTI Company Limited</p>

          <div className="flex space-x-3">
            <div className="flex gap-3">
              <BiPhoneCall />
              <p> Phone: (233)-222-222</p>
            </div>
            <div className="flex gap-3">
              <BiMailSend />
              <span> Email: (233)-222-222</span>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
};

export default HomeLayout;
