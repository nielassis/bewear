"use client";

import { ShoppingBasketIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/actions/get-cart";
import Image from "next/image";
import CartItem from "./cart-item";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { formatCentsToBRL } from "@/helpers/money";

const Cart = () => {
  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-5 pb-5">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex h-full flex-col gap-8">
                <div className="space-y-4 px-5">
                  {cartIsLoading && <p>Carregando...</p>}
                  {cart?.items.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      productName={item.productVariant.product.name}
                      productVariantName={item.productVariant.name}
                      productVariantImageUrl={item.productVariant.imageUrl}
                      productVariantPriceInCents={
                        item.productVariant.priceInCents
                      }
                      quantity={item.quantity}
                    />
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>

          {cart?.items.length && cart.items.length > 0 && (
            <div className="flex flex-col gap-4">
              <Separator />
              <div className="items-cente flex justify-between text-xs">
                <p>Subtotal: </p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Separator />
              <div className="items-cente flex justify-between text-xs">
                <p>Entrega: </p>
                <p className="text-primary">GRÁTIS</p>
              </div>

              <Separator />
              <div className="items-cente flex justify-between text-xs">
                <p>Total: </p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Button className="mt-5 rounded-full">Finalizar compra</Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
