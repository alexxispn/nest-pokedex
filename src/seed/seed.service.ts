import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly httpService: AxiosAdapter,
  ) {}
  async execute() {
    await this.pokemonModel.deleteMany({});
    const data = await this.httpService.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    const pokemons = data.results.map(({ name, url }) => ({
      name,
      no: url.split('/')[url.split('/').length - 2],
    }));
    await this.pokemonModel.insertMany(pokemons);
    return 'Seeding completed';
  }
}
