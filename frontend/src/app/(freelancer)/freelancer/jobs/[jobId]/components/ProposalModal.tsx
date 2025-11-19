import React, { useEffect, useState } from "react";
import { z } from "zod";
import DynamicFormModal from "@/components/common/Form";
import { Field } from "@/types/interfaces/forms";
import { proposalSchema } from "@/utils/validations/freelancerValidation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CURRENCY_SYMBOLS, SupportedCurrency, getUsdRateFor } from "@/utils/currency";

interface ProposalFormModalProps {
  jobType: "hourly" | "fixed";
  onSubmit: (data: Record<string, any>) => void;
  onClose: () => void;
}

const ProposalFormModal: React.FC<ProposalFormModalProps> = ({
  jobType,
  onSubmit,
  onClose,
}) => {
  const preferredCurrency = (useSelector((s: RootState) => s.auth.user?.preferredCurrency) || 'USD') as SupportedCurrency;
  const [rateToUSD, setRateToUSD] = useState<number>(1);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const r = await getUsdRateFor(preferredCurrency);
        if (active) setRateToUSD(r || 1);
      } catch { if (active) setRateToUSD(1); }
    })();
    return () => { active = false; };
  }, [preferredCurrency]);

  // ✅ Fields based on job type
  const hourlyFields: Field[] = [
    {
      name: "hourlyRate",
      label: `Your Hourly Rate (${CURRENCY_SYMBOLS[preferredCurrency]})`,
      type: "number",
      placeholder: "Enter your hourly rate",
      group: "payment",
    },
    {
      name: "availableHoursPerWeek",
      label: "Available Hours per Week",
      type: "number",
      placeholder: "e.g., 20",
      group: "payment",
    },
    {
      name: "coverLetter",
      label: "Cover Letter",
      type: "textarea",
      placeholder: "Write your proposal...",
      group: "info",
    },
  ];

  const fixedFields: Field[] = [
    {
      name: "proposedBudget",
      label: `Proposed Budget (${CURRENCY_SYMBOLS[preferredCurrency]})`,
      type: "number",
      placeholder: "Enter total project amount",
      group: "payment",
    },
    {
      name: "deadline",
      label: "Estimated Completion Date",
      type: "date",
      group: "payment",
    },
    {
      name: "coverLetter",
      label: "Cover Letter",
      type: "textarea",
      placeholder: "Write your proposal...",
      group: "info",
    },
  ];

  const fields = jobType === "hourly" ? hourlyFields : fixedFields;



  return (
    <DynamicFormModal
      fields={fields}
      title="Submit Proposal"
      onSubmit={onSubmit}
      onClose={onClose}
      validationSchema={proposalSchema(jobType, rateToUSD)}
      mode="create"
      layout="vertical"
      submitContent="Submit"
    />
  );
};

export default ProposalFormModal;
