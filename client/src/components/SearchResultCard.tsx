import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Download, Star, FileCode } from "lucide-react";

export interface SearchResult {
  id: string;
  repository: string;
  owner: string;
  fileName: string;
  filePath: string;
  stars: number;
  description: string;
  codePreview: string;
  url: string;
  downloadUrl: string;
  language: "AHK v1" | "AHK v2";
}

interface SearchResultCardProps {
  result: SearchResult;
  onDownload: (result: SearchResult) => void;
}

export default function SearchResultCard({ result, onDownload }: SearchResultCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`card-result-${result.id}`}>
      <CardHeader className="space-y-0 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg flex items-center gap-2 flex-wrap">
              <FileCode className="h-5 w-5 text-primary shrink-0" />
              <span className="truncate">{result.fileName}</span>
            </CardTitle>
            <CardDescription className="text-sm mt-1">
              <span className="font-medium">{result.owner}</span>
              <span className="text-muted-foreground"> / </span>
              <span>{result.repository}</span>
            </CardDescription>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {result.language}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground font-mono truncate" data-testid={`text-filepath-${result.id}`}>
          {result.filePath}
        </p>
        {result.description && (
          <p className="text-sm line-clamp-2">{result.description}</p>
        )}
        <div className="bg-muted rounded-md p-3 overflow-x-auto">
          <pre className="text-xs font-mono text-foreground">
            <code>{result.codePreview}</code>
          </pre>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-current" />
          <span data-testid={`text-stars-${result.id}`}>{result.stars.toLocaleString()}</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          asChild
          data-testid={`button-view-${result.id}`}
        >
          <a href={result.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            View on GitHub
          </a>
        </Button>
        <Button
          size="sm"
          onClick={() => onDownload(result)}
          data-testid={`button-download-${result.id}`}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}