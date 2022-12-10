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
        `/usrserv/adminEmployeeActiveInactive?id=${props.id}&status=${
          props.status - 1
        }`,
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
        `/usrserv/adminEmployeeActiveInactive?id=${props.id}&status=${
          props.status + 1
        }`,
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
      `contestserv/score_trivia_admin?page=${page}&limit=${limit}&query=${query}`,
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
        <title>Admin - AppName</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4">
        <div className="py-3 font-bold underline">App Name Details</div>
        <div className="border-gray-500 overflow-y-scroll border">
          <Table
            size="sm"
            scaleY="44"
            variant="striped"
            //  colorScheme="whatsapp"
          >
            <Thead className="bg-headergreen">
              <Tr>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Score Amout</Th>
              </Tr>
            </Thead>
            <Tbody>
              {EmployeeTable.rowData &&
                EmployeeTable.rowData.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.user}</Td>
                    <Td>{item.date}</Td>
                    <Td>Rs.{item.name}</Td>
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
