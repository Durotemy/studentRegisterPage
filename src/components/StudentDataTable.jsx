import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const MyComponent = () => {
  const [ages, setAges] = useState([]);
  const [enterAge, setEnterAge] = useState('')
  const [enterState, setEnterState] = useState('')
  const [error, setError] = useState(null);
  const [item, setItem] = useState([]);
  const [level, setLevel] = useState([]);
  const [state, setState] = useState([]);
  const [gender, setGender] = useState([]);

  /**
   * It fetches all data from the API and sets the data to the state
   */
  const fetchAllData = async () => {
    const result = await axios("https://test.omniswift.com.ng/api/viewAllData");
    setItem(result.data.data.students);
    if (error) {
      setError(error);
    }
  };

  /**
   * It fetches data from the API and displays it on the page.
   */
  const fetchDataAge = async () => {
    const result = await axios("https://test.omniswift.com.ng/api/viewAllAges");
    setAges(result.data.data);
    if (error) {
      setError(error);
    }
  };
  /**
   * It fetches data from the API and sets the state of the data.
   */
  const fetchDataState = async () => {
    const result = await axios(
      "https://test.omniswift.com.ng/api/viewAllStates"
    );
    setState(result.data.data);
    if (error) {
      setError(error);
    }
  };

  /**
   * It fetches data from the backend and sets the data to the state
   */
  const fetchDataLevel = async () => {
    const result = await axios(
      "https://test.omniswift.com.ng/api/viewAllLevels"
    );

    setLevel(result.data.data);
    if (error) {
      setError(error);
    }
  };
  /**
   * It fetches data from the API and sets the data to the state
   */
  const fetchDataGender = async () => {
    const result = await axios(
      "https://test.omniswift.com.ng/api/viewAllGender"
    );

    setGender(result.data.data);
    console.log("vvv", gender);
    if (error) {
      setError(error);
    }
  };
  

  useEffect(() => {
    try {
      fetchDataLevel();
      fetchDataGender();
      fetchAllData();
      fetchDataAge();
      fetchDataState();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const ageOption = [];
  for (let detail of ages) {
    ageOption.push({ label: detail.age, value: detail.id });
  }
  const levelOption = [];
  for (let detail of level) {
    levelOption.push({ label: detail.level, value: detail.id });
  }

  const stateOption = [];
  for (let detail of state) {
    stateOption.push({ label: detail.name, value: detail.id });
  }
  const genderOption = [];
  for (let detail of gender) {
    genderOption.push({ label: detail.gender, value: detail.id });
  }

  const handleClickFilter = () => {
    

    const result = item.filter((ele) => {
      console.log("ele,,,,,,", ele)
      return (
        ele.age === selectedOption.label ||
        ele.state === selectedOption.label ||
        ele.gender === selectedOption.label ||
     ele.level === selectedOption.label
      )
    });
    setItem(result);
  




  };
  const handleRefresh = () => {
    fetchAllData();
    window.location.reload()
  };

  const handleClickDownload = () => {
    fetch("https://test.omniswift.com.ng/api/viewResult/2").then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "result.pdf";
        a.click();
      });
      //window.location.href = response.url;
    });
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 60,
      minHeight: 35,
    }),
  };

  return (
    <div className="w-full  bg-[#ede9e9] lg:fixed h-screen">
      <div className=" mx-auto h-60 lg:mt-4 rounded ">
        <p className="ml-16 text-black mr-8 text-2xl lg:text-4xl">
          Student Data Table
        </p>
        <div className=" mx-auto w-11/12 bg-[#FFFFFF] rounded mt-12">
          <p className="text-black ml-2 lg:ml-14 text-2xl">
            Filter Student By:
          </p>
          <div className="md:grid grid-cols-3 gap-1 mt-10 lg:grid grid-cols-2 ">
            <div className=" mx-auto w-80">
              <Select
                placeholder={<div>Select age</div>}
                className="h-20"
                // value={enterAge}
                onChange={handleChange}
                options={ageOption}
                styles={customStyles}
              />
            </div>
            <div className=" mx-auto w-80  h-20">
              <Select
                placeholder={<div>Select State</div>}
                className="h-20"
                // value={enterState}
                onChange={handleChange}
                options={stateOption}
                styles={customStyles}
              />
            </div>
            <div className=" mx-auto w-80 h-20">
              <Select
                placeholder={<div>Select level</div>}
                className="h-20"
                onChange={handleChange}
                options={levelOption}
                styles={customStyles}
              />
            </div>
            <div className=" mx-auto w-80 h-20">
              <Select
                placeholder={<div>Select gender</div>}
                className="h-20"
                onChange={handleChange}
                options={genderOption}
                styles={customStyles}
              />
            </div>

            <div className=" mx-auto w-80 h-20">
              <button onClick={handleClickFilter} className="h-[58px] w-80">
                Search
              </button>
            </div>
            <div className=" mx-auto w-80 h-20">
            <button
              className="h-[58px] w-80"
              onClick={handleRefresh}
            >
              Refresh
            </button>
            </div>
            
          </div>
        </div>
      </div>

      <div className="lg:mt-36 mt-96 lg:w-full scrollbar md:w-12/12 md:mt-52">
        <div className="w-11/12  bg-[#FFFFFF] rounded mx-auto lg:overflow-scroll h-80 scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-100">
          <div className="overflow-x-auto scrollbar ">
            <table className=" lg:w-full lg:table-auto md:w-full  border-separate border-spacing-px scrollbar">
              <thead className="scrollbar ">
                <tr className="text-1xl lg:p-4 bg-[#F9F9FA] w-full scrollbar">
                  <th className="lg:px-8 text-sm lg:p-4 w-auto	 border-b">
                    S/N
                  </th>
                  <th className=" w-1	 text-sm border-b ">Surname</th>
                  <th className="lg:px-4 text-sm lg:w-auto border-b">
                    Firstname
                  </th>
                  <th className="lg:px-4 text-sm lg:w-auto border-b">Age</th>
                  <th className="lg:px-4 text-sm md:ml-2 lg:w-auto border-b">Gender</th>
                  <th className="lg:px-4 text-sm lg:w-auto border-b">Level</th>
                  <th className="lg:px-4 text-sm lg:w-auto border-b">State</th>
                  <th className="lg:px-4 text-sm lg:w-auto border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {item.map((ele, i) => {
                  return (
                    <tr className="border-b">
                      <td className="lg:px-14 md:px-4 text-sm border-b">{i + 1}</td>
                      <td className="lg:px-14 md:px-4 text-sm border-b">
                        {ele.surname}
                      </td>
                      <td className="lg:px-14 md:px-4 text-sm border-b">
                        {ele.firstname}
                      </td>
                      <td className="lg:px-14 md:px-4 text-sm border-b">{ele.age}</td>
                      <td className="lg:px-14 md:px-6 text-sm border-b">
                        {ele.gender}
                      </td>
                      <td className="lg:px-16 md:px-4 text-sm border-b">{ele.level}</td>
                      <td className="lg:px-14 text-sm md:px-4 border-b">{ele.state}</td>
                      <td className="lg:px-14  border-b">
                        <button
                          className="lg:h-[63px] h-10 lg:w-32 rounded text-sm"
                          onClick={handleClickDownload}
                        >
                          Download Result
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
