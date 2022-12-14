import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async registerProduct(@Body() body) {
    try {
      const data = body;

      const product = await this.productsService.registerProduct(data);

      return { ...product };
    } catch (err) {
      return err;
    }
  }

  @Get()
  async getProduct(@Query() query) {
    try {
      const product = await this.productsService.getProduct(query);

      return product;
    } catch (err) {
      return err;
    }
  }

  @Get('all')
  async getAllProduct() {
    try {
      const products = await this.productsService.getAllProducts();
      console.log(
        '🚀 ~ file: products.controller.ts:58 ~ ProductsController ~ getAllProduct ~ products',
        products,
      );

      return products;
    } catch (err) {
      return err;
    }
  }

  @Put()
  async updateProduct(@Body() body) {
    try {
      const data = body;
      const updatedProduct = await this.productsService.updateProduct(data);

      return { ...updatedProduct };
    } catch (err) {
      return err;
    }
  }

  @Delete()
  async deleteProduct(@Query() query) {
    try {
      await this.productsService.deleteProduct(query.id);
    } catch (err) {
      return err;
    }
  }
}
