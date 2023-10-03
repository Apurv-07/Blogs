const initialState = {
  posts: [],
  initialPost: {},
  clicked: "",
  users: [],
  editItem: {}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_POSTS_SUCCESS":
      return { ...state, posts: action.payload };
    case "VIEW_POSTS_SUCCESS":
      return { ...state, initialPost: action.payload, clicked: action.clicked };
    case "ADD_POST_SUCCESS":
      return { ...state, posts: [...state.posts, action.payload] };
    case "FETCH_USERS":
      return { ...state, users: [...action.payload] };
    case "FETCH_USER_POSTS_SUCCESS":
      return { ...state, posts: action.payload };
    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case 'EDIT_MODAL':
      console.log(action.payload, "Is the cureengt id")
      return {...state, editItem:action.payload, clicked:action.clicked}
    case "UPDATE_POST_SUCCESS":
      console.log("Action", action)
      const updatedIndex = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      const updatedPosts = [...state.posts];

      updatedPosts[updatedIndex] = action.payload;
      return {
        ...state,
        posts: updatedPosts,
        clicked: action.clicked
      };
    default:
      return state;
  }
};

export default rootReducer;
