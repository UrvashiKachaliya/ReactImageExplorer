import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";

export default function Snaps() {
  const API_KEY = "tp-SdAUIlQi0TcugCorjCvuU7hL3j7t7bcKzotWxYIw";
  const ITEMS_PER_PAGE = 12;

  const [input, setinput] = useState("Rose");
  const [data, setdata] = useState([]);
  const [page, setpage] = useState(1);
  const [totalpages, settotalpages] = useState(0);

  useEffect(() => {
    setpage(1);
  }, [input]);

  useEffect(() => {
    handlesearch(input);
  }, [page]);

  console.log(page);

  async function handlesearch(input) {
    setinput(input);
    let result = await fetch(
      `https://api.unsplash.com/search/photos?query=${input}&page=${page}&per_page=${ITEMS_PER_PAGE}&client_id=${API_KEY}`,
      {
        method: "GET",
      }
    );

    result = await result.json();
    console.log("message", result);

    if (result) {
      setdata(result.results);
      settotalpages(result.total_pages);
      // setinput("");
    }
  }

  const handleresetpage = () => {
    handlesearch(input);
    setpage(1);
  };

  return (
    <>
      <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <h1 className="p-3 mt-5" style={{ color: "#9B86BD" }}>
          Explore Our Snapshot Image Search
        </h1>
        <InputGroup className="w-50 w-md-75 w-lg-50 mb-3">
          <Form.Control
            placeholder="Search your images here"
            className="p-2"
            value={input}
            onChange={(e) => setinput(e.target.value)}
          />
          <InputGroup.Text style={{ backgroundColor: "#9B86BD" }}>
            <SearchIcon
              className="text-white"
              onClick={() => handlesearch(input)}
            />
          </InputGroup.Text>
        </InputGroup>

        <Row className="p-3 w-100 justify-content-center">
          <Col xs="auto" className="my-1">
            <Button
              className="border-0"
              style={{ backgroundColor: "#9B86BD" }}
              onClick={() => handlesearch("Mountains")}
            >
              Mountains
            </Button>
          </Col>
          <Col xs="auto" className="my-1">
            <Button
              className="border-0"
              style={{ backgroundColor: "#9B86BD" }}
              onClick={() => handlesearch("Food")}
            >
              Food
            </Button>
          </Col>
          <Col xs="auto" className="my-1">
            <Button
              className="border-0"
              style={{ backgroundColor: "#9B86BD" }}
              onClick={() => handlesearch("Nature")}
            >
              Nature
            </Button>
          </Col>
          <Col xs="auto" className="my-1">
            <Button
              className="border-0"
              style={{ backgroundColor: "#9B86BD" }}
              onClick={() => handlesearch("Flowers")}
            >
              Flowers
            </Button>
          </Col>
          <Col xs="auto" className="my-1">
            <Button
              className="border-0"
              style={{ backgroundColor: "#9B86BD" }}
              onClick={() => handlesearch("Clothes")}
            >
              Clothes
            </Button>
          </Col>
        </Row>

        <Row className="mt-3 w-100">
          {input.trim() === "" ? (
            <h1 className="text-center">Oops!Enter a Input to Find Images</h1>
          ) : (
            data.map((item) => (
              <Col xs={12} sm={6} md={4} lg={3} key={item.id} className="my-2">
                <Card
                  style={{ width: "100%", height: "13rem" }}
                  className="m-2"
                >
                  <Card.Img
                    style={{ height: "100%", objectFit: "cover" }}
                    src={item.urls.small}
                    alt={item.alt_description}
                  />
                </Card>
              </Col>
            ))
          )}
        </Row>

        {data.length > 0 && (
          <div className="d-flex justify-content-end w-100 p-3">
            {page > 1 ? (
              <Button
                className="mx-2 border-0"
                style={{ backgroundColor: "#9B86BD" }}
                onClick={() => setpage(page - 1)}
              >
                PREVIOUS
              </Button>
            ) : (
              ""
            )}
            {page < totalpages ? (
              <Button
                className="mx-2 border-0"
                style={{ backgroundColor: "#9B86BD" }}
                onClick={() => setpage(page + 1)}
              >
                NEXT
              </Button>
            ) : (
              ""
            )}
          </div>
        )}
      </Container>
    </>
  );
}
