/**
 * @Description: combineReducers.js
 * @author: forguo
 * @date: 2020/5/4
*/
import { combineReducers } from "redux";
import login from "@/store/reducer/login";
import user from "@/store/reducer/user";

export default combineReducers(
    {
        user,
        login
    });
