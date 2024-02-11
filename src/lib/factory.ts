/**
 * A generic factory class for creating instances of a type `FactoryObject`.
 * The factory is initialized with a creation function that defines how instances of `FactoryObject` are created.
 *
 * @typeparam FactoryObject The type of object this factory creates.
 * @typeparam FactoryObjectConstructorProps The type of the creation data, defaults to `Partial<FactoryObject>`.
 */
export class Factory<
  FactoryObject,
  FactoryObjectConstructorProps = Partial<FactoryObject>,
> {
  private creationFn: (data?: FactoryObjectConstructorProps) => FactoryObject;

  /**
   * Creates a new factory instance.
   * @param creationFn A function that takes creation data of type `FactoryObjectConstructorProps` and returns an instance of type `FactoryObject`.
   */
  constructor(
    creationFn: (data?: FactoryObjectConstructorProps) => FactoryObject,
  ) {
    this.creationFn = creationFn;
  }

  /**
   * Creates an instance of `FactoryObject` using the provided data.
   * @param data Optional creation data of type `FactoryObjectConstructorProps`.
   * @returns An instance of type `FactoryObject`.
   */
  make(data?: FactoryObjectConstructorProps): FactoryObject {
    return this.creationFn(data);
  }

  /**
   * Overload 1: Creates a specified number of instances with default properties.
   * @param numberOfInstances The number of instances to create.
   * @returns An array of `FactoryObject` instances.
   * @example
   * const factory = new Factory<MyObject>();
   * // Creates 5 instances of MyObject
   * const objects = factory.makeMany(5);
   */
  makeMany(numberOfInstances: number): FactoryObject[];

  /**
   * Overload 2: Creates a specified number of instances with common creation data.
   * @param numberOfInstances The number of instances to create.
   * @param commonData The common creation data to use for all instances.
   * @returns An array of `FactoryObject` instances.
   * @example
   * const factory = new Factory<MyObject, MyObjectProps>();
   * // Creates 3 instances of MyObject with { prop: 'value' }
   * const objects = factory.makeMany(3, { prop: 'value' });
   */
  makeMany(
    numberOfInstances: number,
    commonData: FactoryObjectConstructorProps,
  ): FactoryObject[];

  /**
   * Overload 3: Creates an instance for each provided creation data object.
   * @param instances A spread of creation data objects.
   * @returns An array of `FactoryObject` instances.
   * @example
   * const factory = new Factory<MyObject, MyObjectProps>();
   * // Creates 2 instances with different properties.
   * const objects = factory.makeMany({ prop: 'value1' }, { prop: 'value2' }); 
  
   */
  makeMany(...instances: FactoryObjectConstructorProps[]): FactoryObject[];

  /**
   * Overload 4: Creates instances for each provided array of creation data objects.
   * @param instanceSets A spread of arrays of creation data objects.
   * @returns An array of `FactoryObject` instances.
   * @example
   * const factory = new Factory<MyObject, MyObjectProps>();
   * // Creates 2 instances with different properties in separate arrays
   * const objects = factory.makeMany([{ prop: 'value1' }], [{ prop: 'value2' }]);
   */
  makeMany(...instanceSets: FactoryObjectConstructorProps[][]): FactoryObject[];

  /**
   * Overload 5: General case for a mix of numbers, creation data objects, or arrays of creation data objects.
   * @param args A spread of mixed arguments consisting of numbers, creation data objects, or arrays of creation data objects.
   * @returns An array of `FactoryObject` instances.
   * @example
   * const factory = new Factory<MyObject, MyObjectProps>();
   * // Creates a total of 4 instances, two with common properties and two with individual properties
   * const objects = factory.makeMany(2, { prop: 'value' }, [{ prop: 'value1' }, { prop: 'value2' }]);
   */
  makeMany(
    ...args: (
      | number
      | FactoryObjectConstructorProps
      | FactoryObjectConstructorProps[]
    )[]
  ): FactoryObject[];

  makeMany(
    ...args: (
      | number
      | FactoryObjectConstructorProps
      | FactoryObjectConstructorProps[]
    )[]
  ): FactoryObject[] {
    if (args.length === 0) {
      return [];
    }

    if (typeof args[0] === 'number') {
      const count = args[0];
      const sharedData =
        args.length > 1 && typeof args[1] !== 'number'
          ? <FactoryObjectConstructorProps>args[1]
          : <FactoryObjectConstructorProps>{};
      return Array.from({ length: count }, () => this.make(sharedData));
    }

    return args.flatMap((arg) => {
      if (Array.isArray(arg)) {
        return arg.map((data) => this.make(data));
      } else {
        return this.make(<FactoryObjectConstructorProps>arg);
      }
    });
  }
}
