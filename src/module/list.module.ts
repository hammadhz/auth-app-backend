/* eslint-disable */
import { Module } from "@nestjs/common";
import { ListController } from '../controllers/list.controller';
import { ListService } from '../service/list.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema } from "src/schema/list.model";

@Module({
    imports: [MongooseModule.forFeature(
      [{
      name: 'List',
      schema: ListSchema,
}])],
    controllers: [ListController],
    providers: [ListService],
  })
  export class ListModule {}