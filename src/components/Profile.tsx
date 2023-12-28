import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { logout } = useAuth0();
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className="w-8 h-8 rounded-full bg-gray-400 mr-2"
      onClick={handleLogout}
    />
  );
};

export default Profile;
