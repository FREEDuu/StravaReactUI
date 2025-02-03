import { BookOpen, CalendarDays, ChartBar, ChevronDown, Home, LineChart, PieChart, LogOut } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "./sidebar";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Charts",
    url: "#",
    icon: ChartBar,
    children: [
      {
        title: "Pie Charts",
        url: "#",
        icon: PieChart,
      },
      {
        title: "Line Charts",
        url: "#",
        icon: LineChart,
      },
    ],
  },
  {
    title: "Documentation",
    url: "#",
    icon: BookOpen,
  },
  {
    title: "Calendar",
    url: "#",
    icon: CalendarDays,
  },
  {
    title: "Logout",
    url: "/login",
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-64 fixed h-full">
      <SidebarContent className="bg-gray-100">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg">Strava</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarSeparator className="bg-orange-500 mb-2" />
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="pr-4">
                  {item.children ? (
                    <Collapsible defaultOpen={false} className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild className="rounded hover:bg-gray-200">
                          <a href={item.url} className="flex items-center gap-2">
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </a>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.title} className="pl-2 rounded hover:bg-gray-200">
                              <a href={child.url} className="flex items-center gap-2">
                                <child.icon className="w-4 h-4" />
                                <span>{child.title}</span>
                              </a>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild className="rounded hover:bg-gray-200">
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}