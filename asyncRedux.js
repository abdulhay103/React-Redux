const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");

createStore;
//1st Define Initial State
const initialState = {
  loading: true,
  users: [],
  error: "",
};

//2nd Define Actions
const Fetch_Users_Request = "Fetch_Users_Request";
const Fetch_Users_Success = "Fetch_Users_Success";
const Fetch_Users_Failure = "Fetch_Users_Failure";

const userRequest = () => {
  return {
    type: Fetch_Users_Request,
  };
};
const userSuccess = (users) => {
  return {
    type: Fetch_Users_Success,
    payload: users,
  };
};
const userError = (error) => {
  return {
    type: Fetch_Users_Failure,
    payload: error,
  };
};

//3rd Create Reducer
const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case Fetch_Users_Request:
      return {
        ...state,
        loading: true,
      };
    case Fetch_Users_Success:
      return {
        loading: false,
        users: action.payload,
      };
    case Fetch_Users_Failure:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(userRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        //   console.log(response);
        const users = response.data.map((user) => user.id);
        dispatch(userSuccess(users));
      })
      .catch((error) => {
        dispatch(userError(error.message));
      });
  };
};

const store = createStore(asyncReducer, applyMiddleware(thunk));
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUsers());
