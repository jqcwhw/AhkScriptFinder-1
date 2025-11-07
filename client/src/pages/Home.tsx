import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import SearchResultCard, { SearchResult } from "@/components/SearchResultCard";
import ScriptCard, { Script } from "@/components/ScriptCard";
import AIGenerator from "@/components/AIGenerator";
import CodeViewer from "@/components/CodeViewer";
import AddScriptDialog from "@/components/AddScriptDialog";
import ThemeToggle from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

//todo: remove mock functionality
const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    repository: 'awesome-ahk-scripts',
    owner: 'john-doe',
    fileName: 'anti-afk.ahk',
    filePath: 'scripts/gaming/anti-afk.ahk',
    stars: 1250,
    description: 'Prevents being kicked for inactivity in games by simulating mouse movements',
    codePreview: `#Persistent\nSetTimer, AntiAFK, 300000\nreturn\n\nAntiAFK:\n  MouseMove, 1, 0, 0, R\n  Sleep, 100\n  MouseMove, -1, 0, 0, R\nreturn`,
    url: 'https://github.com/john-doe/awesome-ahk-scripts',
    downloadUrl: 'https://raw.githubusercontent.com/john-doe/awesome-ahk-scripts/main/anti-afk.ahk',
    language: 'AHK v1'
  },
  {
    id: '2',
    repository: 'productivity-suite',
    owner: 'ahk-master',
    fileName: 'clipboard-manager.ahk',
    filePath: 'tools/clipboard-manager.ahk',
    stars: 892,
    description: 'Advanced clipboard manager with history and search functionality',
    codePreview: `#Requires AutoHotkey v2.0\n\nclipHistory := []\n\n^c:: {\n  A_Clipboard := ""\n  Send "^c"\n  ClipWait(1)\n  clipHistory.Push(A_Clipboard)\n}`,
    url: 'https://github.com/ahk-master/productivity-suite',
    downloadUrl: 'https://raw.githubusercontent.com/ahk-master/productivity-suite/main/clipboard-manager.ahk',
    language: 'AHK v2'
  }
];

const mockCuratedScripts: Script[] = [
  {
    id: 'c1',
    name: 'Window Snap Manager',
    description: 'Quickly move and resize windows with keyboard shortcuts. Supports multi-monitor setups and custom grid layouts.',
    tags: ['productivity', 'windows', 'shortcuts'],
    downloadCount: 5420,
    content: '; Window management script',
    version: 'v2'
  },
  {
    id: 'c2',
    name: 'Text Expander',
    description: 'Expand abbreviations into full text snippets. Perfect for email templates and common phrases.',
    tags: ['productivity', 'typing', 'automation'],
    downloadCount: 3890,
    content: '; Text expansion script',
    version: 'v2'
  },
  {
    id: 'c3',
    name: 'Gaming Macro Suite',
    description: 'Collection of gaming macros for popular games. Includes auto-clicker and key rebinding.',
    tags: ['gaming', 'macros', 'automation'],
    downloadCount: 7215,
    content: '; Gaming macro script',
    version: 'v1'
  }
];

export default function Home() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | undefined>();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewScript, setPreviewScript] = useState<Script | SearchResult | null>(null);
  
  //todo: remove mock functionality
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [personalScripts, setPersonalScripts] = useState<Script[]>([]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      //todo: remove mock functionality - replace with actual GitHub API search
      setSearchResults(mockSearchResults);
      toast({
        title: "Search completed",
        description: `Found ${mockSearchResults.length} results for "${searchQuery}"`,
      });
    }
  };

  const handleDownload = (item: SearchResult | Script) => {
    const fileName = 'fileName' in item ? item.fileName : `${item.name}.ahk`;
    toast({
      title: "Download started",
      description: `Downloading ${fileName}`,
    });
    //todo: remove mock functionality - implement actual download
    console.log('Download:', item);
  };

  const handlePreview = (item: Script | SearchResult) => {
    setPreviewScript(item);
    setPreviewDialogOpen(true);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    //todo: remove mock functionality - replace with actual OpenAI API call
    setTimeout(() => {
      const mockCode = `; Generated AHK v2 Script\n#Requires AutoHotkey v2.0\n\n; ${aiPrompt}\n\n^+e:: {\n  Send "your.email@example.com"\n}`;
      setGeneratedCode(mockCode);
      setIsGenerating(false);
      toast({
        title: "Script generated",
        description: "Your AutoHotkey script has been generated successfully",
      });
    }, 2000);
  };

  const handleAddScript = (script: Omit<Script, 'id'>) => {
    const newScript: Script = {
      ...script,
      id: `personal-${Date.now()}`,
    };
    setPersonalScripts([...personalScripts, newScript]);
    toast({
      title: "Script added",
      description: `${script.name} has been added to your library`,
    });
  };

  const handleDeleteScript = (script: Script) => {
    setPersonalScripts(personalScripts.filter(s => s.id !== script.id));
    toast({
      title: "Script deleted",
      description: `${script.name} has been removed from your library`,
    });
  };

  const getPreviewCode = () => {
    if (!previewScript) return "";
    if ('content' in previewScript) {
      return previewScript.content;
    }
    return previewScript.codePreview;
  };

  const getPreviewTitle = () => {
    if (!previewScript) return "";
    if ('fileName' in previewScript) {
      return previewScript.fileName;
    }
    return previewScript.name;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold" data-testid="text-app-title">
              AHK Script Finder
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>

        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2">
            <TabsTrigger value="search" data-testid="tab-search">
              GitHub Search
            </TabsTrigger>
            <TabsTrigger value="curated" data-testid="tab-curated">
              Curated Library
            </TabsTrigger>
            <TabsTrigger value="personal" data-testid="tab-personal">
              My Scripts
            </TabsTrigger>
            <TabsTrigger value="ai" data-testid="tab-ai">
              AI Generator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            {searchResults.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Enter a search query to find AutoHotkey scripts on GitHub
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {searchResults.map((result) => (
                  <SearchResultCard
                    key={result.id}
                    result={result}
                    onDownload={handleDownload}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="curated" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockCuratedScripts.map((script) => (
                <ScriptCard
                  key={script.id}
                  script={script}
                  onDownload={handleDownload}
                  onPreview={handlePreview}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="personal" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button onClick={() => setAddDialogOpen(true)} data-testid="button-add-script">
                <Plus className="h-4 w-4 mr-2" />
                Add Script
              </Button>
            </div>
            {personalScripts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No personal scripts yet. Add your first script!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {personalScripts.map((script) => (
                  <ScriptCard
                    key={script.id}
                    script={script}
                    onDownload={handleDownload}
                    onPreview={handlePreview}
                    onDelete={handleDeleteScript}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <AIGenerator
              prompt={aiPrompt}
              onPromptChange={setAiPrompt}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
            {generatedCode && (
              <CodeViewer code={generatedCode} title="Generated Script" />
            )}
          </TabsContent>
        </Tabs>
      </main>

      <AddScriptDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={handleAddScript}
      />

      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{getPreviewTitle()}</DialogTitle>
          </DialogHeader>
          <div className="bg-muted rounded-md p-4 max-h-96 overflow-auto">
            <pre className="text-sm font-mono text-foreground">
              <code>{getPreviewCode()}</code>
            </pre>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex gap-6 flex-wrap">
              <a href="#" className="hover:text-foreground">Documentation</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                GitHub Repo
              </a>
              <a href="#" className="hover:text-foreground">Report Issue</a>
            </div>
            <p>v1.0.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}