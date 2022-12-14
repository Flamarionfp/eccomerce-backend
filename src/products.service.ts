import { Injectable } from '@nestjs/common';

import { AppError } from './App.error';
import { PrismaService } from './prisma.service';

interface Product {
  id?: string;
  productName: string;
  category: string;
  listPrice: number;
  salePrice: number;
  stockQuantity: number;
  productImage: string[];
}

interface UpdateProduct {
  id: string;
  productName?: string;
  category: string;
  listPrice?: number;
  salePrice?: number;
  stockQuantity?: number;
  productImage?: string[];
}

interface SearchByProps {
  id?: string;
  category?: string;
}

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  registerProduct = async (data: Product): Promise<Product> => {
    const productExists = await this.prisma.product.findFirst({
      where: {
        productName: {
          equals: data.productName,
          mode: 'insensitive',
        },
      },
    });

    if (productExists) throw new AppError('Product already exists on database');

    const product = await this.prisma.product.create({
      data,
    });

    return product;
  };

  getProduct = async (data: SearchByProps): Promise<Product[]> => {
    if (!data) throw new AppError('Product not found');

    if (data.category) {
      const product = await this.prisma.product.findMany({
        where: {
          category: data.category,
        },
        select: {
          category: true,
          id: true,
          listPrice: true,
          productImage: true,
          productName: true,
          salePrice: true,
          stockQuantity: true,
        },
      });

      return product;
    }

    const product = await this.prisma.product.findMany({
      where: {
        id: data.id,
      },
      select: {
        category: true,
        id: true,
        listPrice: true,
        productImage: true,
        productName: true,
        salePrice: true,
        stockQuantity: true,
      },
    });

    if (!product) throw new AppError('Product not found');

    return product;
  };

  getAllProducts = async () => {
    const products = await this.prisma.product.findMany({});

    if (!products) throw new AppError('There is not product found');

    return products;
  };

  getProductsByCategory = async (category: string): Promise<Product[]> => {
    console.log(
      '🚀 ~ file: products.service.ts:73 ~ ProductsService ~ getProductsByCategory= ~ category',
      category,
    );
    const products = await this.prisma.product.findMany({
      where: {
        category: category,
      },
      select: {
        id: true,
        category: true,
        listPrice: true,
        salePrice: true,
        productImage: true,
        productName: true,
        stockQuantity: true,
      },
    });

    if (!products) throw new AppError('There is no products for this category');

    return products;
  };

  updateProduct = async (data: UpdateProduct): Promise<Product> => {
    const productExists = await this.prisma.product.findFirst({
      where: {
        id: {
          equals: data.id,
          mode: 'insensitive',
        },
      },
    });

    if (!productExists) throw new AppError('Product not found');

    const productUpdate = await this.prisma.product.update({
      where: {
        id: data.id,
      },
      data,
    });

    return productUpdate;
  };

  deleteProduct = async (id: string): Promise<void> => {
    const productExists = await this.prisma.product.findFirst({
      where: {
        id: {
          equals: id,
          mode: 'insensitive',
        },
      },
    });

    if (!productExists) throw new AppError('Product not found');

    await this.prisma.product.delete({
      where: {
        id,
      },
    });
  };
}
