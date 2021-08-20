import React, { useEffect, useState } from "react";
import { UserService } from "../Services/UserService";
const userService = new UserService();
const HomePage = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await userService.login({
        id: 0,
        firstName:"",
        lastName:"",
        dateOfBirth: new Date(),
        email:"abc@gmail.com",
        passwordHash: "12345678",
        role: "host"
      });
      console.log(response);
    })();
  });
  return <div>Home Page</div>;
};
export default HomePage;
