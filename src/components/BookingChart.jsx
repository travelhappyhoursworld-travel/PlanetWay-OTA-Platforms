import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default function BookingChart() {

  const data = {

    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],

    datasets: [

      {
        label: "Bookings",

        data: [
          12,
          19,
          15,
          22,
          34,
          28,
          40
        ]
      }

    ]

  };

  return (
    <Line data={data} />
  );
}