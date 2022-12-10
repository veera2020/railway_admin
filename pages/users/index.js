import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ButtonGroup,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "../../axios";
import Pagination from "../component/controls/Pagination";
//useTable
const useTable = () => {
  const [Loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLimit, setShowLimit] = useState(10);
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  return {
    currentPage,
    showLimit,
    Loading,
    gridApi,
    rowData,
    setCurrentPage,
    setLoading,
    setShowLimit,
    setGridApi,
    setRowData,
  };
};
const Manageusers = () => {
  const [query, setquery] = useState("");
  const [totalEmp, settotalEmp] = useState("");
  const [reload, setreload] = useState(false);
  //router
  const router = useRouter();
  //active and inactive
  const inactivefunc = (props) => {
    const token = Cookies.get("token");
    let config = {
      headers: {
        Authorization: "Token" + " " + token,
      },
    };
    axios
      .get(
        `/usrserv/adminEmployeeActiveInactive?id=${props.id}&status=0`,
        config
      )
      .then((res) => setreload(!reload));
  };
  const activefunc = (props) => {
    const token = Cookies.get("token");

    let config = {
      headers: {
        Authorization: "Token" + " " + token,
      },
    };
    axios
      .get(
        `/usrserv/adminEmployeeActiveInactive?id=${props.id}&status=1`,
        config
      )
      .then((res) => setreload(!reload));
  };
  //table
  const EmployeeTable = useTable();
  //get employees
  const [id, setId] = useState("");
  const fetchdata = async (page = 1, limit = 10) => {
    const token = Cookies.get("token");
    let config = {
      headers: {
        Authorization: "Token" + " " + token,
      },
    };
    EmployeeTable.setLoading(true);
    const response = await axios.get(
      `usrserv/adminEmployeeFetch?page=${page}&limit=${limit}&query=${query}`,
      config
    );
    if (response.status === 200 && response.data) {
      console.log(response.data);
      EmployeeTable.setRowData(response.data.data);
      settotalEmp(response.data.count);
    } else {
      EmployeeTable.setRowData([]);
    }
  };
  // Search Method
  const handlesearch = () => {
    fetchdata();
  };
  //useEffect
  useEffect(() => {
    fetchdata(EmployeeTable.currentPage, EmployeeTable.showLimit);
  }, [reload, EmployeeTable.currentPage, EmployeeTable.showLimit]);
  return (
    <>
      <Head>
        <title>Admin - Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4">
        <div className="py-3 font-bold underline">Users Details</div>
        <div className="border-gray-500 overflow-y-scroll border">
          <Table
            size="sm"
            scaleY="44"
            variant="striped"
            //  colorScheme="whatsapp"
          >
            <Thead className="bg-headergreen">
              <Tr>
                <Th>S.No</Th>
                <Th>User Id</Th>
                <Th>Name</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {EmployeeTable.rowData &&
                EmployeeTable.rowData.map((item, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{item.code}</Td>
                    <Td>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="link"
                        onClick={() => {
                          router.push(
                            {
                              pathname: "/users/view",
                              query: { id: item.id },
                            },
                            "users/view"
                          );
                        }}
                        //onClick={() => userDetailsFun(item.BaseidProofUpload)}
                      >
                        {item.full_name}
                      </Button>
                    </Td>
                    <Td>{item.status === 0 ? "In-Active" : "Active"}</Td>
                    <Td>
                      {item.status === 0 ? (
                        <img
                          width={24}
                          height={24}
                          alt="notvisible"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3e0_4g9785XMEHjzITUonXdIk0K_ET6tZVFSRq4lNhQ_AXlCNUaqk7N9WUZcHlzUnWtI&usqp=CAU"
                          role="presentation"
                          onClick={() => activefunc(item)}
                        />
                      ) : (
                        <img
                          width={24}
                          height={24}
                          alt="visible"
                          role="presentation"
                          onClick={() => inactivefunc(item)}
                          src="data:image/jpeg;base64,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"
                        />
                      )}
                    </Td>
                    {/* <Td>
                      <DateString date={item.created} />
                    </Td> */}
                    {/* <Td>
                      <ButtonGroup
                        spacing="1"
                        onClick={() => setId(item.User_id)}
                      >
                        <Button
                          size="sm"
                          colorScheme="blue"
                          variant="link"
                          onClick={() => idprooffunc(item.BaseidProofUpload)}
                        >
                          IP
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          variant="link"
                          onClick={() =>
                            addressprooffunc(item.BaseaddressProofUpload)
                          }
                        >
                          AP
                        </Button>
                        {item.BasetwoWheelerUpload && (
                          <Button
                            size="sm"
                            colorScheme="blue"
                            variant="link"
                            onClick={() =>
                              twowheelerprooffunc(item.BasetwoWheelerUpload)
                            }
                          >
                            TP
                          </Button>
                        )}
                      </ButtonGroup>
                    </Td> */}
                    {/* <Td>
                      {item.active === true ? (
                        <ButtonGroup
                          spacing="1"
                          onClick={() => setId(item._id)}
                        >
                          <Button
                            size="xs"
                            colorScheme="blue"
                            onClick={() => {
                              router.push(
                                {
                                  pathname: "/manageusers/view",
                                  query: { id: item._id },
                                },
                                "manageusers/view"
                              );
                            }}
                          >
                            View
                          </Button>
                          <Button
                            size="xs"
                            colorScheme="orange"
                            onClick={() => editFunction(item._id)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="xs"
                            colorScheme="red"
                            onClick={() => setIsdeleteOpen(true)}
                          >
                            Disable
                          </Button>
                        </ButtonGroup>
                      ) : (
                        <ButtonGroup
                          spacing="1"
                          onClick={() => setId(item._id)}
                        >
                          <Button
                            size="xs"
                            colorScheme="blue"
                            onClick={() => {
                              router.push(
                                {
                                  pathname: "/manageusers/view",
                                  query: { id: item._id },
                                },
                                "manageusers/view"
                              );
                            }}
                          >
                            View
                          </Button>
                          <Button
                            size="xs"
                            colorScheme="red"
                            onClick={() => setIsenableOpen(true)}
                          >
                            Enable
                          </Button>
                        </ButtonGroup>
                      )}
                    </Td> */}
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </div>
        <Pagination
          totalRecord={totalEmp ? totalEmp : 0}
          rowLength={EmployeeTable.rowData ? totalEmp : 0}
          {...EmployeeTable}
        />
      </div>
    </>
  );
};
export default Manageusers;
