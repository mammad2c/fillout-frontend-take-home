export interface PageStep {
  id: string;
  name: string;
  type:
    | "form"
    | "cover"
    | "ending"
    | "submission_review"
    | "payment"
    | "login"
    | "scheduling";
  nextStepId?: PageStep["id"];
}
