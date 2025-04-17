import * as React from "react";
import { cn } from "@/shared/utils/utils.ts";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/shared/components/ui/navigation-menu";

interface NavigationItem {
  title: string;
  href: string;
  description?: string;
}

interface Section {
  title: string;
  items: NavigationItem[];
}

interface CustomNavigationMenuProps {
  className?: string;
  sections: Section[];
  avatar?: React.ReactNode;
  orientation?: "vertical" | "horizontal";
}

export default function CustomNavigationMenu({
  className,
  sections,
  avatar,
  orientation,
}: CustomNavigationMenuProps) {
  return (
    <NavigationMenu className={cn("flex items-center", className)} orientation={orientation}>
      <NavigationMenuList className="flex-grow">
        {sections.map((section, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                {section.items.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      {avatar}
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
