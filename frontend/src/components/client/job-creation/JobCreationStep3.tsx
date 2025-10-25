"use client";
import { useState } from "react";
import Input from "@/components/common/Input";
import DynamicFormModal, { Field } from "@/components/common/Form";
import { FaClock, FaMoneyBillWave } from "react-icons/fa";

interface JobCreationStep3Props {
  step: string;
  totalSteps: string;
}

function JobCreationStep3({ step, totalSteps }: JobCreationStep3Props) {
  const [selectedRate, setSelectedRate] = useState("hourly");
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Left Side */}
        <div className="w-full md:w-1/2 space-y-6">
          <p className="text-gray-500">{`${step}/${totalSteps}`}</p>
          <h2 className="text-4xl">Tell us about your budget.</h2>
          <p className="text-md text-gray-600">
            This will help us match you to talent within your range.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 space-y-6  mt-6 md:mt-0">
          {/* Hourly Rate Box */}
          <div className="flex space-x-3">
            <div
              className={`border w-[180px] p-2 rounded-md mt-2 space-y-6 cursor-pointer transition-all ${
                selectedRate === "hourly"
                  ? "border-[#108A00]"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedRate("hourly")}
            >
              <div className="flex gap-2 justify-between">
                <FaClock className="text-gray-600 text-xl" />
                <input
                  type="radio"
                  name="rateType"
                  checked={selectedRate === "hourly"}
                  onChange={() => setSelectedRate("hourly")}
                  className="accent-[#108A00]"
                />
              </div>
              <p className="text-sm mt-1">Hourly Rate</p>
            </div>

            {/* Fixed Payment Box */}
            <div
              className={`border w-[180px] p-2 rounded-md mt-2 space-y-6 cursor-pointer transition-all ${
                selectedRate === "fixed"
                  ? "border-[#108A00]"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedRate("fixed")}
            >
              <div className="flex gap-2 justify-between">
                <FaMoneyBillWave className="text-gray-600 text-xl" />
                <input
                  type="radio"
                  name="rateType"
                  checked={selectedRate === "fixed"}
                  onChange={() => setSelectedRate("fixed")}
                  className="accent-[#108A00]"
                />
              </div>
              <p className="text-sm mt-1">Fixed Payment</p>
            </div>
          </div>

          {selectedRate == "hourly" ? (
            <div className="space-y-3">
              <b>Hourly Rate</b>
              <div className="flex space-x-6 items-center mt-3">
                <Input
                  type="number"
                  placeholder="₹10"
                  name="minHourlyRate"
                ></Input>
                <p>To</p>
                <Input
                  placeholder="₹20"
                  type="number"
                  name="maxHourlyRate"
                ></Input>
              </div>
              <span>Enter your total budget.</span>

              <div className="flex space-x-6 items-center mt-3">
                <div>
                  <b className="">Hours Per Week</b>
                  <Input
                    type="number"
                    placeholder="(Ex:20/hrs)"
                    name="minHourlyRate"
                  ></Input>
                </div>
                <div className="flex flex-col">
                  <b className="">Est Duration</b>

                  <select
                    name=""
                    id=""
                    className=" border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full rounded"
                  >
                    <option value="">1 to 3 Months</option>
                    <option value="">3 to 6 Months</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <b>Fixed Rate</b>

              <div className="flex space-x-6 items-center mt-3">
                <Input
                  type="number"
                  placeholder="₹10"
                  name="minFixedRate"
                ></Input>
                <p>To</p>
                <Input
                  placeholder="₹20"
                  type="number"
                  name="maxFixedRate"
                ></Input>
              </div>
              <span>Enter your total budget.</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default JobCreationStep3;
