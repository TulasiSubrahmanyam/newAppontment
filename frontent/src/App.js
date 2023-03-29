import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [timeData, settimeData] = useState("");

  const [newtimeData, setNewtimeData] = useState("");
  const [newlocation, setNewlocation] = useState("");

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      email: email,
      mobile: mobile,
      location:location,
      timeData: timeData,
    }).then(() => {
     /* setEmployeeList([
        ...employeeList,
        {
          name: name,
          email: email,
          mobile: mobile,
          location:location,
          timeData: timeData,
        },
      ]);*/
      alert("Successfully booked")
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/customers").then((response) => {
      setEmployeeList(response.data);
    });
    

  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", {location:newlocation, timeData: newtimeData, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  email: val.email,
                  mobile: val.mobile,
                  location:newlocation,
                  timeData: newtimeData,
                }
              : val;
          })
        );
        alert("Successfully Upated")
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
      alert("Deleted Successfully")
    });
  };

  return (
    <div className="App">
   
    <div className="cardContainer">
    <div className="cardDetails">
      <div className="information">
      <h1 className="cardHeading">Drone Appointment <br/> Booking</h1>
      <div className="smallConent">
        <label>Name:</label>
        <input className="inputContent"
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
          style={{marginLeft:"33px"}}
        />
        <label>Email:</label>
        <input className="inputContent"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
         
        />
        </div>
        <div className="smallConent">
        <label>Mobile:</label>
        <input className="inputContent"
          type="tel" maxLength={10} pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          onChange={(event) => {
            setMobile(event.target.value);
          }}
          style={{marginLeft:"35px"}}
        />
        <label style={{marginLeft:"3px"}}>Location:</label>
        <input className="inputContent"
          type="text"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
        </div>
        <div style={{marginTop:"10px"}}>
        <label>Time Date:</label>
        <input className="inputContent"
        type="datetime-local"
          onChange={(event) => {
            settimeData(event.target.value);
          }}
          style={{marginRight:"20px"}}
        />
        <button onClick={addEmployee} className="addButton">Add Employee</button>
        </div>
      </div>
      
      {/*image container*/}
      <div>
      <img src='../side.jpg' className="img" alt="img"/>
      </div>

     </div>   
       {/*showing details*/}
      <div className="customers">
      <button onClick={getEmployees} className="showButton">Show Employees</button>

      {employeeList.map((val, key) => {
        return (
          <div className="customer" key={key}>
          
            <div>
              <h3>Name:<span style={{fontSize:"16px",fontWeight:"300"}}> {val.name}</span></h3>
              <h3>Email: {val.email}</h3>
              <h3>Mobile: {val.mobile}</h3>
              <h3>Location: {val.location}</h3>
              <h3>TimeDate: {val.timeData}</h3>
            </div>
            <div>
            <input
              className="inputContent"
              type="text"  placeHolder="location Enter"              
                onChange={(event) => {
                  setNewlocation(event.target.value);
                }}
              />
              <input
              className="inputContent"
              type="datetime-local"                
                onChange={(event) => {
                  setNewtimeData(event.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateEmployeeWage(val.id);
                }} className="updateButton"
              >
                {" "}
                Update
              </button>

              <button
                onClick={() => {
                  deleteEmployee(val.id);
                }} className="deteleButton"
              >
                Delete
              </button>
            </div>
           </div> 
         
        );
      })}
      </div>
    </div>
   
    </div>
  );
}

export default App;