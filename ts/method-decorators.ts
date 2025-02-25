type methodDecoratorStructure = (
  method: Function,
  context: ClassMethodDecoratorContext,
) => PropertyDescriptor | void;

function logMethod(method: Function, context: ClassMethodDecoratorContext) {
  return function (...args: any[]) {
    console.log(`method ${String(context.name)}`);
  };
}
