import React from "react";
import Head from "next/head";
import { MdDriveFileRenameOutline } from "react-icons";
import { Card, CardBody, Heading, Stack, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
const data = [
  {
    cname: "Quiz Question",
    href: "/questionsquiz",
    image:
      "https://img.freepik.com/free-vector/quiz-word-concept_23-2147844150.jpg?w=2000",
    icon: <MdDriveFileRenameOutline />,
  },
  {
    cname: "Trivia Question",
    href: "/questionstrivia",
    image:
      "https://media.istockphoto.com/id/1303554344/vector/trivia-word-made-with-colorful-hanging-letters.jpg?s=612x612&w=0&k=20&c=l-hmy7yOOzEn3iKkHzkGoU6CipO8-xhgQdp5ava7lzk=",
    icon: <MdDriveFileRenameOutline />,
  },
];
const Contest = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>User - Add Questions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4 flex flex-row gap-5">
        {data &&
          data.map((data, index) => (
            <Card maxW="sm" key={index}>
              <CardBody>
                <Image
                  src={data.image}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                  height="40"
                  width="56"
                  onClick={() => router.push(data.href)}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md" className="flex justify-center">
                    {data.cname}
                  </Heading>
                </Stack>
              </CardBody>
            </Card>
          ))}
      </div>
    </>
  );
};

export default Contest;
