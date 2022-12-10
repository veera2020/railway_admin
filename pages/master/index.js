import { Button } from "@chakra-ui/react";
const data = [
  {
    name: "App",
  },
  {
    name: "Image",
  },
  {
    name: "Potery",
  },
  {
    name: "Quiz",
  },
  {
    name: "Trivia",
  },
];
const Master = () => {
  return (
    <>
      {data &&
        data.map((data, index) => <Button key={index}>{data.name}</Button>)}
    </>
  );
};
export default Master;
