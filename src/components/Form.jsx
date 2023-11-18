import React, { useState } from "react";

function Form() {
  const [password, setPassword] = useState();
  const [formData, setFormData] = useState({
    length: "",
    uppercase: "",
    lowercase: "",
    numbers: "",
    specialChars: "",
  });

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked ? value : "",
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);

      const response = await fetch("http://localhost:4000/generate-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data?.password);
      setPassword(data?.password);
    } catch (error) {
      console.log(error);
    }
  };
  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password)
        .then(() => {
          console.log("Password copied to clipboard!");
          // Optional: You can show a success message or perform additional actions upon successful copy.
        })
        .catch((error) => {
          console.error("Unable to copy password to clipboard: ", error);
        });
    }
  };


  return (
    <div className="w-full p-5 flex flex-col items-center justify-center gap-5">
      <div className="flex border rounded-lg shadow w-full md:w-1/2 h-100% p-5 items-center justify-between overflow-hidden">
        <h1>{password ? password : <span className="text-slate-400"> Please wi8 for the selection</span> }</h1>
        <div onClick={copyToClipboard} className="hover:pointer hover:text-green-700 font-bold border p-1 px-4 rounded">Copy</div>
      </div>
      <div className="border rounded-lg shadow md:w-1/2 h-100% p-5">
        <div className="flex my-3 flex-col items-start">
          <h1 className="mb-3 font-semibold md:font-bold text-2xl ">Customize your password</h1>
          <hr className="p-1 w-full" />
        </div>
        <form action="" onSubmit={submitHandler}>
          <div className="w-full flex flex-col items-start md:items-center gap-3">
            <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="flex flex-col items-start w-full md:w-1/2 gap-2">
                <label
                  className="text-xs font-semibold text-slate-400"
                  htmlFor="length"
                >
                  Length :
                </label>
                <input
                  onChange={changeHandler}
                  id="length"
                  type="number"
                  name="length"
                  min="5"
                  max="50"
                  placeholder="Minimum 5 length mandatory"
                  className="border rounded p-1 w-full outline-none placeholder:text-[12px] ps-2"
                />
              </div>

              <div className="flex items-start md:w-1/2 gap-2">
                <div>
                  <label
                    className="text-xs font-semibold text-slate-400"
                    htmlFor="uppercase"
                  >
                    uppercase
                  </label>
                  <input
                    onChange={changeHandler}
                    id="uppercase"
                    type="checkbox"
                    name="uppercase"
                    className="border rounded p-1 w-full outline-none"
                  />
                </div>
                <div>
                  <label
                    className="text-xs font-semibold text-slate-400"
                    htmlFor="lowercase"
                  >
                    lowercase
                  </label>
                  <input
                    onChange={changeHandler}
                    id="lowercase"
                    type="checkbox"
                    name="lowercase"
                    className="border rounded p-1 w-full outline-none"
                  />
                </div>
                <div>
                  <label
                    className="text-xs font-semibold text-slate-400"
                    htmlFor="numbers"
                  >
                    numbers
                  </label>
                  <input
                    onChange={changeHandler}
                    id="numbers"
                    type="checkbox"
                    name="numbers"
                    className="border rounded p-1 w-full outline-none"
                  />
                </div>
                <div>
                  <label
                    className="text-xs font-semibold text-slate-400"
                    htmlFor="specialChars"
                  >
                    specialChars
                  </label>
                  <input
                    onChange={changeHandler}
                    id="specialChars"
                    type="checkbox"
                    name="specialChars"
                    className="border rounded p-1 w-full outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              <button
                type="submit"
                className="border p-2 text-xs px-4 bg-yellow-600 text-white rounded w-full"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
