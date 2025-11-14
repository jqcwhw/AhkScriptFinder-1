// client/src/components/AddScriptDialog.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Script } from "./ScriptCard"; // or from "@/types/script"

interface AddScriptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (script: Script) => void;
}

export default function AddScriptDialog({
  open,
  onOpenChange,
  onSave,
}: AddScriptDialogProps) {
  const [script, setScript] = useState<Script>({
    id: "",
    name: "",
    description: "",
    tags: [],
    downloadCount: 0,
    content: "",
    version: "",
    isPersonal: false,
  });

  if (!open) return null;

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h2 className="text-lg font-bold mb-2">Add Script</h2>
      {/* Example form fields */}
      <input
        type="text"
        placeholder="Script name"
        value={script.name}
        onChange={(e) => setScript({ ...script, name: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <textarea
        placeholder="Description"
        value={script.description}
        onChange={(e) => setScript({ ...script, description: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <Button onClick={() => onSave(script)}>Save</Button>
      <Button variant="secondary" onClick={() => onOpenChange(false)}>
        Cancel
      </Button>
    </div>
  );
}
