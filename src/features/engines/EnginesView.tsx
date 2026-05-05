import { Command as CommandIcon, Database, MoreVertical, Plus, Search } from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export function EnginesView() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="flex flex-1 min-w-0 gap-1">
      <ResizablePanel defaultSize={280} minSize={240} maxSize={360} className="flex flex-col overflow-hidden rounded-xl border bg-card">
        <div className="flex min-h-16 items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-2">
            <h1 className="m-0 text-2xl font-bold leading-none text-foreground">Engines</h1>
            <Badge variant="secondary" className="h-5 min-w-5 justify-center rounded-full text-muted-foreground">1</Badge>
          </div>
          <div className="flex gap-2">
            <Button size="icon" className="bg-primary"><Plus /></Button>
            <Button variant="outline" size="icon"><MoreVertical /></Button>
          </div>
        </div>
        <div className="px-3.5 pb-2.5">
          <InputGroup>
            <InputGroupAddon><Search /></InputGroupAddon>
            <InputGroupInput placeholder="Search engines..." />
          </InputGroup>
        </div>
        <Tabs defaultValue="all" className="px-3 pb-2">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All <Badge variant="secondary">1</Badge></TabsTrigger>
            <TabsTrigger value="local" className="flex-1">Local <Badge variant="secondary">1</Badge></TabsTrigger>
            <TabsTrigger value="remote" className="flex-1">Remote <Badge variant="secondary">0</Badge></TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="flex h-14 items-center gap-3 px-1 text-sm text-foreground">
              <span className="status-dot" />
              <strong className="font-medium">OrbStack</strong>
              <CommandIcon className="ml-auto size-4 text-muted-foreground" />
            </div>
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="relative flex min-w-0 items-center justify-center rounded-xl border">
        <div className="flex w-96 flex-col items-center text-center text-muted-foreground">
          <div className="grid size-24 place-items-center rounded-full bg-card text-primary">
            <Database className="size-10 stroke-2" />
          </div>
          <h2 className="mt-6 mb-4 text-3xl font-bold tracking-tight text-foreground">Container Engines</h2>
          <p className="m-0 text-base font-medium leading-relaxed">Manage local and remote container engines. Add remote engines via SSH for seamless container management.</p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
