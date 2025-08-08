import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantsTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";
import VariantSelector from "./components/variant-selector";
import QuantitySelector from "./components/quantity-selector";
import AddToCartButton from "./components/add-to-cart-button";
import ProductActions from "./components/product-actions";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productsVariant = await db.query.productVariantsTable.findFirst({
    where: eq(productVariantsTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productsVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productsVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />

      <div className="flex flex-col space-y-6">
        <Image
          src={productsVariant.imageUrl}
          alt={productsVariant.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full object-cover"
        />

        <div className="px-5"></div>

        <div className="px-5">
          <h2 className="text-lg font-semibold">
            {productsVariant.product.name}
          </h2>

          <h3 className="text-muted-foreground text-sm">
            {productsVariant.name}
          </h3>

          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(productsVariant.priceInCents)}
          </h3>
        </div>

        <div className="px-5">
          <VariantSelector
            variants={productsVariant.product.variants}
            selectedVariantSlug={productsVariant.slug}
          />
        </div>

        <ProductActions productVariantId={productsVariant.id} />
        <div className="px-5">
          <p className="text-sm">{productsVariant.product.description}</p>
        </div>

        <ProductList
          title="Você também pode gostar"
          products={likelyProducts}
        />

        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;
