import React from "react";
import styles from "@/src/app/utils/style";
import NavItems from "../NavItems";
import ProfileDropDown from "../ProfileDropDown";

const Header = () => {
  return (
    <header className="w-full  bg-[#0F1524] ">
      <div className="w-[90%] h-[80px] m-auto flex items-center justify-between">
        <h1 className={`${styles.logo}`}>Becodemy</h1>
        <NavItems />
        <ProfileDropDown />
      </div>
    </header>
  );
};

export default Header;
