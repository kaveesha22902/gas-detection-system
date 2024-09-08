// ExampleComponent.js
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig"; // Adjust the path as necessary
import {
  ref,
  onValue,
  get,
  set,
  query,
  orderByKey,
  startAt,
  endAt,
} from "firebase/database";
import PastData from "./PastData";
import Mq2bar from "./Mq2bar";
import Mq6bar from "./Mq6bar";

const Getdatarealtime = () => {
  const [count, setCount] = useState(null);
  const [latestData, setLatestData] = useState(null);
  const [fanStatus, setFanStatus] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const pastData = [];
      const countRef = ref(db, "count");

      // Get the current count value
      const countSnapshot = await get(countRef);
      if (countSnapshot.exists()) {
        const countValue = countSnapshot.val();

        // Query for past data
        const startKey = "Reading1";
        const endKey = `Reading${countValue - 1}`;
        const dataRef = ref(db);

        const pastDataQuery = query(
          dataRef,
          orderByKey(),
          startAt(startKey),
          endAt(endKey)
        );
        await get(pastDataQuery).then((snapshot) => {
          if (snapshot.exists()) {
            pastData.push(...Object.values(snapshot.val()));
          }
        });

        // Update state with fetched data
        setData(pastData);
      }
    };

    fetchData();
  }, []);

  // if mq2 > 50 && mq6 > ? "gas leak" : "no gas leak";
  // weigh sensor < 100 && "gas is low"

  useEffect(() => {
    // Reference to the `count` value
    const countRef = ref(db, "count");

    // Listener for real-time updates to the `count`
    const unsubscribeFromCount = onValue(countRef, (snapshot) => {
      if (snapshot.exists()) {
        const countValue = snapshot.val();
        setCount(countValue);
      } else {
        console.log("No count data available");
      }
    });

    return () => unsubscribeFromCount();
  }, []);

  useEffect(() => {
    // Reference to the `count` value
    const countRef = ref(db, "Fan");

    // Listener for real-time updates to the `count`
    const unsubscribeFromCount = onValue(countRef, (snapshot) => {
      if (snapshot.exists()) {
        const countValue = snapshot.val();
        setFanStatus(countValue);
      } else {
        console.log("No fan data available");
      }
    });

    return () => unsubscribeFromCount();
  }, []);

  useEffect(() => {
    // Reference to the dynamically constructed path
    const dataPath = `Reading${count}`;
    const dataRef = ref(db, dataPath);
    console.log(dataPath);

    // Set up a listener for real-time data
    const unsubscribe = onValue(
      dataRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setLatestData(snapshot.val());
        } else {
          console.log("No data available at the path");
        }
      },
      (error) => {
        console.error("Error fetching data: ", error);
      }
    );

    // Cleanup listener on component unmount or when count changes
    return () => unsubscribe();
  }, [count]);

  const iframeStyle = {
    width: "200px",
    height: "200px",
    border: "none",
    margin: "20px",
  };

  const imgStyle = {
    width: "200px",
    height: "200px",
    display: "block",
    margin: "20px auto",
  };
  // Safe access to latestData properties
  const mq2 = latestData?.MQ2 ?? 0;
  const mq6 = latestData?.MQ6 ?? 0;
  const Weight = latestData?.Weight ?? 0;

  // Function to handle button click and update fanstatus
  const handleButtonClick = () => {
    if (fanStatus === 1) {
      const newFanStatus = fanStatus === 1 && 0; // Toggle fan status or set to 0
      const fanStatusRef = ref(db, `Fan`);

      set(fanStatusRef, newFanStatus)
        .then(() => {
          console.log("Fan status updated successfully");
          setFanStatus(newFanStatus); // Update local state to reflect the change
        })
        .catch((error) => {
          console.error("Error updating fan status: ", error);
        });
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      {/* <h1>Visual Representation</h1>
      {latestData ? (
        <>
          <pre>{JSON.stringify(latestData, null, 2)}</pre>
          <p>Count: {count}</p>
          <p>fanStatus: {fanStatus}</p>
        </>
      ) : (
        <p>Loading...</p>
      )} */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center justify-center m-5 gap-4">
          <Mq6bar data={mq6} />
        </div>
        <div className="flex items-center justify-center m-5 gap-4">
          <Mq2bar data={mq2} />
        </div>
        <div>
          {console.log("Visual Representation", fanStatus)}
          {fanStatus ? (
            <div className="flex items-center justify-center">
              <img
                src="https://i.postimg.cc/tCgvMT5Q/leak.png"
                alt="Leak"
                style={imgStyle}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <iframe
                src="https://lottie.host/embed/8023abe4-3a81-40c5-bcc7-a1378a816ead/G7vKowB2ZW.json"
                style={iframeStyle}
                title="Lottie Animation 1"
              ></iframe>
            </div>
          )}
        </div>
        <div>
          {Weight < 100 && (
            <div className="flex items-center justify-center">
              <iframe
                src="https://lottie.host/embed/d06056a9-3bdd-43f6-950c-2d5568a94d15/VgvYkTos2L.json"
                style={iframeStyle}
                title="Lottie Animation 2"
              ></iframe>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center m-2 flex-col">
          {fanStatus ? (
            <iframe
              src="https://lottie.host/embed/09f659b5-8dda-40fa-929b-1758d0207f3d/4K0t3KTi0g.json"
              className="size-72"
              title="Fan Animation"
            ></iframe>
          ) : null}
          <button
            onClick={handleButtonClick}
            disabled={fanStatus === 0}
            className={` text-white font-bold py-2 px-4 rounded ${
              fanStatus === 1 ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {fanStatus === 1 ? "Turn Off Fan" : "Turn On Fan"}
          </button>
        </div>
        <div className="m-6 max-w-64 overflow-x-auto">
          <PastData data={data} />
        </div>
      </div>
    </div>
  );
};

export default Getdatarealtime;
