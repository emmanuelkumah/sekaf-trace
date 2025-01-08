import React, { useState } from "react";
import { Button, Table, Spinner, Alert } from "flowbite-react";
import {
  Link,
  useNavigate,
  useSearchParams,
  useNavigation,
  useLoaderData,
} from "react-router-dom";
import { MdEdit, MdEditNote } from "react-icons/md";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { dummyFarms } from "../../utils/dummyData";
const DisplayFarms = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "0", 10);
  const pageSize = 10;
  const totalPages = Math.ceil(dummyFarms.length / pageSize);

  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  let soyaFarms;

  //   const filterFarmsBySoya = (data) => {
  //     soyaFarms = data.filter((farm) => {
  //       return farm.cropType !== "SHEA";
  //     });
  //   };

  //   if (data) {
  //     filterFarmsBySoya(data);
  //   }

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), pageSize });
  };

  const handleSearch = (e) => {
    setSearchFarm(e.target.value);
  };

  const handleEditFarm = (farmerId, page) => {
    navigate(`${farmerId}/edit?page=${page}`);
  };
  return (
    <>
      <div className="my-10">
        <div className="flex justify-between">
          <Button className="bg-secondary text-primary hover:text-slate-100 hover:bg-main mt-10">
            <Link to="new">Add new farm</Link>
          </Button>
          <Button
            className="bg-secondary text-primary hover:text-slate-100 hover:bg-main mt-10"
            onClick={() => setOpenDownloadModal(!openDownloadModal)}
          >
            Download Farm Details
          </Button>
          {/* {openDownloadModal && (
            <FarmDetailsDownload
              openDownloadModal={openDownloadModal}
              setOpenDownloadModal={setOpenDownloadModal}
            />
          )} */}
        </div>

        <div>
          <input
            className="w-full rounded-lg my-10"
            type="text"
            name="search"
            id=""
            placeholder="Search farm by name"
            value="Search farm"
            autoFocus
            onChange={handleSearch}
          />
        </div>
      </div>
      {isNavigating ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" size="xl" />
        </div>
      ) : (
        <div>
          {error && (
            <Alert color="info" className="mt-2">
              {error.data.message}
            </Alert>
          )}

          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Farm name</Table.HeadCell>
                <Table.HeadCell>Farm size(acres)</Table.HeadCell>
                <Table.HeadCell>Crop type </Table.HeadCell>

                <Table.HeadCell>GPS address</Table.HeadCell>
                <Table.HeadCell>Latitude</Table.HeadCell>
                <Table.HeadCell>Longitude</Table.HeadCell>

                <Table.HeadCell>Community</Table.HeadCell>
                <Table.HeadCell>Tracking number </Table.HeadCell>

                <Table.HeadCell>Actions</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {dummyFarms.map((farm) => (
                  <Table.Row
                    key={farm.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {farm.farmName}
                    </Table.Cell>
                    <Table.Cell>{farm.landSize}</Table.Cell>
                    <Table.Cell>{farm.cropType}</Table.Cell>
                    <Table.Cell>{farm.gpsAddress}</Table.Cell>
                    <Table.Cell>{farm.latitude}</Table.Cell>

                    <Table.Cell>{farm.longitude}</Table.Cell>

                    <Table.Cell>{farm.community.name}</Table.Cell>
                    <Table.Cell>{farm.trackingNumber}</Table.Cell>

                    <Table.Cell>
                      <Link to={`${farm.id}/edit`}>
                        <MdEdit />
                      </Link>
                    </Table.Cell>
                    <div className="flex justify-end">
                      <Table.Cell className="">
                        <Link to={`${farm.id}/activities`}>
                          <Button className="bg-main hover:bg-secondary">
                            Start Activity
                          </Button>
                        </Link>
                      </Table.Cell>
                      <Table.Cell className="">
                        <Link to={`${farm.id}/viewactivities`}>
                          <Button className="bg-main hover:bg-secondary">
                            View Activity
                          </Button>
                        </Link>
                      </Table.Cell>
                    </div>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      )}
      <div>
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
    </>
  );
};
export default DisplayFarms;
