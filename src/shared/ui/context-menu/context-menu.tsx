import {
  ContextMenu as RadixContextMenu,
  Trigger,
  Item,
  Portal,
  Content,
  Separator,
} from "@radix-ui/react-context-menu";
import clsx from "clsx";
import React from "react";

type ContextMenuItem =
  | {
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
  | {
      divider?: boolean;
    };

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
            "min-w-[220px] overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),_0px_10px_20px_-15px_rgba(22,23,24,0.2)]",
            className,
          )}
          sticky="always"
        >
          {items.map((item, index) => {
            if ("divider" in item) {
              return (
                <Separator key={index} className="m-[7px] h-px bg-slate-200" />
              );
            }

            // Type guard: item is not a divider
            const { onClick, label, danger, disabled, shortcut } =
              item as Exclude<ContextMenuItem, { divider?: boolean }>;

            return (
              <Item
                key={index}
                onSelect={onClick}
                disabled={disabled}
                className={clsx(
                  "group relative flex select-none items-center rounded-[3px] p-[7px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none",
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
            );
          })}
        </Content>
      </Portal>
    </RadixContextMenu>
  );
}
