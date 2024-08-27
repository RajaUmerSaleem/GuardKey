import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Logo from './components/Logo';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  const [input, setInput] = useState({ url: '', username: '', password: '', Mode: true });
  const [dataArray, setDataArray] = useState(() => {
    const savedData = localStorage.getItem('dataArray');
    return savedData ? JSON.parse(savedData) : [];
  });
  useEffect(() => {
    localStorage.setItem('dataArray', JSON.stringify(dataArray));
  }, [dataArray]);
  const handleShow = (index) => {
    setDataArray(dataArray.map((item, i) => i === index ? { ...item, Mode: !item.Mode } : item));
  }
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (input.url === '') {
      toast("Empty URL is Not Allowed!");
    }
    if (input.username === '') {
      toast("Empty Username is Not Allowed!");
    }
    if (input.username === '') {
      toast("Empty Username is Not Allowed!");
    }
    if (input.username.length >= 16) {
      toast("Long User name is Not Allowed!");
    }
    if (input.password.length >= 16) {
      toast("Long Pasword is Not Allowed!");
    }

    if (input.username.length <= 16&&input.password.length <= 16&&input.url != '' && input.username != '' && input.password != '') {
      setDataArray([...dataArray, input]);
      setInput({ url: '', username: '', password: '' });
    }
  };

  const handleDelete = (index) => {
    setDataArray(dataArray.filter((_, i) => i !== index));
  };
  const handlecopy = (index) => {
    navigator.clipboard.writeText([dataArray[index].url, dataArray[index].username, dataArray[index].password])
    toast.success("Data copied to clipboard!");
  }

  const handleEdit = (index) => {
    const itemToEdit = dataArray[index];
    setInput(itemToEdit);
    handleDelete(index);
  };

  return (
    <div className="w-full h-[97vh] bg-grid">
      <ToastContainer />
      <Navbar />
      <main className="w-full h-[90%] p-1">
        <div className='flex flex-col items-center text-shadow-green-glow'>
          <div className='font-bold text-[40px] text-black'>
            <Logo />
          </div>
          <span className='text-black text-shadow-lg text-[12px] sm:text-[15px] font-light'>
            Your Own Completely Secure Password Manager
          </span>
        </div>

        <div className='bg-green-50 w-full sm:w-[70%] h-[20%] mx-auto'>
          <div className='w-full h-[25%] p-1'>
            <input
              className='w-full h-[99%] rounded-full border-green-500 border px-2'
              type="text"
              placeholder='URL'
              name="url"
              value={input.url}
              onChange={handleInputChange}
            />
          </div>
          <div className='w-full h-[25%] p-1 justify-around flex gap-5'>
            <input
              className='w-[77%] h-[99%] rounded-full border-green-500 border px-2'
              type="text"
              placeholder='Username'
              name="username"
              value={input.username}
              onChange={handleInputChange}
            />
            <input
              className='w-[20%] h-[99%] rounded-full border-green-500 border px-2 placeholder:text-[10px]'
              type="password"

              placeholder='Password'
              name="password"
              value={input.password}
              onChange={handleInputChange}
            />
          </div>
          <div className='w-full h-[50%] p-2 flex justify-center'>
            <button
              onClick={handleAdd}
              className='w-[30%] sm:w-[20%] md:w-[15%] hover:bg-green-400 sm:text-[20px] hover:text-gray-800 bg-green-500 border border-black h-full rounded-full flex justify-between items-center px-1 sm:px-3 add-button'
            >
              <div className='text-[18px] font-bold sm:font-bold'>Add</div>
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" className="fill-current" />
                <line x1="12" y1="8" x2="12" y2="16" stroke="black" strokeWidth="2" className="add-icon" />
                <line x1="8" y1="12" x2="16" y2="12" stroke="black" strokeWidth="2" className="add-icon" />
              </svg>
            </button>
          </div>
        </div>

        <div className='h-[5%]'>
          <ul className="bg-green-300 h-full w-full sm:w-[70%] text-gray-600 border border-gray-500 border-b-0 uppercase text-[10px] font-semibold sm:text-[20px] leading-normal list-none flex mx-auto gap-1">
            <li className="w-[45%] flex justify-center items-center ">URL</li>
            <li className="w-[20%]  flex justify-center items-center">Username</li>
            <li className="w-[20%]  flex justify-center items-center">Password</li>
            <li className="w-[25%]  flex justify-center items-center">Actions</li>
          </ul>
        </div>
        <div className=' w-full sm:w-[70%] h-[62%] overflow-y-scroll mx-auto'>
          <table className='h-full w-full  bg-white border border-gray-500'>
            {dataArray.length === 0 ? <div className='h-full w-full text-[15px] text-shadow-green-glow sm:text-[30px] bg-white border border-gray-500 flex justify-center items-center font-mono font-extralight ' >No Data In Storage</div> : ""}
            {dataArray.map((item, index) => (
              <tr key={index} className='h-[12%] w-full  text-[12px] sm:text-[15px] flex hover:bg-gray-200 cursor-pointer '>
                <td className="w-[42%]   sm:w-[45%]  border border-gray-500 sm:px-2 text-left flex-wrap overflow-hidden ">{item.url}</td>
                <td className="w-[20%]   border border-gray-500 sm:px-2 overflow-hidden">{item.username}</td>
                <td className="w-[20%]   border border-gray-500 sm:px-2 text-left flex flex-col gap-0 overflow-hidden"> {item.Mode ? item.password : "******"}
                  <img
                    onClick={() => handleShow(index)}
                    className='h-[85%] w-[30%] sm:w-[12%] hover:h-[95%] cursor-pointer'
                    src={item.Mode ? "show-svgrepo-com.svg" : "hide-svgrepo-com.svg"}
                    alt="delete"
                  />
                </td>
                <td className="w-[25%] border border-gray-500 sm:px-2 flex justify-center items-center ">
                  <img
                    onClick={() => handleDelete(index)}
                    className='h-[85%] w-[33%] sm:w-[20%] hover:h-[95%] cursor-pointer'
                    src="delete-svgrepo-com.svg"
                    alt="delete"
                  />
                  <img
                    onClick={() => handleEdit(index)}
                    className='h-[85%] w-[33%] sm:w-[20%] hover:h-[95%] cursor-pointer'
                    src="edit-svgrepo-com.svg"
                    alt="edit"
                  />
                  <img
                    onClick={() => handlecopy(index)}
                    className='h-[70%] w-[33%] sm:w-[20%] hover:h-[90%] cursor-pointer'
                    src="copy-svgrepo-com.svg"
                    alt="copy"
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      </main>
      <div className='text-white'>
        <Footer />
      </div>
    </div>
  );
}
