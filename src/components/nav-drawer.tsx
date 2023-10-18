"use client";

import Link from "next/link";
import SignOut from "./sign-out";
import { useSession } from "next-auth/react";
import { useActivePath } from "@/app/helper";

export default function NavDrawer() {
  const { data: session } = useSession();
  const checkActivePath = useActivePath();

  type NavigationItem = {
    href: string;
    name: string;
  };

  const users: NavigationItem[] = [{ href: "/users", name: "Users" }];
  const employees: NavigationItem[] = [
    { href: "/employees", name: "Employees" },
  ];
  const events: NavigationItem[] = [{ href: "/events", name: "Events" }];

  return (
    <>
      <input type="checkbox" id="drawer-left" className="drawer-toggle" />

      <label
        htmlFor="drawer-left"
        className="btn btn-primary bg-inherit p-0 mt-4 text-black "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </label>
      <label className="overlay shadow-lg" htmlFor="drawer-left"></label>
      <div className="drawer">
        <div className="drawer-content pt-10 flex flex-col h-full">
          <label
            htmlFor="drawer-left"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <div>
            <section className="sidebar-title items-center p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="flex flex-col">
                <span>PITO</span>
                <span className="text-xs font-normal text-content2">
                  Event User Management
                </span>
              </div>
            </section>
            <section className="sidebar-content h-fit min-h-[20rem] overflow-visible">
              <nav className="menu-rounded md">
                <ul className="menu-items p-2">
                  {session?.user.role === "ADMIN" &&
                    users.map(({ href, name }) => (
                      <Link
                        href={href}
                        className={
                          checkActivePath(href)
                            ? "bg-slate-200 font-bold rounded-md active"
                            : ""
                        }
                      >
                        <li
                          key={href}
                          className="menu-item hover:bg-slate-200  "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                          <span>{name}</span>
                        </li>
                      </Link>
                    ))}

                  {events.map(({ href, name }) => (
                    <Link
                      href={href}
                      className={
                        checkActivePath(href)
                          ? "bg-slate-200 font-bold rounded-md active"
                          : ""
                      }
                    >
                      <li key={href} className="menu-item hover:bg-slate-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                          />
                        </svg>

                        <span>{name}</span>
                      </li>
                    </Link>
                  ))}

                  {employees.map(({ href, name }) => (
                    <Link
                      href={href}
                      className={
                        checkActivePath(href)
                          ? "bg-slate-200 font-bold rounded-md active"
                          : ""
                      }
                    >
                      <li key={href} className="menu-item hover:bg-slate-200  ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                          />
                        </svg>
                        <span>{name}</span>
                      </li>
                    </Link>
                  ))}

                  <Link href="#">
                    <li className="menu-item hover:bg-red-500 hover:text-slate-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                      </svg>
                      <span>
                        <SignOut />
                      </span>
                    </li>
                  </Link>
                </ul>
              </nav>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
