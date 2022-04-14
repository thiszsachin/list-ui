import "./App.css";
import React, { useEffect, useState } from "react";
import List from "./components/Lists/view";

function App() {
  const [userList, setUserList] = useState([]);
  const [userData, setUserData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [isFilter, setIsFilter] = useState("");

  const fetchData = () => {
    const url = "https://okrcentral.github.io/sample-okrs/db.json";
    fetch(url)
      .then((res) => res.json())
      .then((list) => {
        let myData = list.data;
        if (myData.length > 0) {
          let arr = [];
          myData.filter((element) => {
            if (element.parent_objective_id === "") {
              arr["expand"] = true;
              arr.push(element);
            }
          });
          arr.filter((element) => {
            element["child"] = myData.filter(
              (d) => d.parent_objective_id === element.id
            );
          });
          setUserList(arr);
          setUserData(arr);
        }
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (index) => {
    let data = [...userList];
    data[index].expand = !data[index].expand;
    setUserList(data);
    setUserData(data);
  };

  const haldleFilter = (e) => {
    e.preventDefault();
    setIsFilter(filterText);

    const data = [...userList];
    let arr = [];
    data.filter((item) => {
      if (item.category === filterText) arr.push(item);
    });
    setUserData(arr);
    console.log(userList);
  };

  const handleRemoveFilter = () => {
    fetchData();
    setIsFilter("");
  };
  const handleOnChange = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <List
      userList={userList}
      handleClick={handleClick}
      haldleFilter={haldleFilter}
      handleOnChange={handleOnChange}
      userData={userData}
      isFilter={isFilter}
      filterText={filterText}
      handleRemoveFilter={handleRemoveFilter}
    />
  );
}

export default App;
