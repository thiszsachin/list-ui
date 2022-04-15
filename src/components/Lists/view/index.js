import React, { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { GoCheck } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { BiFilterAlt } from "react-icons/bi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import "../styles/lists.css";
import PopupView from "../../PopupView/view";

const List = (props) => {
  const [detailsData, setDetailsData] = useState("");

  const filterData = [
    "--Select--",
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

  const {
    userData,
    handleClick,
    haldleFilter,
    handleOnChange,
    isFilter,
    handleRemoveFilter,
  } = props;

  return (
    <>
      <div>
        <h4 className="main-header">User FeedBack List</h4>
        <div>
          {isFilter && (
            <div className="filter-main-chip">
              Filter :
              <span onClick={handleRemoveFilter} className="filter-value">
                {isFilter}
                <span className="filter-remove">X</span>
              </span>
            </div>
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
        </div>
        {isFilter && userData.length === 0 && <p>Sorry! No Matches Found...</p>}
        {!isFilter && userData.length === 0 && <p>Loading...</p>}
        {userData &&
          userData?.map((item, index) => (
            <div key={item.id}>
              <div className="main-select-wrapper">
                <p
                  className="select-dropdown-icon"
                  onClick={() => handleClick(index)}
                >
                  {item.expand ? (
                    <MdOutlineArrowForwardIos />
                  ) : (
                    <IoIosArrowDropdown />
                  )}
                </p>
                <CgProfile className="parent-profile-icon" />
                <div
                  className="parent-list"
                  onClick={() => setDetailsData(item)}
                  key={item.id}
                >
                  <span key={item.id}>{index + 1}.</span>
                  <span className="vertical-line">{item.title}</span>
                </div>
              </div>
              {!item.expand === true && (
                <>
                  {item.child.map((c, index) => (
                    <>
                      <div className="child-list" key={index + 1}>
                        <CgProfile className="child-pic-icon" />
                        <span key={index + 1} className="child-number">
                          {index + 1}.
                        </span>
                        <span
                          onClick={() => setDetailsData(c)}
                          className="horizontal-line"
                        >
                          {c.title}
                        </span>
                      </div>
                    </>
                  ))}
                </>
              )}
            </div>
          ))}
      </div>
      <PopupView detailsData={detailsData} setDetailsData={setDetailsData} />
    </>
  );
};

export default List;
