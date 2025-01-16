import { Data } from './EmployeeData'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'



function App() {

  const [data, setData] = useState([" "])

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState(0)
  const [goods, setGoods] = useState("")
  const [id, setId] = useState(0)

  const [update, setUpdate] = useState(false)
  console.log(update);

  useEffect(() => {
    setData(Data)
    console.log(Data)
  }, []);

  // for edit
  const handleEdit = (id) => {
    alert(id);
    setUpdate(true)
    const dt = data.filter(item => item.id === id);
    if (dt !== undefined) {
      setUpdate(true);
      setId(id)
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  }
  // for delete
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this record?")) {
        const dt = data.filter(item => item.id !== id);
        setData(dt);
      }
    }
  }

  // for save
  const handleSave = (e) => {

    let error = '';

    if (firstName === '')
      error += '\nFirst name is required'
    if (lastName === '')
      error += '\nLast name is required'
    if (age <= 0)
      error += ' Age is required'
    if (error === '') {

      alert("Record Saved");
      e.preventDefault();

      const dt = [...data];

      const newObject = {

        id: Data.length + 1,
        firstName: firstName,
        lastName: lastName,
        age: age
      }
      dt.push(newObject)
      setData(dt)
    }
    else {
      alert(`Error: ${error}`);
    }
  }
  // for clear
  const handleClear = () => {
    alert("Record Clear");
    setAge(0)
    setFirstName('');
    setLastName('');
    setAge('')
    setUpdate(false)
  }





  //  for update
  const handleUpdate = () => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(id);
    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;
    setData(dt);
    handleClear()


  }

  // connect with jsx
  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: "center", marginTop: "15px", marginBottom: "20px" }} >
        <div>
          <labe Enter goods />
          <input type='text' placeholder='Enter your goods' value={goods} onChange={(e) => { setGoods(e.target.value) }} />


          <label>First Name
            <input type='text' placeholder="Enter your first Name" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
          </label>

        </div>

        <div>
          <label>Last Name
            <input type='text' placeholder="Enter your Last Name" onChange={(e) => setLastName(e.target.value)} value={lastName} />
          </label>
        </div>

        <div>
          <label> Age
            <input type='text' placeholder="Enter your Age" onChange={(e) => setAge(e.target.value)} value={age} />
          </label>
        </div>

        <div>
          {/* logic update save btn */}
          {

            !update ?

              <button className="btn btn-primary" onClick={(e) => handleSave(e)}>Save </button> :
              <button className="btn btn-primary" onClick={() => handleUpdate()}>Update </button>

          }

          <button className="btn btn-danger " onClick={() => handleClear()}>Clear</button>

        </div>

      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* data show */}
          {
            data.map((item, index) => {
              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit </button> &nbsp;
                    <button className="btn btn-danger " onClick={() => handleDelete(item.id)}>Delete</button>

                  </td>

                </tr>
              )

            })
          }
        </tbody>
      </table>

    </div >
  )
}
export default App