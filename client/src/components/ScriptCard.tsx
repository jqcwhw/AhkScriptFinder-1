import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Trash2, FileCode } from "lucide-react";

export interface Script {
  id: string;
  name: string;
  description: string;
  tags: string[];
  downloadCount?: number;
  content: string;
  version: "v1" | "v2";
  isPersonal?: boolean;
}

interface ScriptCardProps {
  script: Script;
  onDownload: (script: Script) => void;
  onPreview: (script: Script) => void;
  onDelete?: (script: Script) => void;
}

export default function ScriptCard({ script, onDownload, onPreview, onDelete }: ScriptCardProps) {
  return (
    <Card className="hover-elevate flex flex-col" data-testid={`card-script-${script.id}`}>
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <FileCode className="h-5 w-5 text-primary shrink-0 mt-1" />
          <Badge variant="secondary" className="shrink-0">
            AHK {script.version}
          </Badge>
        </div>
        <CardTitle className="text-lg" data-testid={`text-scriptname-${script.id}`}>
          {script.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-[2.5rem]">
          {script.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {script.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        {script.downloadCount !== undefined && (
          <p className="text-xs text-muted-foreground mt-3">
            {script.downloadCount.toLocaleString()} downloads
          </p>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPreview(script)}
          data-testid={`button-preview-${script.id}`}
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button
          size="sm"
          onClick={() => onDownload(script)}
          data-testid={`button-download-${script.id}`}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        {script.isPersonal && onDelete && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(script)}
            data-testid={`button-delete-${script.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}