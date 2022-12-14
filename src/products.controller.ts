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
    console.log(
      '🚀 ~ file: products.controller.ts:31 ~ ProductsController ~ getProduct ~ query',
      query,
    );
    try {
      const { id, category } = query;

      const product = await this.productsService.getProduct(id ? id : category);

      return product;
    } catch (err) {
      return err;
    }
  }

  @Get('all')
  async getAllProduct() {
    try {
      const products = await this.productsService.getAllProducts();

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
