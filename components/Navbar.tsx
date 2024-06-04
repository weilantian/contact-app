import { FC } from "react";
import { IoPeople, IoPerson } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className=" border gap-2 justify-between flex items-center border-gray-200 mx-4 rounded-xl my-2 py-3 px-4 bg-white">
      <span style={{ width: 120 }} />
      <div className="flex gap-1 text-lg">
        <div className="flex  items-center">
          <IoPeople />
        </div>
        <h3 className="font-medium ">Contacts</h3>
      </div>

      <button className="bg-blue-500 px-3 py-2 rounded-md text-white">
        New Contact
      </button>
    </nav>
  );
};
export default Navbar;
