import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import IconButton from "./iconButton";
import { MdPerson } from "react-icons/md";

const Profile = () => {
  const { logout, user } = useAuth0();
  const handleLogout = () => {
    localStorage.removeItem(`notes-${user?.sub}`);
    logout({ logoutParams: { returnTo: window.location.origin } });
  };
  return (
    <>
      <IconButton
        icon={MdPerson}
        bgColor="bg-zinc-400"
        onClick={handleLogout}
        label="logout"
        className={clsx("mr-1 font-medium")}
      />
    </>
  );
};

export default Profile;
