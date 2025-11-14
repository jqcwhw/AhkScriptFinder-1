// client/src/components/ScriptCard.tsx
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
  return (
    <div className="p-4 border rounded">
      <h3>{script.name}</h3>
      <p>{script.description}</p>
      <button onClick={() => onDownload(script)}>Download</button>
      <button onClick={() => onPreview(script)}>Preview</button>
    </div>
  );
}
