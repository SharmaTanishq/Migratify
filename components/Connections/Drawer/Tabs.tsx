"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface DrawerTabsProps {
  children?: React.ReactNode
}

export function DrawerTabs({ children }: DrawerTabsProps) {
  return (
    <Tabs defaultValue="general" className="w-full   ">
      <TabsList className="grid  grid-cols-2 bg-none rounded-none">
        <div >
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="general">
        <div className="py-4">
          <div className="space-y-6">
            {/* Node Status Section */}
            <Card className="bg-gray-50/50">
              <CardContent className="p-4">
                <h4 className="mb-4 text-sm font-bold">Node Status</h4>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    <span className="text-sm text-muted-foreground">Connected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Last synced: 2 mins ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Node Information */}
            <Card className="bg-gray-50/50">
              <CardContent className="p-4">
                <h4 className="mb-4 text-sm font-bold">Node Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <span className="text-sm font-medium">Integration Node</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="text-sm font-medium">March 12, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Modified</span>
                    <span className="text-sm font-medium">March 14, 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Preview */}
            <Card className="bg-gray-50/50">
              <CardContent className="p-4">
                <h4 className="mb-4 text-sm font-bold">Data Preview</h4>
                <div className="max-h-[200px] overflow-y-auto rounded border bg-muted/50 p-3">
                  <pre className="text-xs">
                    <code>
                      {JSON.stringify({
                        sample: "data",
                        format: "preview",
                        fields: ["id", "name", "category", "price"],
                        status: "ready"
                      }, null, 2)}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-50/50">
              <CardContent className="p-4">
                <h4 className="mb-4 text-sm font-bold">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button className="rounded-md border bg-background px-3 py-2 text-sm hover:bg-muted">
                    Refresh Connection
                  </button>
                  <button className="rounded-md border bg-background px-3 py-2 text-sm hover:bg-muted">
                    View Logs
                  </button>
                  <button className="rounded-md border bg-background px-3 py-2 text-sm hover:bg-muted">
                    Test Connection
                  </button>
                  <button className="rounded-md border bg-background px-3 py-2 text-sm hover:bg-muted">
                    Export Data
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="space-y-4 py-4">
          {/* Sync Settings */}
          <Card className="bg-gray-50/50">
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
                    <Input
                      id="cron"
                      type="text" 
                      placeholder="*/30 * * * *"
                    />
                    <Button variant="outline" size="default">
                      Validate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter a valid cron expression. Example: */30 * * * * (every 30 minutes)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="retry-failed" className="rounded border-gray-300" />
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
                  <label className="text-sm font-medium">Filter Condition</label>
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
                  <label className="text-sm font-medium">Timeout (seconds)</label>
                  <input 
                    type="number" 
                    placeholder="300"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="debug-mode" className="rounded border-gray-300" />
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
      </TabsContent>
    </Tabs>
  )
}
