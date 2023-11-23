import React, { useState } from "react";
import { toast } from "react-toastify";

function Form() {
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    length: "",
    uppercase: false,
    lowercase: false,
    numbers: false,
    specialChars: false,
  });

  const generatePassword = () => {
    const length = formData.length || 5; // Default length for the password or use the length from the form
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()-_+=~";

    let characters = "";
    if (formData.uppercase) characters += uppercaseChars;
    if (formData.lowercase) characters += lowercaseChars;
    if (formData.numbers) characters += numberChars;
    if (formData.specialChars) characters += specialChars;

    if (!characters) {
      // alert("Please select at least one character type.");
      toast.error("Please select at least one character type.")
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(newPassword);
  };

  const changeHandler = (e) => {
    const { name, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData({
        ...formData,
        [name]: e.target.value,
      });
    }
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard
        .writeText(password)
        .then(() => {
          console.log("Password copied to clipboard!");
          toast.success("Password copied to clipboard!")
        })
        .catch((error) => {
          console.error("Unable to copy password to clipboard: ", error);
          toast.error("Unable to copy password to clipboard")
        });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    generatePassword();
  };

  return (
    <div className="w-full p-5 flex flex-col items-center justify-center gap-5">
      <div className="flex border rounded-lg shadow w-full md:w-1/2 h-100% p-5 items-center justify-between overflow-hidden">
        <h1 className="font-bold text-lg">{password ? password : <span className="text-slate-400 text-xs font-normal"> Please wi8 for the selection</span> }</h1>
        <div onClick={copyToClipboard} className="bg-green-500 text-white font-bold border hover:cursor-pointer p-1 px-4 rounded">Copy</div>
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
                  placeholder="Minimum length 5"
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
                className="border p-2 text-xs px-4 bg-green-600 text-white rounded w-full"
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
