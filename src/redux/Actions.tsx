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

export const fetchUserPosts = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    );
    console.log("The response for each user", response)
    dispatch({ type: "FETCH_USER_POSTS_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({ type: "FETCH_USERS", payload: response.data });
  } catch (error) {
    console.error(error);
  }
}

export const viewPosts = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    dispatch({ type: "VIEW_POSTS_SUCCESS", payload: response.data });
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
    console.log("Response for ADD", response)
    dispatch({ type: "ADD_POST_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const editModal = (item) => {
  return {
    type: 'EDIT_MODAL',
    payload: item,
    clicked: 'Edit'
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    dispatch({ type: "DELETE_POST_SUCCESS", payload: id });
  } catch (error) {
    console.error(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  console.log("complex Item", id, post)
  const updatedPost = {
    id: post.id,
    userId: post.userId,
    ...id,
  }
  console.log(updatedPost, "My updated oost")
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const responseput = await response.json();
    console.log("out response here", responseput);
    dispatch({ type: "UPDATE_POST_SUCCESS", payload: responseput, clicked:'Edit' });
  } catch (error) {
    console.error("failed to put the details", error);
  }
};