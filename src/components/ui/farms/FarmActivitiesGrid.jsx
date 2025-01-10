import React from "react";
import BackButton from "../BackButton";
import { activities } from "../../../utils/farmActivities";
import { Link } from "react-router-dom";
const FarmActivitiesGrid = () => {
  return (
    <section className="container mx-auto p-4">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6 text-center">Farm Activities</h1>
      <h3 className="text-xl font-bold mb-6 text-center">
        Select the activity
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <div key={activity.activityId}>
            <Link to={activity.link}>
              <div className="bg-secondary p-4 rounded-lg shadow-md flex flex-col items-center justify-center transition-transform hover:scale-105">
                <span className="text-4xl mb-2">{activity.icon}</span>
                <span className="text-lg text-white font-semibold text-center">
                  {activity.name}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FarmActivitiesGrid;
