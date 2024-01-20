/* eslint-disable */

//list.model.ts

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class List extends Document{
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    role: string
}

export type ListModal = List & Document;
export const ListSchema = SchemaFactory.createForClass(List);