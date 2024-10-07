
import { Divider } from "@nextui-org/divider";
import Link from "next/link"; // Ensure you're using the correct Link
import Image from "next/image";
import { User, MessageCircle, Users } from "lucide-react"; // Import icons

const RightSidebar = async () => {
  return (
    <div className="">
      <div className="rounded-md shadow-lg bg-white">
        <div>
          <div
            className="w-full min-h-[120px] rounded-md mb-10 text-white"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(20, 141, 140, 0.8), rgba(28, 117, 188, 0.8)), url('https://images.unsplash.com/photo-1617227789575-97fa0d5a2f88?q=80&w=1829&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
              backgroundPosition: "center", // Centers the background
              backgroundSize: "cover", // Ensures the background covers the entire div
            }}
          >
            <Image
              src="https://themified.com/friend-finder/images/covers/1.jpg"
              alt="user"
              width={80}
              height={80}
              className="left-44 top-16 z-10 absolute rounded-full h-[80px] w-[80px] border-[7px] border-white object-cover object-top"
            />

            <div className="flex justify-end mr-4 mt-4 pt-9">
              <div>
                <h5 className="text-xl pt-6">
                  <Link href="/" className="text-white">
                    Sarah Cruiz
                  </Link>
                </h5>
                <a href="#" className="text-white flex items-center space-x-1">
                  <Users /> <span>1,299 followers</span>
                </a>
              </div>
            </div>
          </div>

          {/* <ul className="flex justify-center gap-4">
            <li>
              <User />
              <div>
                <Link href="/">Followers</Link> |
              </div>
            </li>
            <li>
              <MessageCircle />
              <div>
                <Link href="/">Post</Link> |
              </div>
            </li>
            <li>
              <Users />
              <div>
                <Link href="/">Following</Link>
              </div>
            </li>
          </ul> */}

          <div className="overflow-visible py-2">
            <div className="max-w-md mx-auto">
              <div className=" flex justify-center h-5 items-center space-x-4 text-small text-center">
                <div>
                  <b>0</b>
                  <p>Posts</p>
                </div>
                <Divider orientation="vertical" />
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
            {/* <h2>You are not logged in</h2> */}

            <div className="flex gap-4 flex-wrap p-5 justify-center">
              <Link href="#">About</Link>
              <Link href="#">Settings</Link>
              <Link href="#">Docs</Link>
              <Link href="#">Support</Link>
              <Link href="#">Help</Link>
              <Link href="#">Privacy and Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
