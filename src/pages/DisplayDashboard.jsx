import React from "react";
import {
  DashboardBarCharts,
  DashboardCard,
  RecentActivities,
} from "../components";
import { FaUserGroup } from "react-icons/fa6";
import { PiPlant } from "react-icons/pi";
import { LuTrees } from "react-icons/lu";
import { IoQrCodeOutline } from "react-icons/io5";
import { Spinner } from "flowbite-react";
import { useLoaderData, useNavigation } from "react-router-dom";

const DisplayDashboard = () => {
  let navigation = useNavigation();
  return (
    <div>
      <div className="mx-10">
        {navigation.state === "loading" ? (
          <Spinner aria-label="Default status example" />
        ) : (
          <section>
            <div className="grid gap-5 mt-[30%]  md:grid-cols-4 md:m-10">
              <DashboardCard
                title="Total Farmers"
                data="130"
                icon={<FaUserGroup />}
              />
              <DashboardCard title="Total Farms" data="20" icon={<PiPlant />} />
              <DashboardCard
                title="Total Farm activities"
                data="100"
                icon={<IoQrCodeOutline />}
              />
              <DashboardCard
                title="Total Acerage"
                data="200"
                icon={<LuTrees />}
              />
            </div>
          </section>
        )}

        <div>
          <h3 className="text-xl my-5 md:text-2xl">
            Registered farmers in a commnunity
          </h3>
          <DashboardBarCharts />
        </div>
        <div>
          <h3 className="text-xl my-5 md:text-2xl">User Activities</h3>
          <RecentActivities />
        </div>
      </div>
    </div>
  );
};

export default DisplayDashboard;
