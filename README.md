# tbd

```tsx
import { Application, BaseComponent } from "tbd";

/**
 * Define App class where you can initialse global state and other globally useful information.
 * Application class handles much of the underlying infrustructure.
 */
class App extends Application {
    static name = "Example";
}

/**
 * Extend base component class to provide type hinting for extended Application class.
 * Can also add in own helper methods. Access to the Application instance means no need for `connect` wrapper functions.
 */
export abstract class Component<TState, TProps> extends BaseComponent<TState, TProps, App> {}

/**
 * Example main component.
 */
class Main extends Component<object, object> {
    render() {
        return (
            <p>
                Hello from {this.app.name}!
            </p>
        );
    }
}

// Start app
new App().start(document.body, <Main />);
```

```tsx
interface IComponent
{
    /**
     * @param props Component properties
     * @param ref Reference for component instance, used for invoking lifecycle methods
     */
    <TProps>(props: TProps, ref: string): () => {};
}
```
