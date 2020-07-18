import { User } from '../../users/state';
import { Role } from '../../roles/state';

type ValidEntity = User | Role;

export const filterMap = (entity: ValidEntity, filters: Function[]) =>
  filters.map((f) => f(entity)).every((value) => value === true);

export const getFilterFunctionsBySearchFilters = (
  filters: Partial<ValidEntity>,
  fieldsByType: {
    stringFields: string[];
  }
) => {
  // TODO: "includes" should be dynamically called, e.g. : equals, includes, startsWith, endsWith
  return Object.entries(filters).map(([key, value]) => {
    // String-type checking
    if (
      fieldsByType.stringFields.includes(key) &&
      isAValidString(value as string)
    ) {
      return getStringIncludesFunction(key, value as string);
    }

    // Date-type checking
    // if (fieldsByType.dateFields.includes(key) && isAValidDate(value as Date)) {
    //   return getMatchDateFunction(key, value as Date);
    // }

    // Number-type checking
    // if (fieldsByType.numberFields.includes(key) && isAValidNumber(value as Number)) {
    //   return getMatchNumberFunction(key, value as Date);
    // }

    return (entity: ValidEntity) => true;
  });
};

export const isAValidString = (value: string, min: number = 0) =>
  value && (value as string).length > min;

export const stringIncludes = (propertyValue: string, value: string) =>
  propertyValue.toLowerCase().includes(value.toLowerCase());

export type Entity = {
  [key: string]: string;
};
export const getStringIncludesFunction = (
  property: keyof Entity,
  value: string
) => (entity: Entity) => stringIncludes(entity[property], value);
