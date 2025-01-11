import { AreaChartComponent } from "@/components/dasboards/home/areaChart"
import { BarChartComponent } from "@/components/dasboards/home/barChart"
import { PieChartComponent } from "@/components/dasboards/home/PieChart"
import { RadialChartComponent } from "@/components/dasboards/home/radialChart"
import { Metadata } from "next"

import { redirect } from "next/navigation"


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personal dashboard"
}

export default async function Page() {
  

  

  return (
    <div className="flex flex-col p-5">
      <h1 className="text-3xl font-bold text-black">Welcome back, Tanishq</h1>
      <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-primary/20" >
                <PieChartComponent />
            </div>
            <div className="aspect-video rounded-xl bg-primary/20" >
                <RadialChartComponent />
            </div>
            <div className="aspect-video rounded-xl bg-primary/20" >
                <PieChartComponent/>
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-primary/20 md:min-h-min">
             <AreaChartComponent />        
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-primary/20 md:min-h-min">
             <BarChartComponent />        
            </div>
        </div>
        
    </div>
  )
}
