"use client";

import { useEffect, useState } from "react";

import {
  Plus,
  Package,
  Star,
  MessageSquare,
  MoreVertical,
  Pencil,
  Trash2,
  Power,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Switch } from "@/components/ui/switch";

import { Label } from "@/components/ui/label";

import { Product } from "@/types/product";

import { ProductService } from "@/services/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [open, setOpen] = useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    isActive: true,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data =
      await ProductService.getProducts();

    setProducts(data);
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      category: "",
      isActive: true,
    });

    setEditingProduct(null);
  };

  const openCreateModal = () => {
    resetForm();

    setOpen(true);
  };

  const openEditModal = (
    product: Product
  ) => {
    setEditingProduct(product);

    setForm({
      name: product.name,
      description: product.description,
      category: product.category,
      isActive: product.isActive,
    });

    setOpen(true);
  };

  const handleSubmit = () => {
    if (
      !form.name.trim() ||
      !form.description.trim()
    ) {
      return;
    }

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.productId ===
          editingProduct.productId
            ? {
                ...p,
                ...form,
              }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        productId: crypto.randomUUID(),

        ownerId: "2",

        slug: form.name
          .toLowerCase()
          .replaceAll(" ", "-"),

        totalFeedback: 0,

        averageRating: 0,

        createdAt:
          new Date().toISOString(),

        ...form,
      };

      setProducts((prev) => [
        newProduct,
        ...prev,
      ]);
    }

    setOpen(false);

    resetForm();
  };

  const deleteProduct = (
    id: string
  ) => {
    setProducts((prev) =>
      prev.filter(
        (p) => p.productId !== id
      )
    );
  };

  const toggleProduct = (
    id: string
  ) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.productId === id
          ? {
              ...p,
              isActive:
                !p.isActive,
            }
          : p
      )
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-muted-foreground">
            Manage all products and
            feedback channels.
          </p>
        </div>

        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <DialogTrigger asChild>
            <Button
              onClick={
                openCreateModal
              }
            >
              <Plus className="mr-2 h-4 w-4" />

              New Product
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingProduct
                  ? "Edit Product"
                  : "Create Product"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>
                  Product Name
                </Label>

                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name:
                        e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>
                  Category
                </Label>

                <Input
                  value={
                    form.category
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category:
                        e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>
                  Description
                </Label>

                <Textarea
                  value={
                    form.description
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description:
                        e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>
                  Active
                </Label>

                <Switch
                  checked={
                    form.isActive
                  }
                  onCheckedChange={(
                    value
                  ) =>
                    setForm({
                      ...form,
                      isActive:
                        value,
                    })
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={
                  handleSubmit
                }
              >
                {editingProduct
                  ? "Save Changes"
                  : "Create Product"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map(
          (product) => (
            <Card
              key={
                product.productId
              }
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <CardTitle>
                  {product.name}
                </CardTitle>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        openEditModal(
                          product
                        )
                      }
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() =>
                        toggleProduct(
                          product.productId
                        )
                      }
                    >
                      <Power className="mr-2 h-4 w-4" />
                      {product.isActive
                        ? "Disable"
                        : "Enable"}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() =>
                        deleteProduct(
                          product.productId
                        )
                      }
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>

              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  {
                    product.description
                  }
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MessageSquare className="h-4 w-4" />

                    {
                      product.totalFeedback
                    }{" "}
                    feedback
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4" />

                    {
                      product.averageRating
                    }
                    /5
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4" />

                    {
                      product.category
                    }
                  </div>

                  <div className="pt-2">
                    <span
                      className={
                        product.isActive
                          ? "rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
                          : "rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700"
                      }
                    >
                      {product.isActive
                        ? "Active"
                        : "Disabled"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}