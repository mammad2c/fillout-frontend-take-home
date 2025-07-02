import { type MouseEventHandler } from "react";
import type { PageStep } from "../../model/types";
import {
  InformationCircleIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  LockClosedIcon,
  CreditCardIcon,
  CalendarDaysIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

interface PageStepIconProps {
  type: PageStep["type"];
  className?: string;
  onClick?: MouseEventHandler | undefined;
}

export function PageStepIcon({ type, ...rest }: PageStepIconProps) {
  switch (type) {
    case "cover":
      return <InformationCircleIcon {...rest} />;

    case "ending":
      return <CheckCircleIcon {...rest} />;

    case "form":
      return <DocumentTextIcon {...rest} />;

    case "login":
      return <LockClosedIcon {...rest} />;

    case "payment":
      return <CreditCardIcon {...rest} />;

    case "scheduling":
      return <CalendarDaysIcon {...rest} />;

    case "submission_review":
      return <EyeIcon {...rest} />;
  }
}
