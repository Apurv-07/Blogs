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

export const fetchUsers=()=>async (dispatch)=>{
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({type: "FETCH_USERS", payload: response.data});
  } catch (error) {
    console.error(error);
  }
}

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
    console.log("Response for ADD", response)
    dispatch({ type: "ADD_POST_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const editModal=(item)=>{
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
  const updatedPost={
    id: post.id,
    userId: post.userId,
    ...id,
  }
  try {
    // Optimistic UI Update: Dispatch an action to update the UI immediately
    dispatch({ type: "UPDATE_POST_SUCCESS", payload: post });

    // Make the API call to update the post
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      updatedPost
    );

    // If the API call was successful, update the Redux state with the response data
    dispatch({ type: "UPDATE_POST_SUCCESS", payload: response.data, clicked:'Edit' });
    console.log("Inside update ti see datga", response.data)
  } catch (error) {
    // Handle errors here, e.g., display an error message to the user
    console.error(error);
  }
};
// export const updatePost = (post, clicked) => async (dispatch) => {
//   try {
//     const response=await fetch('https://jsonplaceholder.typicode.com/posts/1', {
//   method: 'PUT',
//   body: JSON.stringify({
//     id: 1,
//     title: 'foo',
//     body: 'bar',
//     userId: 1,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
// const data=await response.json()
// console.log("The data after update", data)
//     dispatch({ type: "UPDATE_POST_SUCCESS", payload: data, clicked:clicked });
//   } catch (error) {
//     console.error(error);
//   }
//   try {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/posts"
//     );
//     console.log("Making fetch again", response)
//     dispatch({ type: "FETCH_POSTS_SUCCESS", payload: response.data });
//   } catch (error) {
//     console.error(error);
//   }
// };
