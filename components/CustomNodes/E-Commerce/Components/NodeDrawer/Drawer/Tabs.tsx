"use client";

import * as React from "react";
import { Tabs } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useStore from "@/components/Store/store";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { Id } from "@/convex/_generated/dataModel";

interface DrawerTabsProps {
  children?: React.ReactNode;
  nodeId?: Id<"nodes">;
  nodeType?: string;
  nodeName?: string;
}

const tabs = [
  {
    title: "General",
    value: "general",
    content: (
      <div className="w-full overflow-hidden  h-full rounded-2xl p-2 text-xl md:text-4xl font-bold text-white bg-white ">
        <div className="space-y-4 flex flex-col  h-full">
          {/* Authentication Settings */}
          <Card className="shadow-none border-none">
            <CardContent className="p-4">
              <h4 className="mb-4 text-sm font-bold">Authentication</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    X-VTEX-API-AppKey
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your app key"
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Unique identifier of the application key
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    X-VTEX-API-AppToken
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter your app token"
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Secret token of the application key
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Base URL</label>
                  <Input
                    type="url"
                    placeholder="https://apiexamples.vtexcommercestable.com"
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="ghost" className="text-black" size="default">
              Test Connection
            </Button>
            <Button variant="primary" size="default">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Variables",
    value: "variables",
    content: (
      <div className="w-full overflow-hidden  h-full rounded-2xl p-2 text-xl md:text-4xl font-bold text-white bg-white ">
        <div className="space-y-4 py-6 mt-4 h-full">
          {/* Authentication Settings */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <h4 className="mb-4 text-sm font-bold">Authentication</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Authentication Method
                  </label>
                  <select className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                    <option value="header">1. Header + 1</option>
                    <option value="oauth">OAuth 2.0</option>
                    <option value="basic">Basic Auth</option>
                    <option value="apikey">API Key</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    X-VTEX-API-AppKey
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your app key"
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Unique identifier of the application key
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    X-VTEX-API-AppToken
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter your app token"
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Secret token of the application key
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Base URL</label>
                  <Input
                    type="url"
                    placeholder="https://apiexamples.vtexcommercestable.com"
                    className="w-full"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" size="default">
                    Test Connection
                  </Button>
                  <Button variant="default" size="default">
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    ),
  },
  {
    title: "Settings",
    value: "settings",
    content: (
      <div className="w-full overflow-hidden h-full rounded-2xl p-2 text-xl md:text-4xl font-bold text-white bg-white ">
        <div className="space-y-4  mt-4 h-full">
          {/* Sync Settings */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <h4 className="mb-4 text-sm font-bold">Sync Settings</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sync Schedule</label>
                  <select className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                    <option value="manual">Manual Only</option>
                    <option value="hourly">Every Hour</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="custom">Custom Schedule</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cron">Custom Cron Expression</Label>
                  <div className="flex gap-2">
                    <Input id="cron" type="text" placeholder="*/30 * * * *" />
                    <Button variant="outline" size="default">
                      Validate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter a valid cron expression. Example: */30 * * * * (every
                    30 minutes)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="retry-failed"
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="retry-failed" className="text-sm">
                    Automatically retry failed syncs
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Filtering */}
          <Card className="bg-gray-50/50">
            <CardContent className="p-4">
              <h4 className="mb-4 text-sm font-bold">Data Filtering</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Include Fields</label>
                  <input
                    type="text"
                    placeholder="id, name, category, price"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated list of fields to include in sync
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Filter Condition
                  </label>
                  <textarea
                    placeholder="Example: price > 100 AND category = 'electronics'"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm min-h-[80px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card className="bg-gray-50/50">
            <CardContent className="p-4">
              <h4 className="mb-4 text-sm font-bold">Advanced Settings</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Batch Size</label>
                  <input
                    type="number"
                    placeholder="1000"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of records to process in each batch
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    placeholder="300"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="debug-mode"
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="debug-mode" className="text-sm">
                    Enable debug mode
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Settings */}
          <div className="flex justify-end space-x-2 pt-4">
            <button className="rounded-md border bg-background px-4 py-2 text-sm hover:bg-muted">
              Cancel
            </button>
            <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    ),
  },
];

export function DrawerTabs({ nodeId }: DrawerTabsProps) {
  const saveNodeConfigurations = useMutation(
    api.flows.node.data.saveNodeConfigurations
  );
  console.log(nodeId, "here is node Id");
  const getNodeConfigurations = useQuery(
    api.flows.node.data.getNodeConfigurations,
    {
      nodeId: nodeId!,
    }
  );

  React.useEffect(() => {
    form.setValue("appKey", getNodeConfigurations?.configurations?.appKey);
    form.setValue("apiKey", getNodeConfigurations?.configurations?.apiKey);
    form.setValue("baseUrl", getNodeConfigurations?.configurations?.baseUrl);
  }, [getNodeConfigurations]);
  const form = useForm();

  const onSubmit = (event: any) => {
    saveNodeConfigurations({
      nodeId: nodeId!,
      configurations: {
        appKey: form.getValues("appKey"),
        apiKey: form.getValues("apiKey"),
        baseUrl: form.getValues("baseUrl"),
      },
    }).then(() => {
      toast.success("Node configurations saved successfully");
    });
  };

  return (
    <div className=" md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start ">
      <div className="w-full overflow-hidden  h-full rounded-2xl p-2 text-xl md:text-4xl font-bold text-white bg-white ">
        <div className="space-y-4 flex flex-col  h-full">
          {/* Authentication Settings */}
          <Card className="shadow-none border-none">
            <CardHeader className="p-2">
              <CardTitle className="text-lg font-bold">
                Authentication Settings
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 font-normal">
                Enter your VTEX API credentials to authenticate with the VTEX
                API.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 mt-5"
                >
                  <FormField
                    control={form.control}
                    name="appKey"
                    defaultValue={""}
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormLabel>X-VTEX-API-AppKey</FormLabel>
                        <FormDescription className="text-[13px] p-0 m-0 text-gray-500 font-normal">
                          Unique identifier of the application key
                        </FormDescription>
                        <FormControl>
                          <Input
                            placeholder="vtexappkey-example-YSWQFZ"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="apiKey"
                    defaultValue={""}
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormLabel>X-VTEX-API-AppToken</FormLabel>
                        <FormDescription className="text-[13px] p-0 m-0 text-gray-500 font-normal">
                          Secret token of the application key
                        </FormDescription>
                        <FormControl>
                          <Input
                            placeholder="Enter your app token"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="baseUrl"
                    defaultValue={""}
                    render={({ field }) => (
                      <FormItem className="space-y-0 mb-4">
                        <FormLabel>Base URL</FormLabel>
                        <FormDescription className="text-[13px] p-0 m-0 text-gray-500 font-normal">
                          Base URL of the VTEX API
                        </FormDescription>
                        <FormControl>
                          <Input
                            placeholder="https://apiexamples.vtexcommercestable.com.br"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="primary" type="submit">
                      Save
                    </Button>
                    <Button variant="ghost" type="submit">
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
