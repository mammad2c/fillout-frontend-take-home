import type { PageStep } from "@/entities/page-step";
import { Input } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  id: PageStep["id"];
};

interface PageStepRenameFormProps {
  pageStep: PageStep;
  onSubmit: (data: FormInputs) => void;
  onClose: () => void;
  className?: string;
}

export function PageStepRenameForm({
  pageStep,
  onSubmit: propsOnSubmit,
  onClose,
  className,
}: PageStepRenameFormProps) {
  const fallBackName = pageStep.name;

  const inputRef = useRef<HTMLInputElement>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const { handleSubmit, register } = useForm<FormInputs>({
    defaultValues: {
      name: pageStep.name,
      id: pageStep.id,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const validatedData = {
      name: data.name || fallBackName,
      id: data.id,
    };

    propsOnSubmit(validatedData);
    onClose();
  };

  function handleClose() {
    handleSubmit(onSubmit)();
    onClose();
  }

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 100);
  }, []);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        event.target instanceof Node &&
        !inputRef.current.contains(event.target)
      ) {
        handleClose();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef]);

  const { ref: hookFormRef, onBlur, ...rest } = register("name");

  function captureKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      handleClose();
    }
  }

  return (
    <form
      className={clsx(className)}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      ref={formRef}
    >
      <Input
        ref={(e) => {
          hookFormRef(e);
          inputRef.current = e as HTMLInputElement | null;
        }}
        onBlur={(e) => {
          onBlur(e);
          handleClose();
        }}
        onKeyDown={captureKeyDown}
        {...rest}
        className="w-full h-full px-2 py-2 text-black"
        aria-label="Page step name"
      />
      <input type="submit" hidden />
    </form>
  );
}
