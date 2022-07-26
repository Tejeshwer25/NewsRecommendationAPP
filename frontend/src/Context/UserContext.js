import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    topics: [],
  });

  function loadUser() {
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");
    const topics = sessionStorage.getItem("topics");
    const id = sessionStorage.getItem("id");

    if (name) {
      setUserDetail({
        id: id,
        name: name,
        email: email,
        topics: topics ? topics.split(",") : [],
      });
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ userDetail, setUserDetail, loadUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
