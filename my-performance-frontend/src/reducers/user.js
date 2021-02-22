export const userInitState = {
  userInfo: {},
};

export function user(state, action) {
  switch (action.type) {
    case "user/saveUserInfo":
      return {
        ...state,
        userInfo: action.payload || {},
      }
    default:
      throw new Error();
  }  
}