/* eslint-disable */

import { Controller, Get, Delete, Param, Patch, Body } from "@nestjs/common";
import { ListService } from "src/service/list.service";
import { HttpStatus } from "@nestjs/common";
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
@Controller('list')
export class ListController {
    constructor(private readonly listService: ListService){}

    @Get()
    async getList(): Promise<ListRespose> {
        return this.listService.getListData();
    }

    @Delete(':id')
    async deleteList(@Param('id') id: string) : Promise<ListDeleteResponse>{
       return this.listService.deleteListItem(id);
    }

    @Patch('update/:id')
    async updateList(@Param('id') id: string, @Body() list: ListDto) : Promise<updateResponse> {
        return this.listService.updateListItem(id, list)
    }
}