import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";

export default function Header(props) {
  const [currentLink, setCurrentLink] = useState("Dashboard");
  const updateCurrentLink = (link) => {
    setCurrentLink(link);
  };

  const { logout } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentLink(null);
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const navigation = [
    {
      name: "Employees",
      href: "/employees",
      current: currentLink === "Employees",
    },
    {
      name: "Training Materials",
      href: "/trainingmaterials",
      current: currentLink === "Training Materials",
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const matchingLink = navigation.find((item) =>
      currentPath.includes(item.href)
    );
    if (matchingLink) {
      setCurrentLink(matchingLink.name);
    }
  }, [location.pathname]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://static.wixstatic.com/media/23327e_faf22b12eb4d45109ccd29d36e6eb979~mv2.png/v1/crop/x_7,y_0,w_477,h_308/fill/w_316,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Mimosas%201_webp.png"
                    alt="Mimosas Logo"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://static.wixstatic.com/media/23327e_faf22b12eb4d45109ccd29d36e6eb979~mv2.png/v1/crop/x_7,y_0,w_477,h_308/fill/w_316,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Mimosas%201_webp.png"
                    alt="Mimosas Logo"
                  />
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white no-underline"
                            : "text-gray-300 no-underline hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                        onClick={() => setCurrentLink(item.name)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="w-6 h-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                        alt="Generic Profile Avatar"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Link to="/account" className="no-underline">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 no-underline"
                              )}
                              onClick={() => setCurrentLink("Your Profile")} // Update the currentLink state
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                      </Link>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={handleLogout}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 no-underline"
                            )}
                            href="/"
                          >
                            Log out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={() => updateCurrentLink(item.name)} // Update the currentLink state
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white no-underline"
                      : "text-gray-300 no-underline hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>

          {props.children}
        </>
      )}
    </Disclosure>
  );
}
