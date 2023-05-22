import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const users = [
    {
      id: "u1",
      name: "Shahriar Hossain",
      image:
        "https://images.pexels.com/photos/5029301/pexels-photo-5029301.jpeg?cs=srgb&dl=pexels-evgenia-basyrova-5029301.jpg&fm=jpg&_gl=1*15xx69i*_ga*MTI3NDEzMjcxNi4xNjc4ODg0Nzkw*_ga_8JE65Q40S6*MTY4MDI1MDQ4My4zLjEuMTY4MDI1MDg3MC4wLjAuMA..",
      places: 3,
    },
    // {
    //   id: "u2",
    //   name: "Syeda Mahema Jahan",
    //   image:
    //     "https://images.pexels.com/photos/5029301/pexels-photo-5029301.jpeg?cs=srgb&dl=pexels-evgenia-basyrova-5029301.jpg&fm=jpg&_gl=1*15xx69i*_ga*MTI3NDEzMjcxNi4xNjc4ODg0Nzkw*_ga_8JE65Q40S6*MTY4MDI1MDQ4My4zLjEuMTY4MDI1MDg3MC4wLjAuMA..",
    //   places: 4,
    // },
  ];
  return <UsersList items={users} />;
};

export default Users;
