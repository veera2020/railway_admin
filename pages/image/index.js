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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Box,
  Image
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
const Images = () => {
  const [query, setquery] = useState("");
  const [totalEmp, settotalEmp] = useState("");
  const [reload, setreload] = useState(false);

  //table
  const EmployeeTable = useTable();
  //get employees
  const fetchdata = async (page = 1, limit = 10) => {
    const token = Cookies.get("token");
    let config = {
      headers: {
        Authorization: "Token" + " " + token,
      },
    };
    EmployeeTable.setLoading(true);
    const response = await axios.get(
      `/contestserv/user_image_admin_history?page=${page}&limit=${limit}&query=${query}`,
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
  //view potery
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [poteryname, setpoteryname] = useState("");
  const viewpotery = (props) => {
    console.log(props.name);
    setpoteryname(props.url);
    onOpen();
  };
  return (
    <>
      <Head>
        <title>Admin - Image Contest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4">
        <div className="py-3 font-bold underline">Image Contest Details</div>
        <div className="border-gray-500 overflow-y-scroll border">
          <Table size="sm" scaleY="44" variant="striped">
            <Thead className="bg-headergreen">
              <Tr>
                <Th>Name</Th>
                <Th>Created Date</Th>
                <Th>Image</Th>
              </Tr>
            </Thead>
            <Tbody>
              {EmployeeTable.rowData &&
                EmployeeTable.rowData.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.user}</Td>
                    <Td>{item.date}</Td>
                    <Td>
                      <Button variant="link" onClick={() => viewpotery(item)}>
                        View
                      </Button>
                    </Td>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image Contest</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box boxSize="sm">
              <Image src={poteryname} alt="Dan Abramov" />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Images;
