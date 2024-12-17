import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) { }

  @Post()
  create(@Body() createBillDto: CreateBillDto) {
    return this.billService.create(createBillDto);
  }

  @Get()
  findAll() {
    return this.billService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.billService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBillDto: UpdateBillDto) {
    return this.billService.update(id, updateBillDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.billService.remove(id);
  }

  @Patch(':bill_id/add-product/:product_id')
  addProductToBill(@Param('bill_id', ParseIntPipe) bill_id: number, @Param('product_id', ParseIntPipe) product_id: number, @Body('quantity', ParseIntPipe) quantity: number) {
    return this.billService.addProductToBill(bill_id, product_id, quantity);
  }

  @Patch(':bill_id/remove-product/:product_id')
  removeProductFromBill(@Param('bill_id', ParseIntPipe) bill_id: number, @Param('product_id', ParseIntPipe) product_id: number, @Body('quantity', ParseIntPipe) quantity: number) {
    return this.billService.removeProductFromBill(bill_id, product_id, quantity);
  }

  @Get(':bill_id/number-of-products')
  calculateNumberOfProduct(@Param('bill_id', ParseIntPipe) bill_id: number) {
    return this.billService.calculateNumberOfProduct(bill_id);
  }

  @Get(':bill_id/total-price')
  calculateTotalPrice(@Param('bill_id', ParseIntPipe) bill_id: number) {
    return this.billService.calculateTotalPrice(bill_id);
  }
}