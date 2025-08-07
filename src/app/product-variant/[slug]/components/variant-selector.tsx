import { productVariantsTable } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface VariantSelectorProps {
  selectedVariantSlug: string;
  variants: (typeof productVariantsTable.$inferInsert)[];
}

const VariantSelector = ({
  variants,
  selectedVariantSlug,
}: VariantSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          href={`/product-variant/${variant.slug}`}
          key={variant.id}
          className="cursor-pointer rounded-xl"
        >
          <Image
            src={variant.imageUrl}
            alt={variant.name}
            width={68}
            height={68}
            className={cn(
              selectedVariantSlug === variant.slug && "border-primary border-2",
              "hover:border-primary rounded-xl hover:border-2 hover:duration-300 hover:ease-in-out",
            )}
          />
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
