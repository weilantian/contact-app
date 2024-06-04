import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import { GetServerSideProps, GetStaticProps } from "next";
import { User, userListSchema } from "@/models/user.model";
import {
  ComponentProps,
  FC,
  HTMLProps,
  useEffect,
  useMemo,
  useState,
} from "react";
import SearchBar from "@/components/SearchBar";
import ContactList from "@/components/ContactList";
import {
  IoCall,
  IoCallOutline,
  IoMail,
  IoMailOutline,
  IoShare,
  IoStar,
  IoStarOutline,
} from "react-icons/io5";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

const DynamicMap = dynamic(() => import("@/components/Map"), { ssr: false });

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
      <ContactList
        setViewingContactId={setViewingContactId}
        users={users}
        viewingContactId={viewingContactId}
      />
      <div
        style={{
          minHeight: 0,
        }}
        className="bg-white overflow-y-scroll  border border-gray-200  flex-1 rounded-md w-full"
      >
        <div className="w-full h-[180px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md"></div>
        <div className="flex justify-between">
          <div className=" px-12 -mt-16 gap-4 items-center">
            <div className=" bg-gray-100 border-4 border-white w-32 h-32 rounded-full"></div>
            <div className="mt-2">
              <h3 className="font-medium text-3xl">{viewingContact?.name}</h3>
              <h4 className="text-gray-500 cla">@{viewingContact?.username}</h4>
              <div className="flex gap-2 mt-1">
                <div className="flex gap-1 text-gray-500 items-center">
                  <IoMailOutline className="" />{" "}
                  <a
                    href={`mailto:${viewingContact?.email}`}
                    className="text-blue-500"
                  >
                    {viewingContact?.email}
                  </a>
                </div>
                <div className="flex gap-1 text-gray-500 items-center">
                  <IoCallOutline className="" /> {viewingContact?.phone}
                </div>
              </div>
            </div>
          </div>
          <div className="flex -mt-20 items-center gap-2 mr-4">
            <button className="border border-gray-300 gap-2 flex text-gray-600 items-center px-4 py-3 rounded-full">
              <IoShare />
              Share
            </button>
            <button className="rounded-full px-4 py-4 border border-gray-300">
              <IoStarOutline />
            </button>
          </div>
        </div>

        <div className="border-t px-6 mx-4 mt-4 border-gray-200">
          <h3 className="mt-4 text-xl font-medium">Company</h3>

          <div className="flex mt-4 gap-3 items-center">
            <div className="w-14 h-14 bg-gray-200 rounded-md"></div>
            <div>
              <h3 className="text-lg font-medium">
                {viewingContact?.company.name}
              </h3>
              <p className="text-gray-500">
                {viewingContact?.company.catchPhrase}
              </p>
            </div>
          </div>
        </div>

        <div className=" px-6 mx-4 mt-8  mb-12">
          <h3 className="mt-4 text-xl font-medium">Address</h3>
          <div className="w-full mt-4 rounded-md overflow-hidden relative h-[240px]">
            <DynamicMap />

            <div
              style={{
                zIndex: 9999,
              }}
              className=" bottom-0 bg-opacity-80 backdrop-blur-lg rounded-md  absolute w-full px-4 py-2 bg-white z-50"
            >
              <p className="font-medium">{viewingContact?.address.street},</p>

              <p className="text-gray-500">
                {viewingContact?.address.city},{" "}
                {viewingContact?.address.zipcode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
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
    revalidate: 100,
    props: {
      users: parsed.data,
    },
  };
};
