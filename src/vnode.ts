import { Component } from "./component";

/**
 * Virtual DOM Node
 */
export class VNode {
    /**
     * The string of the DOM node to create or Component constructor to render.
     */
    public nameOrComponent: string | Component

    /**
     * The children of node
     */
    public children: (VNode | string)[] = [];

    /**
     * The properties of this VNode
     */
    public attributes: Map<string, any>;

    /**
     *
     */
    constructor(nameOrComponent: string | Component, attributes?: Map<string, any>) {
        this.nameOrComponent = nameOrComponent;
        this.attributes = attributes || new Map();
    }
}