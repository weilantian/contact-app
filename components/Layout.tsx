import { FC, PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import Link from "next/link";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [a, setA] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div
        style={{
          minHeight: 0,
        }}
        className="flex mx-4 mb-3 gap-2  flex-1"
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
