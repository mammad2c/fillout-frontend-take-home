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
  /** Optional title for the menu */
  title?: React.ReactNode;
}

export function ContextMenu({
  children,
  items,
  className = "",
  title,
}: ContextMenuProps) {
  return (
    <RadixContextMenu>
      {/* asChild lets us pass any element as the trigger */}
      <Trigger asChild>{children}</Trigger>

      <Portal>
        <Content
          className={clsx(
            "min-w-[220px] overflow-hidden bg-white rounded-xl bg-white border-[0.5px] border-[#e1e1e1]",
            className,
          )}
          sticky="always"
        >
          {title && (
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-10 relative overflow-hidden gap-1 p-3 border-t-0 border-r-0 border-b-[0.5px] border-l-0 border-[#e1e1e1] text-[#1a1a1a]">
              {title}
            </div>
          )}
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
                  "group relative flex select-none items-center py-[7px] px-3 text-sm leading-none outline-none data-[disabled]:pointer-events-none",
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
