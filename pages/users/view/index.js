import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "../../../axios";
const View = (props) => {
  //useState
  const [user, setuser] = useState("");
  //router
  const router = useRouter();
  //useEffect
  useEffect(() => {
    const token = Cookies.get("token");
    let config = {
      headers: { Authorization: `Token ${token}` },
    };
    axios
      .get(`usrserv/employee_by_id/${router.query.id}`, config)
      .then((res) => {
        setuser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Admin - View User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4 ">
        <div className="flex gap-2 items-center pb-4">
          <span className="flex-auto font-bold underline">View User</span>
        </div>
        <div className="border border-graycolor cursor-pointer">
          <div className="grid grid-cols-5 px-4 p-1">
            <div className="col-span-1 text-blue-500 text-semibold border-r border-graycolor p-1">
              Full Name
            </div>
            <div className="col-span-4 p-1">{user.full_name}</div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-1 text-blue-500 text-semibold border-r border-graycolor p-1">
              Date of Joining
            </div>
            <div className="col-span-4 p-1">{user.doj}</div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-1 text-blue-500 text-semibold border-r border-graycolor p-1">
              Date of Birth
            </div>
            <div className="col-span-4 p-1">{user.dob}</div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-1 text-blue-500 text-semibold border-r border-graycolor p-1">
              Gender
            </div>
            <div className="col-span-4 p-1">{user.gender}</div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-1 text-blue-500 text-semibold border-r border-graycolor p-1">
              Mobile
            </div>
            <div className="col-span-4 p-1">{user.phone_no}</div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-1 text-blue-500 text-semibold border-r border-graycolor p-1">
              Email
            </div>
            <div className="col-span-4 p-1">{user.email_id}</div>
          </div>

          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-1 text-blue-500 text-semibold border-r border-graycolor p-1">
              Address
            </div>
            <div className="col-span-4 p-1">{user.address_id}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default View;
