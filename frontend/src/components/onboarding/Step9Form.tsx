import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

interface StepSevenProps {
  onBack: () => void;
  onNext: (data: { hourlyRate: number }) => void;
  savedData?: { hourlyRate?: number }; // ✅ get saved data from Redux/persist
}

export default function StepSevenForm({ onBack, onNext, savedData }: StepSevenProps) {
  const [hourlyRate, setHourlyRate] = useState<number | "">("");

  // ✅ Restore saved hourly rate on mount
  useEffect(() => {
    if (savedData?.hourlyRate) {
      setHourlyRate(savedData.hourlyRate);
    }
  }, [savedData]);

  return (
    <div>
      <p className="text-gray-500">8/9</p>

      <h2 className="text-2xl font-semibold mb-2">
        Now, let’s set your hourly rate.
      </h2>

      <p className="text-gray-600 mb-6 text-sm">
        Clients will see this rate on your profile and in search results once
        you publish your profile. You can adjust your rate every time you submit
        a proposal.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Hourly rate</h2>

      <p className="text-gray-600 mb-6 text-sm">Total amount the client will see.</p>

      <Input
        type="number"
        value={String(hourlyRate)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setHourlyRate(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="w-1/2"
        fullWidth={false}
      />

      <div className="flex justify-between mt-6">
        <Button content="Back" type="submit" color="gray" onClick={onBack} />
        <Button
          content="Next"
          type="submit"
          onClick={() => onNext({ hourlyRate: Number(hourlyRate) })}
          disabled={hourlyRate === "" || Number(hourlyRate) <= 0} // ✅ disabled if empty or zero
        />
      </div>
    </div>
  );
}
