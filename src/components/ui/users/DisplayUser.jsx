import { useState } from "react";
import { Table, Button, Alert } from "flowbite-react";
import { MdEdit, MdPassword } from "react-icons/md";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { apiCalls } from "../../../api/axios";
import { Link, useSearchParams, useLoaderData } from "react-router-dom";
const DisplayUser = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "0", 10);
  const pageSize = 5;
  console.log(currentPage);
  console.log(searchParams);
  const { data, totalPages } = useLoaderData();
  console.log(Array.isArray(data));
  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    return <div>Error loading users. Please try again.</div>;
  }

  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
  };

  const handlePageChange = (newPage) => {
    // Update URL search params with new page number
    setSearchParams({ page: newPage.toString(), pageSize });
  };
  return (
    <div>
      <div className="container mx-auto">
        <div className="my-10">
          <Button
            type="buton"
            className="bg-accent mt-[20%] cursor-pointer md:mt-10 text-primary hover:text-slate-100 hover:bg-secondary"
          >
            <Link to="new-user" className="text-white">
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
              {data.map((user) => (
                <Table.Body className="divide-y" key={user.id}>
                  <Table.Row className="bg-white border-gray-700 dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {user.firstName}
                    </Table.Cell>
                    <Table.Cell>{user.lastName}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phone}</Table.Cell>
                    <Table.Cell>{user.roles}</Table.Cell>

                    <Table.Cell>
                      <div className="flex justify-end gap-5">
                        <Link to={`${user.id}/edit-user`}>
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

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "0";
  const size = url.searchParams.get("pageSize") || "5";

  try {
    const response = await apiCalls.getUsers(page, size);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
