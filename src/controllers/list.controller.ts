/* eslint-disable */

import { Controller, Get } from "@nestjs/common";
import { ListService } from "src/service/list.service";
import { HttpStatus } from "@nestjs/common";

interface ListRespose {
    message: string;
    status: HttpStatus;
    list: any[];
}
@Controller('list')
export class ListController {
    constructor(private readonly listService: ListService){}

    @Get('listData')
    async getList(): Promise<ListRespose> {
        return this.listService.getListData();
    }
}