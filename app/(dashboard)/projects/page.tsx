"use client";

import DialogComponent from "./dialog";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Trash2, Settings } from "lucide-react";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Page() {
  const data = useQuery(api.projects.listProjects, {});
  const router = useRouter();
  const deleteProject = useMutation(api.projects.deleteProject);

  function handleDeleteProject(projectId: Id<"projects">) {
    deleteProject({ projectId });
    router.refresh();
  }

  return (
    <div className="w-full h-full p-5 ">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_bottom,white,transparent)]"
        )}
      />
      <div className="w-full h-full flex flex-col justify-start ">
        <h1 className="text-4xl font-semibold">Projects</h1>
        <p className="mt-2 text-sm text-gray-600">
          Connections between your product and your users’ accounts on
          third-party software.
        </p>

        <div className="flex flex-col w-full h-full justify-start items-start   ">
          <div className="flex align-start w-full  justify-end items-start">
            <DialogComponent />
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-3 sm:grid-cols-2  lg:grid-cols-4 mt-10">
            {data?.map((project) => (
              <Card
                key={project._id}
                className="  aspect-video  max-h-[500px]  transition-shadow duration-300 ease-in-out hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center justify-between w-full">
                      <span>{project.projectName}</span>
                      <div className="flex gap-2">
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <button className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 cursor-pointer">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete this project?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteProject(project._id);
                                }}
                              >
                                Continue
                              </AlertDialogAction>
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
        </div>
      </div>
    </div>
  );
}
