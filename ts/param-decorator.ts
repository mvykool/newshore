function registrarModificarArgumento(
  method: Function,
  context: ClassMethodDecoratorContext,
) {
  return function (...args: any[]) {
    const argsModified = args.map((arg) => {
      typeof arg == "string" ? arg.toLowerCase() : arg;
    });

    return method.apply(this, argsModified);
  };
}

class Saludar {
  @registrarModificarArgumento
  saludar(parametro: string) {
    console.log(`hola ${parametro}`);
  }
}
