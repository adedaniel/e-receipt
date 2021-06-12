import check from "check-types";
import decode from "jwt-decode";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLoadingAnimation from "../components/page-loading-animation";
import { clearStates, fetchUserDetails } from "../redux/slices/userSlice";

export const withAuth = (Component) => {
  return function Auth(props) {
    const dispatch = useDispatch();
    const { userDetails, loading, error, success } = useSelector(
      (state) => state.user
    );

    useEffect(() => {
      check.nonEmptyObject(userDetails) && setIsAuthorized(true);
    }, [userDetails]);

    useEffect(() => {
      if (error && error.errorType === "FETCH_USER_DETAILS") {
        Router.push("/login");
        dispatch(clearStates());
      }
    }, [error]);

    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      if (localStorage.getItem("medispark_acccess_token")) {
        // Check if token exists in localStorage
        const { exp } = decode(localStorage.getItem("medispark_acccess_token")); // Then, get expiry date of token
        const now = Date.now().valueOf() / 1000;

        if (typeof exp !== "undefined" && exp < now) {
          Router.push("/login"); // If token is expired, re-route to login
        } else {
          check.emptyObject(userDetails) && dispatch(fetchUserDetails());
        }
      } else {
        Router.push("/login"); // Otherwise, if token doesn't exist, re-route to login
      }
    }, []);
    return isAuthorized ? <Component {...props} /> : <PageLoadingAnimation />; // While waiting, show loading animation
  };
};
