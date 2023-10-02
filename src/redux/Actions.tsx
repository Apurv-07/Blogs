import axios from "axios";

export const fetchPosts = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    dispatch({ type: "FETCH_POSTS_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const viewPosts = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    dispatch({ type: "VIEW_POSTS_SUCCESS", payload: response.data});
  } catch (error) {
    console.error(error);
  }
};

export const addPost = (post) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      post
    );
    dispatch({ type: "ADD_POST_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    dispatch({ type: "DELETE_POST_SUCCESS", payload: id });
  } catch (error) {
    console.error(error);
  }
};

export const updatePost = (post) => async (dispatch) => {
  try {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      post
    );
    dispatch({ type: "UPDATE_POST_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(error);
  }
};
