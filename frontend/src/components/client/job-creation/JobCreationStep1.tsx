"use client";
import { useEffect, useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import DynamicFormModal from "@/components/common/Form";
import { clientActionApi } from "@/api/action/ClientActionApi";

function JobCreationStep1(data:Record<string,unknown>) {

  useEffect(()=>{

    async function fetchCategories(){
      const categoryResponse = await clientActionApi.getAllCategories()

      console.log(categoryResponse)
    }

    fetchCategories()

    
  },[])

  const [categories, setCategories] = useState([
    "Web Development",
    "Graphic Design",
    "Digital Marketing",
    "Content Writing",
    "UI/UX Design",
    "Mobile App Development",
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Left Side */}
        <div className="w-full md:w-1/2 space-y-6">
          <p className="text-gray-500">{`${data.step as string}/${data.totalSteps as string}`}</p>

          {/* Headline */}
          <h2 className="text-4xl">Let's start with a strong title.</h2>
          <p className="text-md text-gray-600">
            This helps your job post stand out to the right candidates. It’s the
            first thing they’ll see, so make it count!
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 space-y-6 mt-6 md:mt-0">
          <p>Write a title for your job post</p>
          <Input type="text" placeholder="Enter Job Title" />

          {/* Example Titles */}
          <div className="mt-4">
            <p className="text-gray-500 text-sm font-medium">Example titles</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-3 mt-2">
              <li>
                Build responsive WordPress site with booking/payment
                functionality
              </li>
              <li>
                Graphic designer needed to design ad creative for multiple
                campaigns
              </li>
              <li>Facebook ad specialist needed for product launch</li>
            </ul>
          </div>

          {/* Job Category */}
          <div className="mt-6">
            <b>Job Category</b>
            <div className="mt-2 space-y-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="jobCategory"
                    value={category}
                    className="accent-green-500"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                  />
                  <span className="text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <p
            style={{ color: "#108A00" }}
            className="cursor-pointer"
            onClick={() => setIsCategoryModalOpen(true)}
          >
            See All Categories
          </p>
        </div>
      </div>



      {/* create modal */}
      {isCategoryModalOpen && (
        <DynamicFormModal
          title={"Select Category"}
          fields={[
            {
              name: "category",
              type: "radio",
              options: categories.map((category) => ({
                label: category,
                value: category,
              })),
              label: "Category",
            },
          ]}
          onSubmit={() => {}}
          onClose={() => setIsCategoryModalOpen(false)}
          mode="update"
          layout={"vertical"}
        />
      )}
    </>
  );
}

export default JobCreationStep1;
