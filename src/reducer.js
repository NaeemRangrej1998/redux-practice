// import {combineReducers} from "redux";
// import {ADD_POST,DELETE_POST} from "./actions";
//
// const initialState = {
//     posts: [],
// };
//
// const postsReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_POST:
//             return {
//                 ...state,
//                 posts: [...state.posts, action.payload],
//             };
//         case DELETE_POST:
//             return {
//                 ...state,
//                 posts: state.posts.filter((post) => post.id !== action.payload),
//             };
//         default:
//             return state;
//     }
// };
//
// export const rootReducer = combineReducers({
//     posts: postsReducer
// });