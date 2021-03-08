//Store Creations
const { createStore, combineReducers } = require("redux");

//this is onekind of action
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREEM = "BUY_ICECREEM";

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "Set Cake Action",
  };
}
function buyIceCreem() {
  return {
    type: BUY_ICECREEM,
    info: "Set Ice Creem action",
  };
}

//Multiple Reducer are here

//Reducer For Cake state

const initialCakeState = {
  numofCake: 10,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numofCake: state.numofCake - 1,
      };
    default:
      return state;
  }
};

//Reducer For IceCreem state
const initialIcecreemState = {
  numofIcecreem: 20,
};
const icecreemReducer = (state = initialIcecreemState, action) => {
  switch (action.type) {
    case BUY_ICECREEM:
      return {
        ...state,
        numofIcecreem: state.numofIcecreem - 1,
      };
    default:
      return state;
  }
};

//Store Creations & multiple Reducer combind in root Reducer
const rootReducer = combineReducers({
  cake: cakeReducer,
  icecreem: icecreemReducer,
});
const store = createStore(rootReducer); // createStore methord accepts one parameter that is reducer function
console.log("initial state", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("update state", store.getState())
);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCreem());
unsubscribe();
