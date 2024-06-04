import { User } from "@/models/user.model";
import { ComponentProps, FC } from "react";
import SearchBar from "./SearchBar";

const ContactListItem: FC<
  { detail: User; selected: boolean } & ComponentProps<"div">
> = ({ detail, selected, ...props }) => {
  return (
    <div
      {...props}
      className={`flex gap-2  ${
        selected ? "bg-gray-50" : ""
      } rounded-xl  hover:bg-gray-50 my-2 mx-2 px-3 items-center py-3`}
    >
      <div className=" bg-gray-100 w-14 h-14 rounded-full"></div>
      <div>
        <h3 className="font-medium">{detail.name}</h3>
        <h4 className="text-gray-500">@{detail.username}</h4>
      </div>
    </div>
  );
};

const ContactList: FC<{
  viewingContactId: number | null;
  setViewingContactId: (id: number) => void;
  users: User[];
}> = ({ viewingContactId, setViewingContactId, users }) => {
  return (
    <div className="bg-white rounded-md flex flex-col border border-gray-200">
      <div className="mx-2 my-1">
        <SearchBar />
      </div>

      <div
        style={{
          minHeight: 0,
        }}
        className="  h-full overflow-y-scroll   w-[340px]"
      >
        <div>
          {users.map((user) => (
            <ContactListItem
              onClick={() => setViewingContactId(user.id)}
              selected={viewingContactId === user.id}
              detail={user}
              key={user.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactList;
