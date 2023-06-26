import { DialogDemo } from "./DialogDemo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-4">
      <h1 className="text-2xl font-medium">Acme Corp</h1>
      <div className="border-2 p-4 rounded space-y-4">
        <p className="text-slate-300 text-sm font-medium">Account Deletion</p>
        <DialogDemo />
      </div>
    </main>
  );
}
