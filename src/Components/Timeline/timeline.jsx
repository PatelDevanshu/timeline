import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

// AIzaSyA5uemAs2WR9KQkdVReA9VRcaZ8jA6ZLAM
import GoogleMapReact from "google-map-react";
import "./timeline.css";
import axios from "axios";
import graphimg from "../Images/graphimg.png";
import { useState } from "react";

const Polyline = React.memo(({ path }) => {
  const renderPolylines = () => {
    return path.map((point, index) => (
      <polyline
        key={index}
        path={point}
        options={{
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        }}
      />
    ));
  };

  return renderPolylines();
});

const TimeLine = () => {
  const [userdata, setUserdata] = useState([""]);
  const [userpath, setUserpath] = useState([""]);
  const [time, setTime] = useState([""]);
  const [iddata, setIddata] = useState([""]);
  const [selectedid, setSelectedid] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4001/users")
      .then((res) => res.json())
      .then((data) => setUserdata(data))
      .catch((err) => console.log(err));
    fetch("http://localhost:4001/users/path")
      .then((res) => res.json())
      .then((data) => setUserpath(data))
      .catch((err) => console.log(err));
    fetch("http://localhost:4001/users/time")
      .then((res) => res.json())
      .then((data) => setTime(data))
      .catch((err) => console.log(err));
    fetch("http://localhost:4001/users/useriddata")
      .then((res) => res.json())
      .then((data) => setIddata(data))
      .catch((err) => console.log(err));
  }, []);
  const handleUserdata = userdata.map((d, i) => {
    // console.log("start", d);
    // return (
    //   <div>
    //     <div>{d.id}</div>
    //     <div>{d.userid}</div>
    //     <div>{d.username}</div>
    //     <div>{d.start}</div>
    //     <div>{d.destination}</div>
    //   </div>
    // );
  });
  const handleTimeline = time.map((d, i) => {
    // console.log("time", d);

    return (
      <div className="usertimeline">
        <div className="timedata">Start Time : {d.start_time}</div>
        <div className="timedata">Stop Time : {d.stop_time}</div>
      </div>
    );
  });

  // };

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
    // { 1: "January" },
    // { 2: "Feburary" },
    // { 3: "March" },
    // { 4: "April" },
    // { 5: "May" },
    // { 6: "June" },
    // { 7: "July" },
    // { 8: "August" },
    // { 9: "September" },
    // { 10: "October" },
    // { 11: "November" },
    // { 12: "December" },
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
      // legend: { position: "chartArea" },
      title: {
        display: true,
        text: "User Timeline",
      },
    },
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        // label: "Product A",
        data: [20, 30, 40, 50, 60, 70],
        backgroundColor: "green",
      },
    ],
  };

  // let path = [
  //   {},
  //   // { lat: 28.6138954, lng: 77.2090057 },
  //   // { lat: 23.0216238, lng: 72.5797068 },
  //   // { lat: 19.0785451, lng: 72.878176 },
  // ];

  //fetched userdata
  let arrUser = [{ id: "", uname: "" }];
  let uiddata = iddata.map((d) => {
    // console.log("in iddata", d);
    return { id: d.id, uname: d.user_name };
  });
  arrUser = [].concat(uiddata);

  //uswerrid
  const handleUserid = async (event) => {
    const uid = event.target.value;
    console.log(uid);
    setSelectedid(uid);
    await axios
      .post("http://localhost:4001/users/userData", { uid })
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  //path
  let path = [{ lat: "", lng: "" }];
  let usrpath = userpath.map((d) => {
    return { lat: d.latitude, lng: d.longitude };
  });
  path = [].concat(usrpath);

  const intitialcenter = { lat: 20.39012149793167, lng: 72.90738269251017 };
  // console.log("usepth", path);

  const handleApiLoaded = (map, maps) => {
    new maps.Polyline({
      path: path,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: map,
    });
    path.map((x, i) => {
      if (i % 2 !== 0) {
        new maps.Marker({
          position: x,
          map: map,
          options: {
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "blue",
              fillOpacity: 1,
              strokeWeight: 2,
            },
          },
        });
      } else {
        new maps.Marker({
          position: x,
          map: map,
          options: {
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "red",
              fillOpacity: 1,
              strokeWeight: 2,
            },
          },
        });
      }
    });
  };

  // const handleApiLoaded = (map, maps) => {
  //   renderPolylines(map, maps);
  // };

  return (
    <div>
      <div className="header">
        <div className="head1">
          <div className="headcontent">Dreamer Timeline</div>
          <div className="headcontent">Logo</div>
        </div>
      </div>
      <div className="main">
        <div className="usercred">
          <div className="userdropdown">
            <select
              name="usercredentials"
              className="usercredential"
              id="usercrd"
              onChange={handleUserid}
              value={selectedid}
            >
              <option value="">Select</option>
              {arrUser.map((d) => {
                return (
                  <option key={d.id} value={d.id}>
                    {d.uname}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="container1">
          <div className="date">
            <div className="month">
              <select name="month" className="dateform" id="month">
                {arrMonth.map((a) => {
                  return (
                    <option
                      selected={currentMonth}
                      className="monthname scroll"
                    >
                      {a}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="year">
              <select name="yeardropdown" className="dateform" id="yeardrop">
                {arrYear.map((a) => {
                  return (
                    <option selected={currentYear} className="yrname scroll">
                      {a}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="day">
              <select name="daydropdown" className="dateform" id="daydrop">
                {arrDate.map((a) => {
                  return (
                    <option selected={currentDate} className="datename scroll">
                      {a}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="graphbutton">
            <img src={graphimg} alt="graphimg" />
          </div>
        </div>

        <div className="container2">
          <h1>Time Line Map</h1>
        </div>
        <div className="container3">
          {/* AIzaSyA5uemAs2WR9KQkdVReA9VRcaZ8jA6ZLAM */}
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyA5uemAs2WR9KQkdVReA9VRcaZ8jA6ZLAM",
            }}
            defaultCenter={intitialcenter}
            defaultZoom={10}
            // yesIWantToUseGoogleMapApi={true}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            <Polyline path={path} />
          </GoogleMapReact>
        </div>
      </div>
      <div className="footer">
        <div>
          <div className="graph">
            <div className="graphhead">Graph</div>
            <div className="graphimg">
              <Bar options={option} data={data} className="graphdata" />
            </div>
          </div>
          <div className="timelinetxt">User Timeline</div>
          <div className="userdata">{handleUserdata}</div>
          <div className="timelinedata">{handleTimeline}</div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
