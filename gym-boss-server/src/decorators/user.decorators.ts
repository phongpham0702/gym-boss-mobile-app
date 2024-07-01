import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

const MatchPassword = (property: string, validationOptions?: ValidationOptions) => {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "MatchPassword",
            target: object.constructor,
            propertyName: property,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value:string, args: ValidationArguments){
                    console.log(value);
                    console.log(args);
                    return false;
                }
            }
        })
    }
};

export {
    MatchPassword
};

/* export function IsLongerThan(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return typeof value === 'string' && typeof relatedValue === 'string' && value.length > relatedValue.length; // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
} */