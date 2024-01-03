import { useContext } from "react";
import useSWR from "swr";
import { AuthContext } from "../context/authContext";

const useUserData = () => {
  const authContext = useContext(AuthContext);

  const fetchUserData = async () => {
    if (!authContext?.user) {
      console.log("No user found");
      return;
    }
    console.log("Fetching user data...");

    // Call your API
    const res = await fetch(
      "http://localhost:3000/ProjetAppliWeb/rest/portfolio/getPortfolioByUsername/" +
        authContext.user.username,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      const { portfolio, user } = await res.json();
      portfolio.user = user;
      console.log("fetched user data: ", portfolio);
      return portfolio as Portfolio;
    } else {
      console.log("error useUserPortfolio: " + error.message);
      throw error;
    }
  };

  const swrOptions = {
    revalidateOnFocus: false, // Don't revalidate when the window gains focus
    revalidateOnReconnect: false, // Don't revalidate when the network reconnects
    dedupingInterval: 1000 * 60,
  };

  const {
    data: userData,
    error,
    isValidating,
  } = useSWR(
    authContext?.user ? ["user", authContext.user.id] : null,
    fetchUserData,
    swrOptions
  );

  const errorMessage = error ? error.message : "";

  return { userData, isLoading: !userData && !error, errorMessage };
};

export default useUserData;