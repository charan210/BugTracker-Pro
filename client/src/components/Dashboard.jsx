// =========================================================
// DASHBOARD COMPONENT
// =========================================================
//
// This component displays the overall bug statistics.
//
// App.jsx calculates the statistics and passes them here.
// Dashboard.jsx is responsible only for displaying them.
//
// =========================================================

import StatCard from "./StatCard";

function Dashboard({
  totalBugs,
  openBugs,
  inProgressBugs,
  resolvedBugs,
  closedBugs
}) {
  return (
    <div>

      <StatCard
        title="Total Bugs"
        value={totalBugs}
      />

      <StatCard
        title="Open"
        value={openBugs}
      />

      <StatCard
        title="In Progress"
        value={inProgressBugs}
      />

      <StatCard
        title="Resolved"
        value={resolvedBugs}
      />

      <StatCard
        title="Closed"
        value={closedBugs}
      />

    </div>
  );
}

export default Dashboard;