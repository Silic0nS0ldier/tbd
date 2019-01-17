/**
 * Comparable to the Application class used in Android and Windows UWP apps.
 * 
 * This serves as a mechanism for connecting tools like redux and unistore without risking
 * conflicts in between applications via unique identifiers such that multiple different
 * applications can be hosted in the same environment with the same source files. You could quite
 * literally bundle 2 applications into one script if you wanted.
 * The concept for this system will also allow easy typed data stores with reduced overhead.
 */
export abstract class Application {
    /**
     * Stores custom data for tools to permit easy instance tied global states.
     */
    private store = new Map<string, any>();

    /**
     * Grab item from store.
     */
    getStoreItem(name: string): any {
        return this.store.get(name);
    }

    /**
     * Add item to store.
     */
    setStoreItem(name: string, data: any): void {
        this.store.set(name, data)
    }
}
