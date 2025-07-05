import { ModalDialog } from "@/shared/ui/modal-dialog";
import {
  Description,
  Field,
  Input,
  Label,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import clsx from "clsx";
import { useRef } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { usePageStepForm } from "./use-page-step-form";
import { usePageStepStore } from "../../model/use-page-step-store";
import { PageStepIcon } from "../page-step-icon";
import type { PageStep } from "../../model/types";

const schema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  type: z.enum([
    "form",
    "cover",
    "ending",
    "submission_review",
    "payment",
    "login",
    "scheduling",
  ]),
});

type FormInputs = z.infer<typeof schema>;

const types = [
  {
    value: "form",
    label: "Form",
    description: "Create a form",
  },
  {
    value: "cover",
    label: "Cover",
    description: "Create a cover",
  },
  {
    value: "ending",
    label: "Ending",
    description: "Create an ending",
  },
  {
    value: "submission_review",
    label: "Submission Review",
    description: "Create a submission review",
  },
  {
    value: "payment",
    label: "Payment",
    description: "Create a payment",
  },
  {
    value: "login",
    label: "Login",
    description: "Create a login",
  },
  {
    value: "scheduling",
    label: "Scheduling",
    description: "Create a scheduling",
  },
];

export function PageStepForm() {
  const hideForm = usePageStepForm((s) => s.hideForm);
  const isShowingForm = usePageStepForm((s) => s.isShowingForm);
  const prevPageStepId = usePageStepForm((s) => s.prevPageStepId);
  const addPageStep = usePageStepStore((s) => s.add);
  const nameRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    clearErrors,
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      type: undefined,
    },
    resolver: zodResolver(schema),
  });

  function handleClose() {
    hideForm();
    reset();
  }

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    addPageStep(data, prevPageStepId);
    handleClose();
  };

  // we need to use a ref to focus the input
  const { ref: hookFormRef, ...rest } = register("name");

  const selectedType = watch("type");

  function handleTypeChange(value: FormInputs["type"]) {
    if (!value) {
      return;
    }

    setValue("type", value);
    clearErrors("type");
  }

  return (
    <ModalDialog
      isOpen={isShowingForm}
      onClose={handleClose}
      initialFocus={nameRef}
      title="Create Page"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Field>
          <Label className="text-sm/6 font-medium text-white">Name</Label>
          <Description className="text-sm/6 text-white/50">
            The name of the page will appear every where.
          </Description>
          <Input
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
            )}
            {...rest}
            ref={(e) => {
              hookFormRef(e);
              nameRef.current = e;
            }}
          />
          {errors.name && (
            <p className="mt-1 text-sm/6 text-red-600">{errors.name.message}</p>
          )}
        </Field>

        <Field className="mt-4">
          <Label className="text-sm/6 font-medium text-white">Page type</Label>
          <Description className="text-sm/6 text-white/50">
            Please select the page type
          </Description>

          {errors.type && (
            <p className="mt-1 text-sm/6 text-red-600">{errors.type.message}</p>
          )}
          <RadioGroup onChange={handleTypeChange} className="flex flex-wrap">
            {types.map(({ value, label, description }) => (
              <div className="p-2 w-1/2" key={value}>
                <Radio
                  value={value}
                  className="flex w-full h-full p-4 mb-4 cursor-pointer rounded-lg bg-white/5 text-white shadow-md transition focus:not-data-focus:outline-none data-checked:bg-white/10 data-focus:outline data-focus:outline-white"
                >
                  <div className="flex w-full items-center justify-between overflow-hidden">
                    <div className="text-sm/6 max-w-[80%]">
                      <p
                        className="font-semibold text-white flex items-center"
                        aria-label={label}
                      >
                        <PageStepIcon
                          className="h-4 w-4 mr-1"
                          type={value as PageStep["type"]}
                        />

                        {label}
                      </p>
                      <p className="truncate">{description}</p>
                    </div>

                    {selectedType === value && (
                      <div className="">
                        <CheckCircleIcon className="size-8" />
                      </div>
                    )}
                  </div>
                </Radio>
              </div>
            ))}
          </RadioGroup>
        </Field>

        <div className="mt-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </ModalDialog>
  );
}
