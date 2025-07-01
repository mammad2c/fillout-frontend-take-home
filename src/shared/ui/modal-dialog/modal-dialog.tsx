import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { ReactNode } from "react";
import clsx from "clsx";
import { XCircleIcon } from "@heroicons/react/24/outline"; // Import icons if needed

export interface ModalDialogProps {
  /**
   * Controls whether the dialog is open or closed
   * This should be a state variable in the parent component
   * and should be passed down to this component
   */
  isOpen: boolean;
  /**
   * Callback function to close the dialog
   * This should be passed from the parent component
   * and should update the state variable controlling `isOpen`
   */
  onClose: () => void;
  /** Optional heading for the dialog */
  title?: ReactNode;
  /** Slot for your form / content */
  children?: ReactNode;
  /** Max-width preset */
  size?: "sm" | "md" | "lg" | "xl";
  /** First element to focus when the modal opens */
  initialFocus?: React.RefObject<HTMLElement | null> | null;
  /** Extra classes (e.g. variant hooks) */
  className?: string;
}

const SIZE_MAP = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function ModalDialog({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  initialFocus,
  className,
}: ModalDialogProps) {
  return (
    <Dialog
      as="div"
      className="relative z-50"
      open={isOpen}
      onClose={onClose}
      initialFocus={initialFocus ?? undefined}
      transition
    >
      {/* Backdrop */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      {/* Centering wrapper */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* Panel */}

        <DialogPanel
          transition
          className={clsx(
            "w-full transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left shadow-xl transition-all",
            SIZE_MAP[size],
            className,
          )}
        >
          {title && (
            <DialogTitle className="text-lg font-semibold text-slate-900 dark:text-slate-50 flex items-center justify-between">
              {title}
              <CloseButton onClick={onClose} aria-label="Close dialog">
                <XCircleIcon className="h-6 w-6 text-red-600" />
              </CloseButton>
            </DialogTitle>
          )}

          <div className="mt-4">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
