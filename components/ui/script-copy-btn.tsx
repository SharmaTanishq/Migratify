"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { HTMLAttributes, useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface ScriptCopyBtnProps extends HTMLAttributes<HTMLDivElement> {
  showMultiplePackageOptions?: boolean;
  codeLanguage: string;
  lightTheme?: string;
  darkTheme?: string;
  commandMap: Record<string, string>;
  className?: string;
}

export function ScriptCopyBtn({
  showMultiplePackageOptions = true,
  codeLanguage,
  lightTheme,
  darkTheme,
  commandMap,
  className,
}: ScriptCopyBtnProps) {
  const packageManagers = Object.keys(commandMap);
  const [packageManager, setPackageManager] = useState(packageManagers[0]);
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState("");
  const { theme } = useTheme();
  const command = commandMap[packageManager];

  useEffect(() => {
    async function loadHighlightedCode() {
      try {
        const highlighted = await codeToHtml(command, {
          lang: codeLanguage,
          themes: {
            light: lightTheme,
            dark: darkTheme,
          },
          defaultColor: "#000000",
        });
        setHighlightedCode(highlighted);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlightedCode(`<pre>${command}</pre>`);
      }
    }

    loadHighlightedCode();
  }, [command, theme, codeLanguage, lightTheme, darkTheme]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "mx-auto flex max-w-md items-center justify-center",
        className,
      )}
    >
      <div className="w-full space-y-1 mt-0">
        <div className="mb-2 flex items-center justify-between">
          {showMultiplePackageOptions && (
            <div className="relative">
              <div className="inline-flex overflow-hidden rounded-md border border-border text-xs">
                {packageManagers.map((pm, index) => (
                  <div key={pm} className="flex items-center">
                    {index > 0 && (
                      <div className="h-4 w-px bg-border" aria-hidden="true" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`relative rounded-none bg-background px-2 py-1 hover:bg-background ${
                        packageManager === pm
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => setPackageManager(pm)}
                    >
                      {pm}
                      {packageManager === pm && (
                        <motion.div
                          className="absolute inset-x-0 bottom-[1px] mx-auto h-0.5 w-[90%] bg-primary"
                          layoutId="activeTab"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <span className="text-[10px] text-muted-foreground p-0">Webhook URL : </span>
        <div className="relative flex items-center bg-gray-50 border border-border rounded-md p-1">
          
          <div className="min-w-[150px] grow font-mono text-[9px]">
            {highlightedCode ? (
              <div
                className={`overflow-hidden [&>pre]:rounded-md text-gray-600   [&>pre]:font-mono ${
                  theme === "dark" ? "dark" : "light"
                }`}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            ) : (
              <pre className="rounded-md border border-border bg-white p-2 px-4  font-mono dark:bg-black">
                {command}
              </pre>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="relative ml-2 rounded-md w-6 h-6"
            onClick={copyToClipboard}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
          >
            <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
            <Copy
              className={`h-2 w-2 transition-all duration-300 ${
                copied ? "scale-[0]" : "scale-[0.6]"
              }`}
            />
            <Check
              className={`absolute inset-0 m-auto h-2 w-2 transition-all duration-300 ${
                copied ? "scale-[0.6]" : "scale-[0]"
              }`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
