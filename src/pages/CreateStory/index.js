import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Jumbotron, Button, Form, Col, Image } from "react-bootstrap";
import { createMyStory } from "../../store/story/actions";
import { selectStorylines } from "../../store/storyline/selectors";
import { selectStory } from "../../store/story/selectors";

import "./createstory.css";

export default function CreateStory() {
  const [title, setTitle] = useState("");
  const [myStory, setMyStory] = useState("");
  const [imageUrl, setMyImageUrl] = useState(
    "https://5gems.files.wordpress.com/2014/05/134170985_istockphoto_thinkstock1.jpg"
  );

  const [storyCreated, setStoryCreated] = useState(false);

  const { storyLineId } = useParams();

  const dispatch = useDispatch();
  const storylines = useSelector(selectStorylines);
  const newStory = useSelector(selectStory);

  let storyline;

  if (storylines) {
    storyline = [...storylines].find(
      (storyline) => storyline.id === parseInt(storyLineId)
    ).content;
    // console.log("storyline:", storyline);
  }

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(
      createMyStory(storyLineId, title, `${storyline} ${myStory}`, imageUrl)
    );
    setStoryCreated(true);
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
                required
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
                required
              />
            </Col>
          </Form.Row>
          <br />

          <Form.Row>
            <Col xs={5}>
              <Form.Control
                type="text"
                name="imageUrl"
                onChange={(event) => setMyImageUrl(event.target.value)}
                value={imageUrl}
                placeholder="Enter image url here.."
              />

              <Form.Text className="text-muted">
                {`You can give some image url describing your story or will be defaulted with this image`}
              </Form.Text>
            </Col>
            <Form.Group as={Col}>
              <Col className="mt-2" md={{ span: 6, offset: 2 }}>
                {imageUrl ? (
                  <Image src={imageUrl} alt="preview" thumbnail />
                ) : null}
              </Col>
            </Form.Group>
          </Form.Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          Post my story
        </Button>
        {storyCreated && newStory && (
          <Link to={`/StoryBoard/${newStory.id}`}>
            <div
              style={{
                display: "inline",
                postion: "absolute",
                paddingLeft: "150px",
              }}
            >
              View story
            </div>
          </Link>
        )}
      </Form>
    </>
  );
}
