import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import { User, userListSchema } from "@/models/user.model";
import {
  ComponentProps,
  FC,
  HTMLProps,
  useEffect,
  useMemo,
  useState,
} from "react";

const inter = Inter({ subsets: ["latin"] });

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
        <h4 className="text-gray-500">{detail.company.name}</h4>
      </div>
    </div>
  );
};

export default function Home({ users }: { users: Array<User> }) {
  const [viewingContactId, setViewingContactId] = useState<number | null>(null);

  useEffect(() => {
    setViewingContactId(users[0].id);
  }, []);

  const viewingContact = useMemo(
    () => users.find((u) => u.id == viewingContactId),
    [users, viewingContactId]
  );

  return (
    <Layout>
      <div
        style={{
          minHeight: 0,
        }}
        className=" bg-white border border-gray-200 h-full overflow-y-scroll rounded-xl  w-[340px]"
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
      <div className="bg-white flex-1 rounded-xl w-full"></div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  const parsed = userListSchema.safeParse(data);

  if (!parsed.success) {
    return {
      props: {
        users: [],
      },
    };
  }

  return {
    props: {
      users: parsed.data,
    },
  };
};
