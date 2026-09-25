import StatCard from "../components/StatCard";

export default function Dashboard({
  packages,
  bookings
}) {

  return (
    <>

      <div className="stats">

        <StatCard
          title="Packages"
          value={packages.length}
        />

        <StatCard
          title="Reservations"
          value={bookings.length}
        />

        <StatCard
          title="Customers"
          value={
            new Set(
              bookings.map(
                b => b.email
              )
            ).size
          }
        />

        <StatCard
          title="Revenue"
          value={
            "€" +
            bookings.filter(
              b => b.status === "Paid"
            ).length * 500
          }
        />

      </div>

    </>
  );
}