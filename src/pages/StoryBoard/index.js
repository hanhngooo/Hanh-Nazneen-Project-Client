import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";
import "./style.css";

import { fetchAllStories } from "../../store/stories/actions";
import SmallStoryCard from "../../components/SmallStoryCard";
import { selectStories } from "../../store/stories/selectors";
export default function ViewStories() {
  const dispatch = useDispatch();
  const storyLineId = useParams().storyLineId;
  const stories = useSelector(selectStories);
  console.log("stories", stories);

  useEffect(() => {
    dispatch(fetchAllStories(storyLineId));
  }, [dispatch, storyLineId]);

  // if (!stories) {
  //   return <div>{`Loading...`}</div>;
  // }

  return (
    <div className="background">
      <Jumbotron
        style={{
          textAlign: "center",
          color: "rgb(7, 81, 179)",
          marginBottom: "3rem",
        }}
      >
        <h2>Stories with this opening line </h2>
      </Jumbotron>
      {stories &&
        stories.map((story) => {
          return (
            <SmallStoryCard
              key={story.id}
              title={story.title}
              content={story.content}
              user={story.user}
              storyLineId={story.storyLineId}
              id={story.id}
            />
          );
        })}
    </div>
  );
}
