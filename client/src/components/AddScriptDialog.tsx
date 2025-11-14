import AddScriptDialog from '../AddScriptDialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
const AddScriptDialogExample = () => {
  const mockScript: Script = { /* … */ };
  return <AddScriptDialog script={mockScript} />;
};

const AddScriptDialogExample = () => {
  const mockScript: Script = { /* … */ };
  return <AddScriptDialog script={mockScript} />;
};

export interface Script {
  id: string;
  name: string;
  description: string;
  tags: string[];
  downloadCount: number;
  content: string;
  version: string;
  isPersonal: boolean;
}

export default function ScriptCard({
  script,
  onDownload,
  onPreview,
}: {
  script: Script;
  onDownload: (script: Script) => void;
  onPreview: (script: Script) => void;
}) {
  // ...
}

export default function AddScriptDialogExample() {
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <AddScriptDialog 
        open={open}
        onOpenChange={setOpen}
        onSave={(script) => console.log('Save script:', script)}
      />
    </div>
  );
}
