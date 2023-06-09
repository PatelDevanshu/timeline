import React from "react";
import { Bar } from "react-chartjs-2";
// import Leaflet from "../Leaflet";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import { MapContainer, TileLayer } from "react-leaflet";

// import {
//   GoogleMap,
//   Marker,
//   Polyline,
//   LoadScript,
// } from "@react-google-maps/api";

import "./timeline.css";
import "./leaflet.css";
import graphimg from "../Images/graphimg.png";
const TimeLine = () => {
  const arrYear = [];
  const arrDate = [];
  const arrMonth = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentYear = new Date().getFullYear();
  let currentDate = new Date().getDate();
  let currentMonth = new Date().getMonth();

  for (let i = 2000; i <= currentYear; i++) {
    arrYear[i] = i;
  }
  for (let i = 1; i <= currentDate; i++) {
    arrDate[i] = i;
  }
  console.log("cm", currentMonth);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const option = {
    responsive: true,
    plugins: {
      legend: { position: "chartArea" },
      title: {
        display: true,
        text: "Modular Bar Chart",
      },
    },
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Product A",
        data: [20, 30, 40, 50, 60, 70],
        backgroundColor: "green",
      },
      {
        label: "Product B",
        data: [15, 20, 25, 40, 45, 60],
        backgroundColor: "blue",
      },
    ],
  };
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 28.70406,
    lng: 77.102493,
  };

  const path = [
    { lat: 28.70406, lng: 77.102493 },
    // { lat: 28.4670734, lng: 77.5137649 },
    { lat: 23.0216238, lng: 72.5797068 },
  ];

  //leaflet

  const position = [51.505, -0.09];

  const polylinePositions = [
    [37.7749, -122.4194],
    [37.7749, -122.4014],
    [37.7818, -122.4014],
  ];

  return (
    <div>
      <div className="header">
        <div className="head1">
          <div className="headcontent">Dreamer Timeline</div>
          <div className="headcontent">Logo</div>
        </div>
      </div>
      <div className="main">
        <div className="container1">
          <div className="date">
            <div className="month">
              <select name="month" className="dateform" id="month">
                {arrMonth.map((a) => {
                  return <option selected={currentMonth}>{a}</option>;
                })}
              </select>
            </div>
            <div className="year">
              <select name="yeardropdown" className="dateform" id="yeardrop">
                {arrYear.map((a) => {
                  return <option selected={currentYear}>{a}</option>;
                })}
              </select>
            </div>

            <div className="day">
              <select name="daydropdown" className="dateform" id="daydrop">
                {arrDate.map((a) => {
                  return <option selected={currentDate}>{a}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="graphbutton">
            <img src={graphimg} alt="graphimg" />
          </div>
        </div>
        <div className="graph">
          <div className="graphhead">Graph</div>
          <div className="graphimg">
            <Bar options={option} data={data} className="graphdata" />
          </div>
        </div>
        <div className="container2">
          {/* <LoadScript googleMapsApiKey="AIzaSyCT1zlrTPeEW0ablyPx1r1oIRRkE4AMWy8">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={10}
                >
                  <Polyline
                    path={path}
                    options={{ strokeColor: "#FF00f0", strokeOpacity: 1.0 }}
                  />
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript> */}

          {/* //leaflet */}
          {/* <MapContainer
                center={[37.7749, -122.4194]}
                zoom={13}
                style={{ height: "100vh", width: "900px" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="Map data © OpenStreetMap contributors"
                />
              </MapContainer> */}
          {/* <Leaflet position={position} /> */}
          <MapContainer
            center={[40.505, -100.09]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
      </div>
      <div className="footer">
        <div></div>
      </div>
    </div>
  );
};

export default TimeLine;
