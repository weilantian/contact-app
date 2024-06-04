import { FC, PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import Link from "next/link";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [a, setA] = useState(false);

  return (
    <div>
      <Navbar />

      <div className="flex">{children}</div>
    </div>
  );
};

export default Layout;
