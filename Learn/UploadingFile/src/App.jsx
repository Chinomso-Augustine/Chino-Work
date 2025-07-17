import { useState } from "react"
import axios from "axios"

{/**Process 
  1. User select file 
  2. Send file to sever 
  3. Check File upload response: success or failure
  4. Handle  errors
  5.  */}
function App() {

  {/**State to monitor when file is clicked  */ }
  const [file, setFile] = useState();

  {/**event = change triggered by file input. So we pass it as arg to keep track
    setFile(event.target.files[0])= gets first file user selected and store it in setFile  */}
  function HandleChange(event) {
    setFile(event.target.files[0])
  }

  {/**HTTP Request with axios
   */}
  function HandleSubmit(event) {
    event.preventDefault() //prevent page from reloading when image is uploaded which could cause useState to lose onClick state

    const url = "https://httpbin.org/post"; //location where image will be uploaded

    const formData = new FormData(); //Creates form object which takes keys and values and acts like payload

    formData.append("file", file); // Adding key ("file") and value (files) to formData

    formData.append("fileName", file.name); //Adding another key ("fieName") and value (file.name) to formData

    {/**Config allows to define format of files or image to upload */}
    const config = {
      headers: {
        'content-type': 'multipart/form-data',//tells server request contains files and need to be separated with /
      },
    }

    {/**captures server response */}
    axios.post(url, formData, config).then((response) => {
      console.log(response.data)
    });
  }

  return (
    <>
      <div className="App">

        {/**Upload form */}
        <form onSubmit={HandleSubmit}>
          <h2> File Upload</h2>
          <input type="file" onChange={HandleChange} />
          <button type="submit">Upload</button>
        </form>
      </div>

    </>
  )
}

export default App
