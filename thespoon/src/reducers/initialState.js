import { modalVisibilityFilters } from "../constants/modalVisibiltyFilters";

const initialState = {
  modalVisibilityFilter: modalVisibilityFilters.HIDE_ALL,
  users: [],
  loginRegister: {
    username: "",
    role: "",
    token: "",
    loginStatus: "not logged in"
  },
  currentMenuId: null
};

export default initialState;
