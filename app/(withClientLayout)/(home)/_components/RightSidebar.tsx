import { Divider } from "@nextui-org/divider";
import Link from "next/link"; // Ensure you're using the correct Link
import Image from "next/image";
import { User, MessageCircle, Users, LucideTv, LucideBadge, LucideGlobe, LucideUser2, AlarmCheck, Settings, LogOut } from "lucide-react"; // Import icons

const RightSidebar = ({
  users,
  userData, // Now we have a structured userData
  premiumPosts,
  premium,
}: {
  users: any;
  userData: any;
  premiumPosts: any;
  premium?: boolean;
}) => {
  // console.log(premiumPosts);
  
  return (
    <div className="">
      <div className="rounded-md shadow-lg bg-white mt-5">
        <div>
          <div
            className="w-full min-h-[120px] rounded-md mb-2 text-white"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(20, 141, 140, 0.8), rgba(28, 117, 188, 0.8)), url('https://images.unsplash.com/photo-1617227789575-97fa0d5a2f88?q=80&w=1829&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <Image
              src={userData?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
              alt="user"
              width={70}
              height={70}
              className="left-4 -top-10 z-10 absolute rounded-full h-[70px] w-[70px] border-[7px] border-white object-cover object-top"
            />
            <div className="flex justify-end mr-4 mt-4 pt-9">
              <div>
                <h5 className="text-[14px] pt-6 px-2">
                  <Link href="/" className="text-white">
                    {userData?.name || "User Name"}
                  </Link>
                </h5>
                <a href="#" className="text-white  flex items-center text-[14px] space-x-1">
                  <Users className="w-8" /> <span>Followers</span>
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-visible py-2 dark:text-black">
            <div className="max-w-md mx-auto py-3">
              <div className="flex justify-center h-5 items-center space-x-4 text-small text-center">
               
                <div>
                  <b>0</b>
                  <p>Followers</p>
                </div>
                <Divider orientation="vertical" />
                <div>
                  <b>0</b>
                  <p>Following</p>
                </div>
              </div>
              <Divider className="my-4" />
            </div>

            <div className="flex gap-4 flex-wrap justify-start px-3 dark:text-black">
            <div className="mb-6">
            <ul>
            <li className="flex items-center mb-2">
                <LucideUser2 className="text-blue-500 mr-2 w-5" />
                <span className="text-[14px]">User Profile</span>
              </li>
              <li className="flex items-center mb-3">
                <MessageCircle className="text-blue-500 mr-2 w-5" />
                <span className="text-[14px]">Message</span>
              </li>
              <li className="flex items-center mb-3">
                <AlarmCheck className="text-blue-500 mr-2 w-5" />
                <span className="text-[14px]">Notification</span>
              </li>
              <li className="flex items-center mb-3">
                <LucideBadge className="text-red-500 mr-2 w-5" />
                <span className="text-[14px]">Premium</span>
              </li>
              <li className="flex items-center mb-3">
                <LucideGlobe className="text-yellow-500 mr-2 w-5" />
                <span className="text-[14px]">Stories</span>
              </li>
              <Divider className="my-4" />
              <li className="flex items-center mb-3">
                <Settings className="text-yellow-500 mr-2 w-5" />
                <span className="text-[14px]">Settings</span>
              </li>
              <li className="flex items-center mb-3">
                <LogOut className="text-yellow-500 mr-2 w-5" />
                <span className="text-[14px]">Logout</span>
              </li>
            </ul>
          </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap p-3 text-[#148d8c] justify-center mb-10">
				<Link href="/about">
					About
				</Link>
				<Link href="#" >
					Settings
				</Link>
		
				<Link href="#" >
					Help
				</Link>
				<Link href="#" >
					Privacy and Policy
				</Link>
			</div>
    </div>
  );
};

export default RightSidebar;
