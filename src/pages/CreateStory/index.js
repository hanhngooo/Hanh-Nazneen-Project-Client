import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Jumbotron, Button, Form, Col, Image } from "react-bootstrap";
import { createMyStory } from "../../store/story/actions";

import "./createstory.css";

export default function CreateStory() {
  const [title, setTitle] = useState("");
  const [myStory, setMyStory] = useState("");
  const [imageUrl, setMyImageUrl] = useState(
    "https://5gems.files.wordpress.com/2014/05/134170985_istockphoto_thinkstock1.jpg"
  );
  const [rating, setRating] = useState(0);
  const { id } = useParams();

  const dispatch = useDispatch();

  const storyline = "TODO";
  const submitForm = () => {
    dispatch(createMyStory(id, title, myStory, imageUrl, rating));
  };

  return (
    <>
      <Jumbotron>
        <h1>Create New Story</h1>
      </Jumbotron>
      <Form className="myForm" onSubmit={submitForm}>
        <Form.Group>
          <Form.Row>
            <Col xs={7}>
              <Form.Control
                size="md"
                type="text"
                placeholder="Title of your story.."
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs={10}>
              <Form.Control
                readOnly
                size="md"
                as={"textarea"}
                placeholder={storyline}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs={10}>
              <Form.Control
                size="md"
                as="textarea"
                rows="10"
                placeholder="Your story..."
                value={myStory}
                onChange={(event) => setMyStory(event.target.value)}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs={5}>
              <Form.Control
                as="select"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
              >
                <option value="0">Rate your story</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Control>
              <Form.Text className="text-muted">
                {`You can rate your own story 1-5, default rating is 0`}
              </Form.Text>
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs={10}>
              <Form.Control
                type="text"
                name="imageUrl"
                onChange={(event) => setMyImageUrl(event.target.value)}
                value={imageUrl}
                placeholder="Enter image url here.."
              />

              <Form.Text className="text-muted">
                {`You can give some image url describing your story or will be defaulted with below image`}
              </Form.Text>
            </Col>

            <Col className="mt-2" md={{ span: 4, offset: 2 }}>
              {imageUrl ? (
                <Image src={imageUrl} alt="preview" thumbnail />
              ) : null}
            </Col>
          </Form.Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          Post my story
        </Button>
      </Form>
    </>
  );
}
