"use client";

import { Category } from "@/models/categoryModels";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function CategoryList({
  categories,
  selectedCategoryName,
}: {
  categories: Category[];
  selectedCategoryName: string | null;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    selectedCategoryName
  );

  const handleCategoryClick = (categoryName: string | null) => {
    setSelectedCategory(categoryName || null);
    if (categoryName) {
      redirect(`/category/${categoryName}`);
    } else {
      redirect("/");
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      <div>
        <button
          className={
            !selectedCategory
              ? "bg-blue-700 px-2 py-1 rounded cursor-pointer"
              : "bg-blue-500 px-2 py-1 rounded cursor-pointer hover:bg-blue-700"
          }
          onClick={() => handleCategoryClick(null)}
        >
          All
        </button>
      </div>
      {categories.map((category) => (
        <div key={category.id}>
          <button
            className={
              selectedCategory === category.name
                ? "bg-blue-700 px-2 py-1 rounded cursor-pointer"
                : "bg-blue-500 px-2 py-1 rounded cursor-pointer hover:bg-blue-700"
            }
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </button>
        </div>
      ))}
    </div>
  );
}
