import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import PlatformSelector from "./platformSelector"
import { MultiSelect, } from "./multiSelect"
import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api";
import { PlusIcon } from "lucide-react"

const integrationList = [
    { value: "product", label: "Product Integration" },
    { value: "category", label: "Category Integration",  },
    { value: "customer", label: "Customers Integration", },
    
  ];


  export default function DialogComponent(){
    
    const [projectName, setProjectName] = useState<string>("");
    const [projectDescription, setProjectDescription] = useState<string>("");
    const [ecommercePlatform, setEcommercePlatform] = useState("");
    const [integrations, setIntegrations] =  useState<string[]>(["product", "category"]);
    const [open, setOpen] = useState(false);
    const createProject = useMutation(api.projects.createProject);
    
    const handleSubmit = async()=>{
       createProject({
         projectName,
         projectDescription,
         ecommercePlatform,
         integration: integrations.map(integration => ({ label: integration }))
       }).then(()=>{
        setOpen(false);
       });
       
       
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button  variant={"primary"}> <PlusIcon className="w-4 h-4 " /> New</Button>
        </DialogTrigger>
        <DialogContent >
            <DialogHeader>
            <DialogTitle>Create a new Project</DialogTitle>
            <DialogDescription>
                Create a new project and pick & choose the integrations for your system.
            </DialogDescription>
                
            </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="project-name" className=" text-black">
                            Project Name
                        </Label>
                        <Input
                        id="project-name"
                        defaultValue=""
                        onChange={(e) => setProjectName(e.target.value)}
                        />
                        <Label htmlFor="project-description" className=" text-black">
                            Project Description
                        </Label>
                        <Input
                        id="project-description"
                        defaultValue=""
                        onChange={(e) => setProjectDescription(e.target.value)}
                        />
                        <Label htmlFor="project-name" className=" text-black">
                             E-Commerce Platform
                        </Label>
                        <PlatformSelector onChange={setEcommercePlatform} />
                        <Label htmlFor="project-integrations" className=" text-black">
                            Integrations
                        </Label>
                        
                        <MultiSelect
                            options={integrationList}
                            onValueChange={setIntegrations}
                            defaultValue={integrations}
                            placeholder="Select frameworks"
                            variant="inverted"
                            animation={0}
                            maxCount={3}
                        />             
                        
                    </div>
                </div>
            <DialogFooter>
                <Button  type="submit" onClick={handleSubmit}>Confirm</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
  }