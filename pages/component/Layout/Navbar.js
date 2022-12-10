import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import Cookies from "js-cookie";
import axios from "../../../axios"
export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  let router = useRouter();

  const LogoutHandler = () => {
    const token = Cookies.get("token");

    let config = {
      headers: { Authorization: `Token ${token}` },
    };
    axios.post("usrserv/logout", "", config).then((res) => {
      if (res.data.status === "success") {
        Cookies.remove("userData");
        Cookies.remove("token");
        router.push("/");
      }
    });
  };
  return (
    <div className="p-4">
      <nav className="w-full bg-white shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <div className="flex gap-4">
                <a href="javascript:void(0) flex-auto">
                  <h2 className="text-2xl font-bold items-center">FISST</h2>
                </a>
              </div>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <Button colorScheme="blue" onClick={() => LogoutHandler()}>
            Logout
          </Button>
        </div>
      </nav>
    </div>
  );
}
