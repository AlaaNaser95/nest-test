import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

export class BaseRepository<E> extends Repository<E> {
    protected entityName: string;

    constructor(entityName) {
        super()
        this.entityName = entityName;
    }

    async findOneOrException(conditions, relations = [], customMessage?) {
        const entity = await this.findOne({
            where: conditions,
            relations: relations,
        });
        if (!entity) {
            throw new NotFoundException(
                customMessage ?? `Entity ${this.entityName} is not found`
            );
        }
        return entity;
    }
}
