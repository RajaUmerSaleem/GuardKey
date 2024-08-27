import Logo from "./Logo"
const Navbar = () => {
  return (
    <nav className='w-full h-[45px] bg-slate-600'>
      <ul className='flex w-full justify-between px-[20px] sm:px-[100px] items-center h-full '>
        <li className="font-semibold text-[20px] sm:font-bold sm:text-[25px]  flex justify-center content-center text-white" >< Logo />
        </li>
        <li className="p-2  text-white">
          <button className='font-semibold  bg-green-500 h-[70%] rounded-full px-2 py-1 border hover:bg-green-400 border-white-[1px] justify-center flex items-center cursor-pointer'>
          <a
              href="https://github.com/RajaUmerSaleem/GuardKey"
              target="_blank"
              rel="noopener noreferrer"
              className='flex'
            >
            <img className='w-[20px] mr-2' src="github.svg" alt="github logo" />
            GitHub</a></button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
