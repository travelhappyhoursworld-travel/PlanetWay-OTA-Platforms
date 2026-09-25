export default function Packages({
  packages,
  deletePackage
}) {

  return (
    <div>

      <h2>Packages</h2>

      {packages.map(item => (

        <div
          key={item.id}
          className="packageCard"
        >

          <h3>{item.title}</h3>

          <p>{item.destination}</p>

          <button
            onClick={() =>
              deletePackage(item.id)
            }
          >
            Delete
          </button>

        </div>

      ))}

    </div>
  );
}