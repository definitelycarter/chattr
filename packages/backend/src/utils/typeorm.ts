import { getRepository as _getRepository, ObjectType } from 'typeorm';

export function getRepository<Entity>(entity: ObjectType<Entity> | string) {
  return _getRepository(entity, process.env.NODE_ENV);
}
