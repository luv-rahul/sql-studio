import { useState } from "react";
import { PROBLEM_STATEMENT_TABS } from "../../utils/constants";
import Description from "../../features/problems/Description";
import Editorial from "../problems/Editorial";
import Solutions from "../dashboard/Solutions";
import Submissions from "../submissions/Submissions";

const SCREENS = {
  desc: Description,
  edit: Editorial,
  sols: Solutions,
  subm: Submissions,
};

const ProblemStatement = () => {
  const [activeTab, setActiveTab] = useState("desc");
  const ActiveComponent = SCREENS[activeTab] ?? Description;

  return (
    <div className="problem-container">
      <div className="problem-header">
        {PROBLEM_STATEMENT_TABS.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tab.id);
            }}
          >
            <span className="material-symbols-outlined">{tab.icon}</span>
            {tab.name}
          </div>
        ))}
      </div>

      {ActiveComponent && <ActiveComponent />}
    </div>
  );
};

export default ProblemStatement;
