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
      return <InformationCircleIcon {...rest} aria-label="cover-icon" />;

    case "ending":
      return <CheckCircleIcon {...rest} aria-label="ending-icon" />;

    case "form":
      return <DocumentTextIcon {...rest} aria-label="form-icon" />;

    case "login":
      return <LockClosedIcon {...rest} aria-label="login-icon" />;

    case "payment":
      return <CreditCardIcon {...rest} aria-label="payment-icon" />;

    case "scheduling":
      return <CalendarDaysIcon {...rest} aria-label="scheduling-icon" />;

    case "submission_review":
      return <EyeIcon {...rest} aria-label="submission-review-icon" />;
  }
}
