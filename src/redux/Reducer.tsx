const initialState = {
  posts: [],
  initialPost:{},
  clicked:""
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_POSTS_SUCCESS":
      return { ...state, posts: action.payload };
    case "VIEW_POSTS_SUCCESS":
      return { ...state, initialPost: action.payload, clicked: action.clicked };
    case "ADD_POST_SUCCESS":
      return { ...state, posts: [...state.posts, action.payload] };
    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload)
      };
    case "UPDATE_POST_SUCCESS":
      const updatedPosts = state.posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
      return { ...state, posts: updatedPosts };
    default:
      return state;
  }
};

export default rootReducer;
