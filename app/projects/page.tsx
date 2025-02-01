"use client";

import DialogComponent from "./dialog";
import { api } from "@/convex/_generated/api";
import { Unauthenticated, Authenticated, useQuery } from "convex/react";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import {
  Trash2,
  Settings,
  PlusIcon,
  ChevronDownIcon,
  Grid,
  List,
} from "lucide-react";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import { Spinner } from "@heroui/spinner";
import { useState, useEffect } from "react";
import { StickyHeader } from "@/components/layout/sticky-header";

import { UserButton } from "@clerk/nextjs";

import { ProjectNavigationMenu } from "@/components/NavigationMenu/projectNavbar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Page() {
  const data = useQuery(api.projects.listProjects, {});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);
  const router = useRouter();

  return (
    <>
      <StickyHeader className="px-4 ">
        <div className="flex justify-center items-center  ">
          <div className="flex justify-between items-center w-full max-w-6xl ">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold "
            >
              <Image
                src="/icons/bridgeflow.svg"
                alt="BridgeFlow"
                width={30}
                height={30}
              />
              <span className="text-2xl font-bold ">BridgeFlow</span>
            </Link>

            <div className="flex items-center gap-4">
              <ProjectNavigationMenu />

              <SignInAndSignUpButtons />
            </div>
          </div>
        </div>
      </StickyHeader>
      <div className="w-full h-[calc(100vh-100px)]  flex justify-center   ">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(700px_circle_at_bottom,white,transparent)]"
          )}
        />

        <div className="flex flex-col w-full h-full max-w-6xl  ">
          {/* Add project bar */}
          <div className="flex flex-col gap-4 mb-10 mt-20">
            <div className="flex justify-between items-center">
              <div className="flex w-full flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex space-x-4 items-center w-full overflow-hidden">
                      <span className="inline-block rounded-full overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 w-9 h-9" />
                      <div className="flex items-center gap-3">
                        <p className="truncate tracking-[-0.24px] font-medium ">
                          Tanishq-Team
                        </p>
                      </div>
                      <div>
                        <ChevronDownIcon
                          className="w-6 h-6 font-m text-indigo-600 "
                          size={50}
                        />
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Select a workspace</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked={true}>
                      Tanishq-Team
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Vtex - Team
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <Button
                      variant={"ghost"}
                      onClick={() => console.log("clicked")}
                      className="w-full justify-center"
                    >
                      <PlusIcon className="w-4 h-4 " /> New Team
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex gap-4 items-center mt-2 sm:mt-0">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Button variant={"ghost"} size={"icon"}>
                    <GearIcon className="w-4 h-4 " />
                  </Button>
                  <Button variant={"ghost"}>
                    {" "}
                    <PlusIcon className="w-4 h-4 " /> Invite
                  </Button>
                  <DialogComponent />
                </div>
              </div>
            </div>
          </div>
          <Separator className="w-full bg-neutral-300 rounded-lg" />
          <div className="flex flex-col gap-4 mt-4 ">
            <div className="flex justify-between items-center">
              <div className="flex w-full flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div className="flex items-center gap-2 h-full ">
                  <h1 className=" font-medium text-sm">
                    {data?.length} Projects
                  </h1>
                  <Separator
                    orientation="vertical"
                    className="h-3 bg-neutral-500 z-10"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="flex space-x-4 items-center w-full overflow-hidden">
                        <div className="flex items-center">
                          <p className="truncate tracking-[-0.24px] font-medium text-sm ">
                            Recent Activity
                          </p>
                        </div>
                        <div>
                          <ChevronDownIcon
                            className="w-4 h-4 font-m text-indigo-600 "
                            size={50}
                          />
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuCheckboxItem checked={true}>
                        Recent Activity
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Creation Date
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Alphabetical
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex  items-center mt-2 sm:mt-0">
                  <Button variant={"ghost"} size={"icon"}>
                    <List className="w-4 h-4 " />
                  </Button>
                  <Button variant={"ghost"} size={"icon"}>
                    <Grid className="w-4 h-4 " />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Projects */}
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-full">
              <Spinner />
            </div>
          ) : data?.length === 0 ? (
            <div className="flex justify-center items-center w-full h-full">
              <div className="flex flex-col justify-start pt-10 items-center w-full h-full">
                <p className="text-xl text-gray-500 mb-6">No projects found</p>
                <DialogComponent />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {data?.map((project) => (
                <Card
                  key={project._id}
                  className="  aspect-video  max-h-[500px] shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg"
                >
                  <CardHeader>
                    <CardTitle>
                      <div className="flex items-center justify-between w-full">
                        <span>{project.projectName}</span>
                        <div className="flex gap-2">
                          <AlertDialog>
                            <AlertDialogTrigger> <Trash2 className="h-4 w-4 text-red-500" /></AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your project and remove
                                  it from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="destructive" >Continue</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>                          
                          <button className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                            <Settings className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </CardTitle>
                    <CardDescription>
                      {project.projectDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.integration.map((label) => (
                        <span
                          key={label.label}
                          className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                        >
                          {label.label}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="  rounded-bl-lg rounded-br-lg p-2 ">
                    <div className="flex h-full w-full items-center justify-end">
                      <InteractiveHoverButton
                        onClick={() => {
                          router.push(`/connections/${project._id}`);
                        }}
                        text="Go to flow"
                        className="w-32 "
                      />
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function SignInAndSignUpButtons() {
  return (
    <div className="flex gap-4">
      <Authenticated>
        <UserButton />
      </Authenticated>
    </div>
  );
}
