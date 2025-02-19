import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
} from "@/components/ui/sheet";
import GenericDrawerLayout from "../../Layouts/Drawer";

function MailDrawer({ isOpen, id }: { isOpen: boolean; id: string }) {
  return (
    <GenericDrawerLayout isOpen={isOpen}>
        <SheetHeader>
          <SheetTitle>
            <div>
              <div className="flex items-center justify-start gap-2">
                {"content"}
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>              
    </GenericDrawerLayout>
  );
}

export default MailDrawer;
