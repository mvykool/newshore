function Component(config: { selector: string; template: string }) {
  return function (target: any) {
    target.prototype.selector = config.selector;
    target.prototype.template = config.template;
  };
}

@Component({
  selector: "app-component",
  template: "<h1>{{ title }}</h1>",
})
class MyComponent {
  selector!: string;
  template!: string;

  title: string = "soy un component hecho by mk";
}
