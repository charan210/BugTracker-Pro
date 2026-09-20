// =========================================================
// DASHBOARD COMPONENT
// =========================================================
//
// This component displays the overall bug statistics.
//
// App.jsx is responsible for:
// - Fetching bug data
// - Calculating statistics
//
// Dashboard.jsx is responsible for:
// - Displaying the statistics
//
// =========================================================

import StatCard from "./StatCard";

function Dashboard({
  totalBugs,
  statusStats
}) {
  return (
    <div>

      <StatCard
        title="Total Bugs"
        value={totalBugs}
      />

      <StatCard
        title="Open"
        value={statusStats.open}
      />

      <StatCard
        title="In Progress"
        value={statusStats.inProgress}
      />

      <StatCard
        title="Resolved"
        value={statusStats.resolved}
      />

      <StatCard
        title="Closed"
        value={statusStats.closed}
      />

    </div>
  );
}

export default Dashboard;