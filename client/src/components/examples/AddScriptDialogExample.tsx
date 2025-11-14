// client/src/components/examples/AddScriptDialogExample.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddScriptDialog from "../AddScriptDialog";

export default function AddScriptDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <AddScriptDialog
        open={open}
        onOpenChange={setOpen}
        onSave={(script) => console.log("Save script:", script)}
      />
    </div>
  );
}
