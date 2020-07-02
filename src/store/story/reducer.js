import {
  FETCH_A_STORY_SUCCESS,
  RATE_STORY_SUCCESS,
  FETCH_COMMENTS_SUCCESS,
} from "./actions";

const initialState = { story: {}, comments: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_A_STORY_SUCCESS:
      if (!state) {
        return action.payload;
      } else {
        return { ...state, story: { ...action.payload } };
      }
    case RATE_STORY_SUCCESS:
      return { ...state, story: { ...action.payload } };

    case FETCH_COMMENTS_SUCCESS:
      return { ...state, comments: [...action.payload] };
    default:
      return state;
  }
};
