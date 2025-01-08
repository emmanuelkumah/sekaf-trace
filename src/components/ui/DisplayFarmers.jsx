import React, { useState } from "react";
import { Table, Button, Spinner, Alert } from "flowbite-react";
import { MdEdit } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { dummyFarmers } from "../../utils/dummyData";
const DisplayFarmers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDownloadModal, setOpenDownloadModal] = useState(false);

  const [error, setError] = useState("");
  const [editFarmer, setEditFarmer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const currentPage = parseInt(searchParams.get("page") || "0", 10);
  const pageSize = 20;

  const totalPages = Math.ceil(dummyFarmers.length / pageSize);

  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), pageSize });
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="my-10">
        <div className="flex justify-between">
          <Button className="bg-secondary text-primary hover:text-slate-100 hover:bg-main mt-10">
            <Link to="new">Add new farmer / processor</Link>
          </Button>
          <Button
            className="bg-secondary text-primary hover:text-slate-100 hover:bg-main mt-10"
            onClick={() => console.log("download farmer")}
          >
            Download Farmer Details
          </Button>
        </div>
        <div />
        <input
          className="w-full rounded-lg my-10"
          type="text"
          name="search"
          placeholder="Search farmer by first name"
          value={search}
          autoFocus
          onChange={handleSearch}
        />
      </div>
      <div className="overflow-x-auto">
        {isNavigating ? (
          <Spinner aria-label="Extra large spinner example" size="xl" />
        ) : (
          <div>
            {error && (
              <Alert color="info" className="mt-2">
                {error.data.message}
              </Alert>
            )}
            <div className="overflow-x-auto">
              <Table className="w-full" hoverable>
                <Table.Head>
                  <Table.HeadCell>Picture</Table.HeadCell>
                  <Table.HeadCell>First Name</Table.HeadCell>
                  <Table.HeadCell>Last Name</Table.HeadCell>
                  <Table.HeadCell>Farmer Type</Table.HeadCell>

                  <Table.HeadCell>Age</Table.HeadCell>
                  <Table.HeadCell>Contact</Table.HeadCell>
                  <Table.HeadCell>Region</Table.HeadCell>
                  <Table.HeadCell>District</Table.HeadCell>
                  <Table.HeadCell>Community</Table.HeadCell>
                  <Table.HeadCell>Group</Table.HeadCell>
                  <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {dummyFarmers
                    .filter((farmer) => {
                      return search.toLowerCase() === ""
                        ? farmer
                        : farmer.firstName.toLowerCase().includes(search);
                    })
                    .map((farmer) => (
                      <Table.Row
                        key={farmer.id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {farmer.farmerImage === "" ? (
                            <FaUser />
                          ) : (
                            <img
                              src={farmer.farmerImage}
                              alt="farmer picture"
                              className="rounded-full w-10 h-10"
                            />
                          )}
                        </Table.Cell>
                        <Table.Cell>{farmer.firstName}</Table.Cell>
                        <Table.Cell>{farmer.lastName}</Table.Cell>
                        <Table.Cell>{farmer.farmerType}</Table.Cell>
                        <Table.Cell>{farmer.age}</Table.Cell>
                        <Table.Cell>{farmer.phone}</Table.Cell>
                        <Table.Cell>Region</Table.Cell>
                        <Table.Cell>District</Table.Cell>
                        <Table.Cell></Table.Cell>
                        community
                        <Table.Cell>group </Table.Cell>
                        <Table.Cell>
                          <Button onClick={() => console.log("edit farmer")}>
                            Edit farmer
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <BiChevronLeft />
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <BiChevronRight />
          </Button>
        </div>
        <p className="text-sm text-center mt-4">
          Showing page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export default DisplayFarmers;
