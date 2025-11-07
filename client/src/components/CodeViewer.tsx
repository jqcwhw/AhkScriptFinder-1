import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodeViewerProps {
  code: string;
  title?: string;
}

export default function CodeViewer({ code, title = "Code" }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          data-testid="button-copy-code"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-md p-4 max-h-96 overflow-auto">
          <pre className="text-sm font-mono text-foreground">
            <code data-testid="text-code-content">{code}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}