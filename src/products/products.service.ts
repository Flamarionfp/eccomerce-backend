import { Injectable } from '@nestjs/common';

import { AppError } from '../App.error';
import { PrismaService } from '../prisma.service';

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

    const queryEntries = Object.entries(data);
    let formattedQuery = {};

    queryEntries.forEach(([key, value]) => {
      if (value) {
        formattedQuery = {
          ...formattedQuery,
          [key]: {
            equals: value,
            mode: 'insensitive',
          },
        };
      }
    });

    const products = await this.prisma.product.findMany({
      where: formattedQuery,
    });

    if (!products) throw new AppError('Product not found');

    return products;
  };

  getAllProducts = async () => {
    const products = await this.prisma.product.findMany({});

    if (!products) throw new AppError('There is not product found');

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
