import Header from "./_components/header";
import UserInfo from "./_components/user-info";

const MainLayout = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header />
      <div className="flex flex-row h-full max-w-6xl w-full space-x-6 p-20 overflow-y-auto">
        <UserInfo />
        <main className="flex-row h-full w-full">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
