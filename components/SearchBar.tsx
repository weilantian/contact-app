import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className="mt-1  items-center gap-1 rounded-md w-full px-2 py-2 flex bg-gray-50">
      <IoSearch className=" text-gray-400" />
      <input
        className="bg-gray-50 outline-none flex-1 w-full"
        placeholder="Search for contact"
      />
    </div>
  );
};

export default SearchBar;
