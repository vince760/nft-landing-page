import store from "./store/index";
import { addUser, removeUser } from "./actions/index";

window.store = store;
window.addUser = addUser;
window.removeUser = removeUser;
