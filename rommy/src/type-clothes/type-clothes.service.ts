import { All, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TypeClothes } from './type-clothes.model';
import { TypeClothesDto } from './dto/type-clothes.dto';

@Injectable()
export class TypeClothesService {
    constructor(
        @InjectModel(TypeClothes)
        private typeClothesModel : typeof TypeClothes,
      ){}

      findOne(filter: {
        where: { id?: number|string; name?: string; };
      }): Promise<TypeClothes> {
        return this.typeClothesModel.findOne({ ...filter });
      }
    
      findAll(): Promise<TypeClothes[]> {
        return  this.typeClothesModel.findAll();
      }
      async create(
        typeClothesDto: TypeClothesDto
    ): Promise<TypeClothes| {warningMessage:string}>{
        const typeClothes = new TypeClothes();
      

        const existingTypeClothesByName = await this.findOne({
            where: {name : typeClothesDto.name}
        });
     
        if(existingTypeClothesByName){
            return {
                warningMessage : 'Уже существует такой тип одежды'
            };
        }

        typeClothes.name = typeClothesDto.name;

        return typeClothes.save();
    }

    async getTypeClothes(name:string):Promise<TypeClothesDto|string>{
        const typeClothes = await this.findOne({where:{name}});
        if(!typeClothes){
            return "Такой магазин не найден";
        }
        return typeClothes;
    }

 
}
