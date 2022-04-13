import "./App.css";
import React, { useEffect, useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { BsForward } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { GoCheck } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

function App() {
  const [userList, setUserList] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filterList, setFilterList] = useState("");
  const [filter, setFilter] = useState("");

  const filterData = [
    "Company",
    "Sales",
    "Marketing",
    "Finance",
    "People",
    "Product Management",
    "Engineering",
    "Administration",
    "Customer Success'",
    "Design",
  ];

  const fetchData = () => {
    const url = "https://okrcentral.github.io/sample-okrs/db.json";
    fetch(url)
      .then((res) => res.json())
      .then((list) => {
        let myData = list.data;
        if (myData.length > 0) {
          let arr = [];
          myData.forEach((element) => {
            if (element.parent_objective_id === "") {
              arr["expand"] = true;
              arr.push(element);
            }
          });
          arr.forEach((element) => {
            element["child"] = myData.filter(
              (d) => d.parent_objective_id === element.id
            );
          });
          setUserList(arr);
        }
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  function handleClick(index) {
    let data = [...userList];
    data[index].expand = !data[index].expand;
    setUserList(data);
  }
  function handleClickfilter(index) {
    let data = [...filterList];
    data[index].expand = !data[index].expand;
    setFilterList(data);
  }

  const haldleFilter = (e) => {
    e.preventDefault();
    setFilter(filterText);
    const data = [...userList];
    let arr = [];
    data.forEach((item) => {
      if (item.category === filterText) arr.push(item);
    });
    setFilterList(arr);
  };

  return (
    <div>
      <h2 className="main-header">Uber Feedback List</h2>
      {filter.length > 0 && (
        <h4
          className="filter-main-chip"
          onClick={() => {
            fetchData();
            setFilter("");
            setFilterList([]);
          }}
        >
          Filter:
          <span className="filter-value">
            {filter} <span className="filter-remove">X</span>
          </span>
        </h4>
      )}
      <div style={{ marginLeft: "80%" }}>
        <label
          style={{
            marginRight: "10px",
            marginLeft: "5px",
            color: "red",
            fontWeight: 600,
          }}
        >
          Filter :
        </label>
        <form onSubmit={(e) => haldleFilter(e)}>
          <select
            className="filter-input-select"
            onChange={(e) => setFilterText(e.target.value)}
          >
            <option>Select</option>
            {filterData.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button type="submit" className="filter-submit-btn">
            <GoCheck className="filter-submit-icon" />
          </button>
        </form>
      </div>
      {filterList.length === 0 && filter && <h1>Sorry! No matches found.</h1>}
      {userList.length === 0 && <p>Loading...</p>}
      {filterList.length > 0 &&
        filterList?.map((item, index) => (
          <>
            <h3
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                handleClickfilter(index);
              }}
            >
              <span style={{ margin: "10px", color: "brown" }}>
                {item.expand ? <BsForward /> : <IoIosArrowDropdown />}
              </span>
              <CgProfile style={{ margin: "0px 15px 0px -5px" }} />
              {item.title}
            </h3>
            {!item.expand === true && (
              <>
                {item.child.map((c) => (
                  <p className="show-child">
                    <GoPrimitiveDot style={{ color: "brown" }} />
                    <CgProfile style={{ margin: "0px 15px 0px 5px" }} />
                    {c.title}
                  </p>
                ))}
              </>
            )}
          </>
        ))}
      {(!filterList || userList.length > 0) &&
        userList?.map((item, index) => (
          <>
            <h3
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                handleClick(index);
              }}
            >
              <span style={{ margin: "10px", color: "brown" }}>
                {item.expand ? <BsForward /> : <IoIosArrowDropdown />}
              </span>
              <CgProfile style={{ margin: "0px 15px 0px -5px" }} />
              {item.title}
            </h3>
            {!item.expand === true && (
              <>
                {item.child.map((c) => (
                  <p className="show-child">
                    <GoPrimitiveDot style={{ color: "brown" }} />
                    <CgProfile style={{ margin: "0px 15px 0px 5px" }} />
                    {c.title}
                  </p>
                ))}
              </>
            )}
          </>
        ))}
    </div>
  );
}

export default App;
