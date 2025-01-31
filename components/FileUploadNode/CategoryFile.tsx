import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Card } from "../ui/card";
import { Plus, CloudUpload, FileText, X, Trash2 } from "lucide-react";
import { Label } from "../ui/label";

const DEFAULT_HANDLE_STYLE = {
  width: 8,
  height: 12,
  right: -8,
  borderRadius: "5px 0px 0px 5px",
  background: "var(--handle-color)",
};

export function CategoryFileNode({ data }: { data: any }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    const input = document.getElementById("csvUpload") as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <>
      <Card className="w-[300px] p-2 space-y-2 bg-green-50/30 dark:bg-gray-900/50 border border-gray-200 relative">
        <Handle
          type="target"
          style={{
            ...DEFAULT_HANDLE_STYLE,
            left: -8,
            top: "50%",
            transform: "translateY(-50%)",
            background: "#9ca3af",
          }}
          position={Position.Left}
          id="categoryUploadNode"
          isConnectable={true}
        />

        {/* Header Section */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <CloudUpload className="w-8 h-8 text-coral-500" />
            <div>
              <h3 className="font-medium text-black">Category</h3>
              <p className="text-lg font-semibold">Add Categories</p>
            </div>
          </div>
        </div>

        {/* Upload Section - Fixed height container */}
        <div className="h-[180px] relative">
          {!selectedFile ? (
            <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-200 rounded-lg bg-white/50 hover:bg-white/80 transition-colors cursor-pointer">
              <input
                type="file"
                accept=".csv"
                className="hidden"
                id="csvUpload"
                onChange={handleFileChange}
              />
              <label
                htmlFor="csvUpload"
                className="flex flex-col items-center space-y-2 cursor-pointer"
              >
                <div className="p-3 rounded-full bg-green-100">
                  <Plus className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    Click to upload file
                  </p>
                  <p className="text-xs text-gray-400">CSV files only</p>
                </div>
              </label>
            </div>
          ) : (
            <div className="h-full relative">
              {/* Files Grid */}
              <div className="grid grid-cols-3 gap-3 p-4 h-full bg-white/50 rounded-lg border-2 border-gray-200">
                {/* File Item */}
                <div className="flex flex-col items-center justify-start group relative">
                  <div className="p-3 rounded-lg bg-green-100 mb-2">
                    <FileText className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-600 text-center truncate w-full px-2">
                    {selectedFile.name}
                  </p>
                  <button
                    onClick={handleRemoveFile}
                    className="absolute -top-1 -right-1 p-1 bg-red-400 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3 text-white" />
                  </button>
                </div>

                {/* Add More Button - Inside Grid */}
                <Label
                  htmlFor="csvUpload"
                  className="flex flex-col items-center justify-start cursor-pointer group"
                >
                  <div className="p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors mb-2">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-400">Add More</p>
                </Label>
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
