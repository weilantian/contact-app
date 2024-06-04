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

const inter = Inter({ subsets: ["latin"] });

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
      <div className="bg-white border border-gray-200  flex-1 rounded-md w-full">
        <div className=" bg-gray-100 w-14 h-14 rounded-full"></div>
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
