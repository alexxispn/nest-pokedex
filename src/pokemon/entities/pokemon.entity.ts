import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Pokemon extends Document {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  name: string;
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
