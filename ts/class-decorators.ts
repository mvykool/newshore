// example 1: add property to a class
// how can I add more logic without having to directly modify the class??
// Using a decorator

function approved<T extends { new (...args: any[]): {} }>(
  constructor: T,
  _context: ClassDecoratorContext,
): T {
  return class extends constructor {
    isApproved = "Yes";
  };
}

@approved
class myClass {
  constructor() {}
}

const instace = new myClass();

console.log((instace as any).isApproved);
