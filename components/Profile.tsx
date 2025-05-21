import user from "../assets/images/user.png";
import {
  UserIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
// import Cards from "./Cards";

const buttons = [
  { id: 1, title: "Account Settings", icon: UserIcon },
  { id: 2, title: "Privacy Settings", icon: Cog6ToothIcon },
  { id: 3, title: "Payment Methods", icon: CreditCardIcon },
  { id: 4, title: "Logout", icon: ArrowLeftStartOnRectangleIcon },
];

const Profile = () => {
  return (
    <div className=" xl:w-auto w-auto items-start justify-center flex flex-col rounded-2xl h-auto mb-5">
      {/*  */}
      <div className="flex flex-row xl:w-auto w-auto items-center justify-center  px-0">
        <div className="rounded-full bg-[#c5edfd] flex items-center justify-center">
          <img src={user} className="w-[60%] m-3" />
        </div>
        {/* <div className="flex flex-col items-start justify-center">
          <h5 className="flex justify-self-center text-lg font-semibold text-primary" style={{ lineHeight: "1.1em" }}>Tom</h5>
          <h5 className=" w-auto text-sm font-extralight flex-wrap text-wrap text-primary" style={{ lineHeight: ".4em" }}>tomcodeit</h5>
        </div> */}
      </div>
      {/* <Cards /> */}
      {/* <div className="w-auto flex flex-col items-center justify-center">
        <div className="flex flex-col w-45 justify-between p-0"> */}
          {/* <div className=" w-full flex items-center justify-between mt-1">
            <div className="flex flex-col items-start justify-center">
              <span className="text-sm flex items-start justify-start text-primary">Total Balance</span>
              <span className="text-xl font-semibold text-primary">$10,634,35</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <span className=" font-semibold text-green-500">Active</span>
            </div>
          </div> */}
        {/* </div> */}

        {/* <div className="w-full flex flex-col gap-4 mt-5 overflow-y-auto max-h-full">
          {buttons.map(({ id, title, icon: Icon }) => (
            <div
              key={id}
              className="w-full mx-auto bg-[#f0f0f0] rounded-lg py-5 flex items-center justify-center gap-2 cursor-pointer">
              <Icon className="w-[22px] h-[22px] text-primary" />
              <span className="text-primary font-semibold">{title}</span>
            </div>
          ))}
        </div> */}
      </div>
    // </div>
  );
};

export default Profile;
