/* eslint-disable */

import { Injectable, HttpStatus } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { List } from "src/interface/list.interface";
import { ListModal } from "src/schema/list.model";
import { ListDto } from "src/dto/list.dto";

interface ListRespose {
    message: string;
    status: HttpStatus;
    list: any[];
}

interface ListDeleteResponse {
   message: string;
   status: HttpStatus;
}

interface updateResponse {
   message: string;
   status: HttpStatus;
}

@Injectable()
export class ListService {
   constructor(@InjectModel('List') private readonly listModel: Model<ListModal>) {}
    async getListData(): Promise<ListRespose> {
     try{
        const listData = await this.listModel.find().exec();
        return { message: 'List retrieved successfully', status: HttpStatus.OK, list: listData };
     }catch(error) {
        return { message: error, status: HttpStatus.INTERNAL_SERVER_ERROR, list: [] }
     }
    }

    async deleteListItem(id: string): Promise<ListDeleteResponse> {
      try{
         const deleteResult = await this.listModel.findByIdAndDelete(id).exec();
         if (deleteResult) {
            return { message: 'List item deleted successfully', status: HttpStatus.OK };
        } else {
            return { message: 'List item not found', status: HttpStatus.NOT_FOUND };
        }
      }catch(error) {
         return { message: error, status: HttpStatus.INTERNAL_SERVER_ERROR };
      }
    }

    async updateListItem(id: string, list: ListDto) : Promise<updateResponse> {
     try{
      const updatedList = await this.listModel.findByIdAndUpdate(id, list, { new: true }).exec();
      if (updatedList) {
         return { message: 'List item updated successfully', status: HttpStatus.OK };
     } else {
         return { message: 'List item not found', status: HttpStatus.NOT_FOUND };
     }
     }catch(error) {
      return { message: error, status: HttpStatus.INTERNAL_SERVER_ERROR };
     }
    }
}