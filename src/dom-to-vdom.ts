import { VNode } from "./vnode";

/**
 * Creates a VNode tree representing the provided element.
 * @param element 
 */
export function domToVdom(element: HTMLElement): VNode | string {
    //? if (!PRODUCTION) {
    // Ensure node actually exists
    if (element === undefined) {
        throw new Error("Provided element does not exist.");
    }
    //? }
    return processToVNode(element);
}

/**
 * Creates a virtual copy of the provided Node.
 * @param node 
 */
function processToVNode(node: Node): VNode | string {
    // Node type handling is ordered to ensure statistically more likely nodes
    // get handled first, thereby reducing processing.

    // Element node
    if (node.nodeType === node.ELEMENT_NODE) {
        // Attributes
        let attributes = new Map<string, string>();
        for (const attr of (<HTMLElement>node).attributes) {
            attributes.set(attr.name, attr.value);
        }

        // Create VNode
        const vnode: VNode = new VNode((<HTMLElement>node).tagName, attributes)

        // Children
        for (let child of node.childNodes) {
            vnode.children.push(processToVNode(child));
        }

        // All done
        return vnode;
    }

    // Text node (nodeValue can be null technically)
    if (node.nodeType === node.TEXT_NODE && node.nodeValue) return node.nodeValue;

    // Unsupported types
    let error = "An unsupported node was encountered while parsing the DOM. \nnodeType: " + node.nodeType;

    //? if (!PRODUCTION) {
    switch (node.nodeType) {
        case node.ATTRIBUTE_NODE: error += " - Attribute"
        case node.CDATA_SECTION_NODE: error += " - CDATA Section"
        case node.ENTITY_REFERENCE_NODE: error += " - Entity Reference"
        case node.ENTITY_NODE: error += " - Entity"
        case node.PROCESSING_INSTRUCTION_NODE: error += " - Processing Instruction"
        case node.COMMENT_NODE: error += " - Comment"
        case node.DOCUMENT_NODE: error += " - Document"
        case node.DOCUMENT_TYPE_NODE: error += " - Document Type"
        case node.DOCUMENT_FRAGMENT_NODE: error += " - Document Fragement"
        case node.NOTATION_NODE:  error += " - Notation"
    }
    //? }

    throw new Error(error);
}