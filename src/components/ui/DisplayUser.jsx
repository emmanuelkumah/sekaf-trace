import { useState } from "react";
import { Table, Button, Alert } from "flowbite-react";
import { MdEdit, MdPassword } from "react-icons/md";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { dummyUsers } from "../../utils/dummyData";

import { Link, useSearchParams, useLoaderData } from "react-router-dom";
const DisplayUser = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "0", 10);
  const pageSize = 5;
  const totalPages = Math.ceil(dummyUsers.length / pageSize);

  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
  };
  return (
    <div>
      <div className="container mx-auto">
        <div className="my-10">
          <Button
            type="buton"
            className="bg-accent mt-[20%] cursor-pointer md:mt-10 text-primary hover:text-slate-100 hover:bg-secondary"
          >
            <Link to="new" className="text-white">
              {" "}
              Add new user
            </Link>
          </Button>

          <div />
          <input
            className="w-full rounded-lg my-10"
            type="text"
            name="search"
            id=""
            placeholder="Search user by first name"
            value={search}
            autoFocus
            onChange={handleSearch}
          />
        </div>

        <div>
          {error && (
            <Alert color="info" className="mt-2">
              {error.data.message}
            </Alert>
          )}
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>First name</Table.HeadCell>
                <Table.HeadCell>Last name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Phone </Table.HeadCell>
                <Table.HeadCell>Role </Table.HeadCell>

                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              {dummyUsers
                ?.filter((user) => {
                  return search.toLowerCase() === ""
                    ? user
                    : user.firstName.toLowerCase().includes(search);
                })
                .map((user) => (
                  <Table.Body className="divide-y" key={user.id}>
                    <Table.Row className="bg-white border-gray-700 dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {user.firstName}
                      </Table.Cell>
                      <Table.Cell>{user.lastName}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.phoneNumber}</Table.Cell>
                      <Table.Cell>Role</Table.Cell>

                      <Table.Cell>
                        <div className="flex justify-end gap-5">
                          <Link to={`${user.id}/edit`}>
                            <MdEdit className="text-xl hover:text-teal-500 cursor-pointer" />
                          </Link>
                          <div>
                            <Link to={`${user.id}/update-status`}>
                              Disable user
                            </Link>
                          </div>
                          <div>
                            <Link to={`${user.id}/reset-password`}>
                              <MdPassword className="text-xl hover:text-primary cursor-pointer" />
                            </Link>
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
        </div>

        <div>
          <div className="flex justify-center gap-4">
            <Button
              className="bg-primary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              <BiChevronLeft />
              Previous
            </Button>

            <Button
              className="bg-secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <BiChevronRight />
            </Button>
          </div>
          <p className="text-sm text-center mt-4">
            {`Showing page ${currentPage} of ${totalPages} pages `}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayUser;
