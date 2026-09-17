// =========================================================
// STAT CARD COMPONENT
// =========================================================
//
// This component displays a dashboard statistic.
//
// Example:
//
// <StatCard title="Total Bugs" value={10} />
//
// will display:
//
// Total Bugs
// 10
// =========================================================

function StatCard({ title, value }) {

  return (

    <div>

      {/* Statistic title */}
      <h3>{title}</h3>

      {/* Statistic value */}
      <p>{value}</p>

    </div>

  );
}


// Export component so other files can use it
export default StatCard;