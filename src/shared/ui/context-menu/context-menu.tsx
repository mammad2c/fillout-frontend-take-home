import {
  ContextMenu as RadixContextMenu,
  Trigger,
  Item,
  Portal,
  Content,
} from "@radix-ui/react-context-menu";
import clsx from "clsx";
import React from "react";

export interface ContextMenuItem {
  /** Visible text (or any ReactNode) */
  label: React.ReactNode;
  /** Click handler for this item */
  onClick: () => void;
  /** Show item in red to hint destructive action */
  danger?: boolean;
  /** Disable the item */
  disabled?: boolean;
  /** Hint text (e.g. keyboard shortcut) rendered on the right */
  shortcut?: React.ReactNode;
}

export interface ContextMenuProps {
  /** Element that triggers the context menu */
  children?: React.ReactNode;
  /** Array of menu items */
  items: ContextMenuItem[];
  /** Extra Tailwind classes for the menu container */
  className?: string;
}

export function ContextMenu({
  children,
  items,
  className = "",
}: ContextMenuProps) {
  return (
    <RadixContextMenu>
      {/* asChild lets us pass any element as the trigger */}
      <Trigger asChild>{children}</Trigger>

      <Portal>
        <Content
          className={clsx(
            "min-w-[220px] overflow-hidden rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),_0px_10px_20px_-15px_rgba(22,23,24,0.2)]",
            className,
          )}
        >
          {items.map(
            ({ label, onClick, danger, disabled, shortcut }, index) => (
              <Item
                key={index}
                onSelect={onClick}
                disabled={disabled}
                className={clsx(
                  "group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none",
                  "data-[highlighted]:bg-slate-100",
                  danger
                    ? "text-red-600 data-[highlighted]:text-red-700"
                    : "text-slate-800 data-[highlighted]:text-slate-900",
                )}
              >
                {label}
                {shortcut && (
                  <div className="ml-auto pl-5 text-xs text-slate-500 group-data-[highlighted]:text-slate-900">
                    {shortcut}
                  </div>
                )}
              </Item>
            ),
          )}
        </Content>
      </Portal>
    </RadixContextMenu>
  );
}
