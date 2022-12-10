import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../../axios";
const AllCount = () => {
  const [data, setdata] = useState("");
  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token);
    let config = {
      headers: {
        Authorization: "Token" + " " + token,
      },
    };
    axios
      .get("contestserv/countDashboardAdmin", config)
      .then((res) => setdata(res.data[0]))
      .catch((err) => console.log(err));
  }, []);
  console.log(data);
  return (
    <>
      <div class="grid grid-cols-4 gap-4 p-4">
        <div class="col-span-1 box-border h-32 w-40 p-4 border-4 rounded-lg flex gap-2 flex-col justify-center">
          <span className="font-bold text-center">Users</span>
          <span className="text-center">{data.userCount}</span>
        </div>
        <div class="col-span-1 box-border h-32 w-40 p-4 border-4 rounded-lg flex gap-2 flex-col justify-center">
          <span className="font-bold text-center">Active Users</span>
          <span className="text-center"> {data.userActiveCount}</span>
        </div>
        <div class="col-span-1 box-border h-32 w-40 p-4 border-4 rounded-lg flex gap-2 flex-col justify-center">
          <span className="font-bold text-center">InActive Users</span>
          <span className="text-center"> {data.userInactiveCount}</span>
        </div>
        <div class="col-span-1 box-border h-32 w-40 p-4 border-4 rounded-lg flex gap-2 flex-col justify-center">
          <span className="font-bold text-center">App Contest</span>
          <span className="text-center"> {data.appNameCount}</span>
        </div>
        <div class="col-span-1 box-border h-32 w-40 p-4 border-4 rounded-lg flex gap-2 flex-col justify-center">
          <span className="font-bold text-center">Image Contest</span>
          <span className="text-center"> {data.imageCount}</span>
        </div>
        <div class="col-span-1 box-border h-32 w-40 p-4 border-4 rounded-lg flex gap-2 flex-col justify-center">
          <span className="font-bold text-center">Potery contest</span>
          <span className="text-center"> {data.appNameCount}</span>
        </div>
        <div class="col-span-1 box-border h-32 w-40 p-4 border-4 rounded-lg flex gap-2 flex-col justify-center">
          <span className="font-bold text-center">Quiz Contest</span>
          <span className="text-center"> {data.quizCount}</span>
        </div>
        <div class="col-span-1 box-border h-32 w-40 p-4 border-4 rounded-lg flex gap-2 flex-col justify-center">
          <span className="font-bold text-center">Trivia Contest</span>
          <span className="text-center"> {data.triviaCount}</span>
        </div>
      </div>
    </>
  );
};
export default AllCount;
