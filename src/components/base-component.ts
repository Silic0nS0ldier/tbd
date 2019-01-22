import { IsolatedComponent } from "./isolated-component";
import { Application } from "../application";

/**
 * Component base class.
 */
export abstract class BaseComponent<TState = object, TProps extends object = object, TApp extends Application = Application> extends IsolatedComponent<TState & { props: TProps }> {
    
    /**
     * Set components properties.
     * Properties are merged into `this.state.props` via `this.setState`.
     * @param props New props.
     */
    protected setProps(props: TProps): void {
        this.setState(state => {
            state.props = props;
            return state;
        });
    }
}
