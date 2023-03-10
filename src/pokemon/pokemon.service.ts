import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private readonly defaultLimit: number;
  private readonly defaultOffset: number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get('limit');
    this.defaultOffset = this.configService.get('offset');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = this.defaultOffset } =
      paginationDto;
    return this.pokemonModel.find().skip(offset).limit(limit);
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if (!isNaN(Number(term))) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }
    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no "${term}" not found`,
      );
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const { name, no } = updatePokemonDto;
    const pokemon = await this.findOne(term);
    if (name) pokemon.name = name.toLowerCase().trim();
    if (no) pokemon.no = no;
    try {
      await pokemon.updateOne(updatePokemonDto);
      return pokemon;
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    const deletedPokemon = await this.pokemonModel.findByIdAndDelete(id);
    if (!deletedPokemon)
      throw new NotFoundException(`Pokemon with id "${id}" not found`);
    return deletedPokemon;
  }

  private handleError(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon name or no already exists in db ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }
    throw new InternalServerErrorException();
  }
}
