import { useEffect, useState } from "react";
import { Card, CardBody, Text, Box, Button } from "@chakra-ui/react";

interface ICard {
  id: number;
  title: string;
  body: string;
}

function App() {
  const [data, setData] = useState<ICard[]>([]);

  const LIMIT = 4;
  const [limitPosts, setLimitPosts] = useState<ICard[]>([]);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        setData(data);
        console.log("this data", data);
      } catch (error) {
        console.log("this error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("loaded");
    setLimitPosts(data.slice(0, LIMIT * current));
  }, [current, data]);

  const handleViewMore = () => {
    setCurrent((prev) => prev + 1);
  };

  return (
    <>
      <Box p={3}>
        <Box display={"flex"} flexWrap="wrap">
          {limitPosts.map((a) => (
            <Card
              key={a.id}
              m={3}
              w="300px"
              sx={{
                "&:hover": {
                  boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                  bgColor: "teal.100",
                },
              }}
            >
              <CardBody gap={3} display={"flex"} flexDirection={"column"}>
                <Text fontWeight="bold" fontSize="20px">
                  {a.title}
                </Text>
                <Text>{a.body}</Text>
              </CardBody>
            </Card>
          ))}
        </Box>
      </Box>
      <Box display={"flex"} justifyContent="center" w="100%" bgColor={"teal"} p={3}>
        <Button onClick={handleViewMore} disabled={current === LIMIT}>
          View More
        </Button>
      </Box>
    </>
  );
}

export default App;
