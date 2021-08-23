import { of } from "await-of";
import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { UserService } from "../Services/UserService";
const userService = new UserService();
const HomePage = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      const [response,error] = await of(userService.login({
        email: "abc@gmail.com",
        passwordHash: "12345678",
      }));
      if(error) {
        alert(error);
      }
      if(response) {
        setUser(response);
      }
    })();
  }, []);
  return (
    <>
      <Header></Header>
      Home Page
      {JSON.stringify(user)}
      <Footer></Footer>
    </>
  );
};
export default HomePage;
