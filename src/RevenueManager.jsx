import { useState } from "react";

export default function RevenueManager() {

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Paris Package",
      supplier: "Hotelbeds",
      netPrice: 500,
      markup: 20
    },
    {
      id: 2,
      name: "Rome Package",
      supplier: "RateHawk",
      netPrice: 700,
      markup: 15
    }
  ]);

  const calculateSalePrice = (net, markup) => {
    return (
      Number(net) +
      (Number(net) * Number(markup)) / 100
    );
  };

  const totalRevenue = products.reduce(
    (sum, item) =>
      sum +
      calculateSalePrice(
        item.netPrice,
        item.markup
      ),
    0
  );

  const totalProfit = products.reduce(
    (sum, item) =>
      sum +
      (calculateSalePrice(
        item.netPrice,
        item.markup
      ) - item.netPrice),
    0
  );

  return (
    <div className="dashboard">

      <h1>Revenue Optimization Engine</h1>

      <div className="stats">

        <div className="statCard">
          <h3>Total Revenue</h3>
          <p>€{totalRevenue.toFixed(2)}</p>
        </div>

        <div className="statCard">
          <h3>Total Profit</h3>
          <p>€{totalProfit.toFixed(2)}</p>
        </div>

        <div className="statCard">
          <h3>Products</h3>
          <p>{products.length}</p>
        </div>

      </div>

      <div className="packageList">

        {products.map((item) => {

          const salePrice =
            calculateSalePrice(
              item.netPrice,
              item.markup
            );

          const profit =
            salePrice - item.netPrice;

          return (

            <div
              key={item.id}
              className="packageCard"
            >

              <h3>{item.name}</h3>

              <p>
                Supplier:
                {" "}
                {item.supplier}
              </p>

              <p>
                Net:
                {" "}
                €{item.netPrice}
              </p>

              <p>
                Markup:
                {" "}
                {item.markup}%
              </p>

              <p>
                Sale Price:
                {" "}
                €{salePrice.toFixed(2)}
              </p>

              <p>
                Profit:
                {" "}
                €{profit.toFixed(2)}
              </p>

            </div>

          );

        })}

      </div>

    </div>
  );
}