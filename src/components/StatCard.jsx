export default function StatCard({
  title,
  value
}) {
  return (
    <div className="statCard">

      <h3>{title}</h3>

      <p>{value}</p>

    </div>
  );
}