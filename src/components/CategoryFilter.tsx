import { categories } from "@/data/jobs";

interface CategoryFilterProps {
  selected: string;
  onChange: (cat: string) => void;
}

const CategoryFilter = ({ selected, onChange }: CategoryFilterProps) => (
  <div className="flex flex-wrap gap-2">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => onChange(cat)}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
          selected === cat
            ? "bg-primary text-primary-foreground shadow-glow"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
