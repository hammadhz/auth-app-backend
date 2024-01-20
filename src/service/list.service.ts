/* eslint-disable */

import { Injectable, HttpStatus } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { List } from "src/interface/list.interface";
import { ListModal } from "src/schema/list.model";

interface ListRespose {
    message: string;
    status: HttpStatus;
    list: any[];
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
}