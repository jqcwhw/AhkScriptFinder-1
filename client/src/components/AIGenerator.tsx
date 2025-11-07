import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AIGeneratorProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  generatedCode?: string;
}

export default function AIGenerator({ 
  prompt, 
  onPromptChange, 
  onGenerate, 
  isGenerating,
  generatedCode 
}: AIGeneratorProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI Script Generator</CardTitle>
          </div>
          <CardDescription>
            Describe what you want your AutoHotkey script to do, and AI will generate it for you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Example: Create a script that types my email address when I press Ctrl+Shift+E"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            className="min-h-32 resize-none"
            data-testid="input-ai-prompt"
          />
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              onClick={onGenerate}
              disabled={isGenerating || !prompt.trim()}
              size="lg"
              data-testid="button-generate"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Script
                </>
              )}
            </Button>
            <Badge variant="secondary" className="text-xs">
              Powered by AI
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}