import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Head from "next/head";
import axios from "../../axios";
import Pagination from "../component/controls/Pagination";
import Addquestionsquiz from "./Addquestionsquiz";

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
const Questionsquiz = () => {
  const [query, setquery] = useState(" ");
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
      `contestserv/fetch_quiz_app_questions_admin?page=${page}&limit=${limit}&query=${query}`,
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
        <title>Admin - Add Quiz Questions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4">
        <div className="py-3 font-bold underline">Create Quiz Questions</div>
        <Addquestionsquiz setreload={setreload} reload={reload} />
        <div className="py-3 font-bold underline">Quiz Questions</div>
        <div className="border-gray-500 overflow-y-scroll border">
          <Table size="sm" scaleY="44" variant="striped">
            <Thead className="bg-headergreen">
              <Tr>
                <Th>Questions</Th>
                <Th>Option 1</Th>
                <Th>Option 2</Th>
                <Th>Option 3</Th>
                <Th>Option 4</Th>
                <Th>Answer</Th>
              </Tr>
            </Thead>
            <Tbody>
              {EmployeeTable.rowData &&
                EmployeeTable.rowData.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.question}</Td>
                    <Td>{item.option1}</Td>
                    <Td>{item.option2}</Td>
                    <Td>{item.option3}</Td>
                    <Td>{item.option4}</Td>
                    <Td>{item.answer}</Td>
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
export default Questionsquiz;
