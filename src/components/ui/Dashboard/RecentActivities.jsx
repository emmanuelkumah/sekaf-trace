import { Table, Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
const RecentActivities = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userActivities, setUserActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const dummyData = [
    {
      id: 1,
      activityDate: "10/10/2024",
      activityName: "Nam nulla.",
      description: "Integer non velit.",
    },
    {
      id: 2,
      activityDate: "8/25/2024",
      activityName: "Morbi vel lectus in quam fringilla rhoncus.",
      description: "Praesent blandit.",
    },
    {
      id: 3,
      activityDate: "10/20/2024",
      activityName: "Quisque ut erat.",
      description: "Nulla facilisi.",
    },
    {
      id: 4,
      activityDate: "7/16/2024",
      activityName:
        "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.",
      description: "Nullam porttitor lacus at turpis.",
    },
    {
      id: 5,
      activityDate: "5/2/2024",
      activityName: "In hac habitasse platea dictumst.",
      description: "In congue.",
    },
    {
      id: 6,
      activityDate: "1/7/2025",
      activityName: "Suspendisse potenti.",
      description: "Ut tellus.",
    },
    {
      id: 7,
      activityDate: "11/25/2024",
      activityName: "In hac habitasse platea dictumst.",
      description: "Maecenas tincidunt lacus at velit.",
    },
    {
      id: 8,
      activityDate: "6/15/2024",
      activityName: "Suspendisse potenti.",
      description: "Integer a nibh.",
    },
    {
      id: 9,
      activityDate: "2/16/2024",
      activityName: "Phasellus id sapien in sapien iaculis congue.",
      description: "Aliquam quis turpis eget elit sodales scelerisque.",
    },
    {
      id: 10,
      activityDate: "4/9/2024",
      activityName: "Aenean fermentum.",
      description: "Praesent lectus.",
    },
  ];

  return (
    <>
      <div className="overflow-x-auto my-10">
        {isLoading ? (
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" size="xl" />
          </div>
        ) : (
          <Table>
            <Table.Head>
              <Table.HeadCell>Activity</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>

              <Table.HeadCell>Activity Date</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {dummyData.map((activity) => (
                <Table.Row
                  key={activity.activityDate}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {activity.activityName.toLowerCase()}
                  </Table.Cell>
                  <Table.Cell>{activity.description}</Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {activity.activityDate}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}

        {/* <div className="mt-4">
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
              disabled={currentPage === 0}
            >
              <BiChevronLeft />
              Previous
            </Button>

            <Button
              onClick={handlePageChange}
              disabled={currentPage === data?.totalPages}
            >
              Next
              <BiChevronRight />
            </Button>
          </div>
          <p className="text-sm text-center mt-4">
            {`Showing page ${currentPage} of ${data?.totalPages} pages `}
          </p>
        </div> */}
      </div>
    </>
  );
};

export default RecentActivities;
