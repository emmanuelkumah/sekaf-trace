import React from "react";
import { Card } from "flowbite-react";

const DashboardCard = ({ title, icon, data }) => {
  return (
    <>
      <Card className="max-w-sm bg-primary hover:bg-secondary hover:text-cyan-50">
        <div className="flex justify-between">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900  dark:text-white">
            {title}
          </h5>
          <p className="text-2xl">{icon}</p>
        </div>

        <p className="text-3xl font-semi-bold text-gray-700 dark:text-gray-400">
          {data}
        </p>
      </Card>
    </>
  );
};

export default DashboardCard;
