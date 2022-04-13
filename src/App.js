import "./App.css";
import React, { useEffect, useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { BsForward } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { GoCheck } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { BiFilterAlt } from "react-icons/bi";

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
    "Customer Success",
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

  const handleClick = (index) => {
    let data = [...userList];
    data[index].expand = !data[index].expand;
    setUserList(data);
  };
  const handleClickfilter = (index) => {
    let data = [...filterList];
    data[index].expand = !data[index].expand;
    setFilterList(data);
  };

  const haldleFilter = (e) => {
    e.preventDefault();
    if (filterText === "--Select--") {
      setFilter("");
    } else setFilter(filterText);

    const data = [...userList];
    let arr = [];
    data.forEach((item) => {
      if (item.category === filterText) arr.push(item);
    });
    setFilterList(arr);
  };

  const handleRemoveFilter = () => {
    fetchData();
    setFilter("");
    setFilterList([]);
    setFilter("");
  };
  const handleOnChange = (e) => {
    if (e.target.value === "--Select--") {
      fetchData();
      setFilter("");
      setFilterList([]);
    }
    setFilterText(e.target.value);
  };

  return (
    <div>
      <h2 className="main-header">Uber Feedback List</h2>
      {filter.length > 0 && (
        <h4 className="filter-main-chip">
          Filter :
          <span className="filter-value">
            {filter}{" "}
            <span onClick={handleRemoveFilter} className="filter-remove">
              X
            </span>
          </span>
        </h4>
      )}
      <div className="select-wrapper">
        <label className="select-label-heading">
          Filter <BiFilterAlt />
        </label>
        <form onSubmit={(e) => haldleFilter(e)}>
          <select
            className="filter-input-select"
            onChange={(e) => handleOnChange(e)}
          >
            <option onClick={handleRemoveFilter}>--Select--</option>
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
              className="parent-wrapper"
              onClick={() => {
                handleClickfilter(index);
              }}
            >
              <span className="select-dropdown-icon location-val location-dots">
                {item.expand ? <BsForward /> : <IoIosArrowDropdown />}
              </span>
              <CgProfile className="profile-icon" />
              {/* added  */}
              <div className="location-val">
                <span className="location-dots">{item.title}</span>
                <span className="location-view">
                  <p>Category :{item?.category}</p>
                  <p>Matric Name :{item?.matric_name}</p>
                  <p>Matric Start :{item?.matric_start}</p>
                  <p>Matric Target :{item?.matric_target}</p>
                </span>
              </div>
              {/* // added  */}
            </h3>
            {!item.expand === true && (
              <>
                {item.child.map((c) => (
                  <p className="show-child">
                    <GoPrimitiveDot className="circle-icon" />
                    <CgProfile className="profile-icon-child" />
                    <div className="location-val">
                      <span className="location-dots">{c.title}</span>
                      <span className="location-view">
                        <p>Category :{c?.category}</p>
                        <p>Matric Name :{c?.matric_name}</p>
                        <p>Matric Start :{c?.matric_start}</p>
                        <p>Matric Target :{c?.metric_target}</p>
                      </span>
                    </div>
                  </p>
                ))}
              </>
            )}
          </>
        ))}
      {!filter &&
        userList.length > 0 &&
        userList?.map((item, index) => (
          <>
            <h3
              className="parent-wrapper"
              onClick={() => {
                handleClick(index);
              }}
            >
              <span className="select-dropdown-icon">
                {item.expand ? <BsForward /> : <IoIosArrowDropdown />}
              </span>
              <CgProfile className="profile-icon" />
              <div className="location-val">
                <span className="location-dots">{item.title}</span>
                <span className="location-view">
                  <p>Category :{item?.category}</p>
                  <p>Matric Name :{item?.matric_name}</p>
                  <p>Matric Start :{item?.matric_start}</p>
                  <p>Matric Target :{item?.matric_target}</p>
                </span>
              </div>
            </h3>
            {!item.expand === true && (
              <>
                {item.child.map((c) => (
                  <p className="show-child">
                    <GoPrimitiveDot className="circle-icon" />
                    <CgProfile className="profile-icon-child" />
                    <div className="location-val">
                      <span className="location-dots">{c.title}</span>
                      <span className="location-view">
                        <p>Category :{c?.category}</p>
                        <p>Matric Name :{c?.metric_name}</p>
                        <p>Matric Start :{c?.matric_start}</p>
                        <p>Matric Target :{c?.metric_target}</p>
                      </span>
                    </div>
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
