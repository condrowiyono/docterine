import { useState, type ReactNode } from "react";
import {
  Bold,
  Info,
  Italic,
  LayoutGrid,
  Mail,
  MoreHorizontal,
  Search,
  Terminal,
  Underline,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

const intro = (
  <>
    Primitives from the{" "}
    <a
      href="https://ui.shadcn.com/docs/components"
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary underline-offset-4 hover:underline"
    >
      shadcn/ui
    </a>{" "}
    registry. This page demonstrates components already installed in this app.
  </>
);

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10 scroll-mt-6">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mb-4 max-w-2xl text-sm text-muted-foreground">{description}</p>
      <div className="rounded-xl border border-border bg-card p-6">{children}</div>
    </section>
  );
}

export function ComponentsView() {
  const [sliderValue, setSliderValue] = useState([42]);
  const [density, setDensity] = useState("default");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [framework, setFramework] = useState("react");
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card">
      <header className="shrink-0 border-b border-border px-6 py-5">
        <div className="flex items-start gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
            <LayoutGrid className="size-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Components</h1>
            <p className="mt-1 text-sm text-muted-foreground">{intro}</p>
          </div>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-auto px-6 py-6">
        <Section
          title="Button"
          description="Variants and sizes for actions and navigation."
        >
          <div className="flex flex-wrap items-center gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-wrap items-center gap-2">
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Icon">
              <Mail />
            </Button>
          </div>
        </Section>

        <Section title="Card" description="Structured container with header, body, and footer slots.">
          <Card className="max-w-md border-0 shadow-none ring-1 ring-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle>Project status</CardTitle>
              <CardDescription>Shipped components and registry parity.</CardDescription>
              <CardAction>
                <Button size="xs" variant="outline">
                  Details
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">
                Cards group related content and actions without enforcing a specific visual style beyond spacing and
                hierarchy.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Primary action</Button>
              <Button size="sm" variant="ghost">
                Dismiss
              </Button>
            </CardFooter>
          </Card>
        </Section>

        <Section title="Alert" description="Inline status messages with optional icon affordance.">
          <div className="flex max-w-2xl flex-col gap-3">
            <Alert>
              <Info className="size-4" />
              <AlertTitle>New components</AlertTitle>
              <AlertDescription>
                Card, Select, and Tooltip were added from the shadcn registry. Tooltips require <code>TooltipProvider</code>{" "}
                at the root (already wired in <code>__root.tsx</code>).
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <Terminal className="size-4" />
              <AlertTitle>Destructive variant</AlertTitle>
              <AlertDescription>Use for errors or actions that blocked a process.</AlertDescription>
            </Alert>
          </div>
        </Section>

        <Section title="Sonner" description="Stackable toast notifications via the Sonner package and shadcn Toaster.">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast.success("Saved to disk")}>
              Success
            </Button>
            <Button variant="outline" onClick={() => toast.info("Tip: use ⌘K for the command palette")}>
              Info
            </Button>
            <Button variant="outline" onClick={() => toast.warning("Offline — changes will sync later")}>
              Warning
            </Button>
            <Button variant="outline" onClick={() => toast.error("Could not reach the server")}>
              Error
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
                  loading: "Working…",
                  success: "Finished",
                  error: "Something went wrong",
                })
              }
            >
              Promise
            </Button>
          </div>
        </Section>

        <Section title="Badge" description="Status and count affordances.">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="link">Link</Badge>
          </div>
        </Section>

        <Section title="Input & Textarea" description="Single-line and multi-line text fields.">
          <div className="flex max-w-md flex-col gap-4">
            <Input type="email" placeholder="Email" />
            <Textarea placeholder="Longer message…" className="min-h-24" />
          </div>
        </Section>

        <Section
          title="Input Group"
          description="Composite field with leading icon (and optional addons)."
        >
          <div className="max-w-md">
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search…" />
            </InputGroup>
          </div>
        </Section>

        <Section title="Select" description="Single choice from an anchored list.">
          <div className="max-w-md space-y-3">
            <Select value={framework} onValueChange={setFramework}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="svelte">Svelte</SelectItem>
                <SelectItem value="solid">Solid</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Selected: {framework}</p>
          </div>
        </Section>

        <Section title="Slider" description="Numeric value along a track.">
          <div className="max-w-xs space-y-3">
            <Slider value={sliderValue} onValueChange={setSliderValue} />
            <p className="text-xs text-muted-foreground">Value: {sliderValue[0]}</p>
          </div>
        </Section>

        <Section title="Progress" description="Determinate completion indicator.">
          <div className="max-w-xs space-y-2">
            <Progress value={sliderValue[0]} />
            <p className="text-xs text-muted-foreground">
              Uses the Slider value above as the percent complete ({sliderValue[0]}%).
            </p>
          </div>
        </Section>

        <Section title="Checkbox & Switch" description="Boolean inputs with accessible labels.">
          <div className="flex max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id="demo-newsletter" checked={newsletter} onCheckedChange={(v) => setNewsletter(v === true)} />
              <Label htmlFor="demo-newsletter" className="font-normal">
                Product updates (monthly)
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="demo-notifications" checked={notifications} onCheckedChange={setNotifications} />
              <Label htmlFor="demo-notifications" className="font-normal">
                Desktop notifications
              </Label>
            </div>
          </div>
        </Section>

        <Section title="Toggle" description="Binary pressed state, often for formatting tools.">
          <div className="flex flex-wrap gap-2">
            <Toggle aria-label="Bold" size="sm">
              <Bold />
            </Toggle>
            <Toggle aria-label="Italic" size="sm">
              <Italic />
            </Toggle>
            <Toggle aria-label="Underline" size="sm">
              <Underline />
            </Toggle>
          </div>
        </Section>

        <Section title="Toggle Group" description="Single selection among related options.">
          <ToggleGroup
            type="single"
            value={density}
            onValueChange={(v) => v && setDensity(v)}
            variant="outline"
            size="sm"
          >
            <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
            <ToggleGroupItem value="default">Default</ToggleGroupItem>
            <ToggleGroupItem value="comfortable">Comfortable</ToggleGroupItem>
          </ToggleGroup>
          <p className="mt-3 text-xs text-muted-foreground">Selected: {density}</p>
        </Section>

        <Section title="Tabs" description="Switch between panels without leaving the page.">
          <Tabs defaultValue="account" className="w-full max-w-md">
            <TabsList className="w-full">
              <TabsTrigger value="account" className="flex-1">
                Account
              </TabsTrigger>
              <TabsTrigger value="password" className="flex-1">
                Password
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="mt-4 text-sm text-muted-foreground">
              Profile and billing preferences.
            </TabsContent>
            <TabsContent value="password" className="mt-4 text-sm text-muted-foreground">
              Update credentials and 2FA.
            </TabsContent>
          </Tabs>
        </Section>

        <Section title="Separator" description="Visual divide between blocks.">
          <div className="space-y-4">
            <p className="text-sm">Content above</p>
            <Separator />
            <p className="text-sm">Content below</p>
          </div>
        </Section>

        <Section title="Dialog" description="Modal dialog for focused tasks or confirmations.">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Example dialog</DialogTitle>
                <DialogDescription>
                  Dialogs trap focus and announce correctly to assistive tech.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <Button type="button" variant="secondary" onClick={() => setDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section title="Popover" description="Floating panel anchored to a trigger; lighter than a dialog.">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent className="space-y-2">
              <PopoverHeader>
                <PopoverTitle>Quick tip</PopoverTitle>
              </PopoverHeader>
              <p className="text-sm text-muted-foreground">
                Popovers work well for inline editors and compact explanations without modal focus traps.
              </p>
            </PopoverContent>
          </Popover>
        </Section>

        <Section title="Dropdown Menu" description="Commands and navigation in a layered overlay.">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel>Document</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>New file</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">Move to trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section title="Tooltip" description="Short hints on hover or keyboard focus (requires TooltipProvider at app root).">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover or focus me</Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={6}>
              <p>Tooltips explain controls without cluttering the layout.</p>
            </TooltipContent>
          </Tooltip>
        </Section>

        <Section
          title="Resizable"
          description="Drag handles to resize adjacent panels (used in Engines and Settings)."
        >
          <ResizablePanelGroup orientation="horizontal" className="h-36 max-w-lg rounded-lg border border-border">
            <ResizablePanel defaultSize={55} minSize={20}>
              <div className="flex h-full items-center justify-center bg-muted/40 text-sm text-muted-foreground">
                Panel A
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={45} minSize={20}>
              <div className="flex h-full items-center justify-center bg-muted/25 text-sm text-muted-foreground">
                Panel B
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Section>
      </div>
    </div>
  );
}
