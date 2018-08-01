// Builds distribution versions of this library.
// Outputs include CommonJS and ES Module versions plus development/debug and production.
// Production builds have all input checks removed for APIs that user data won't touch.

console.log(`
<<packagename>> Build Tool
==========================
This build tool will generate builds;
 - CJS with development checks
 - CJS without development checks
 - ESM with development checks
 - ESM without development checks
`);

const ts = require("typescript");
const ms = require("metascript");
const fs = require("fs");

let PRODUCTION;
const host = (() => {
    const baseHost = ts.createCompilerHost({}, false);
    baseHost.readFile = (fileName) => {
        if (fileName.startsWith("src")) {
            return ms.transform(ts.sys.readFile(fileName), fileName, {
                PRODUCTION
            });
        } else {
            return ts.sys.readFile(fileName);
        }
    };
    baseHost.getSourceFile = (fileName, languageVersion, onError) => {
        const sourceText = baseHost.readFile(fileName);
        return sourceText !== undefined
            ? ts.createSourceFile(fileName, sourceText, languageVersion)
            : undefined;
    };

    return baseHost;
})();
const options = (() => {
    const tsConfig = require("./tsconfig.json");
    return tsConfig.compilerOptions;
})();
const files = (() => {
    let files = [];
    fs.readdirSync("./src").forEach((value, index) => {
        if (!value.endsWith(".test.ts")) files.push("src/" + value);
    });
    return files;
})();

function compile(fileNames, options) {
    const prog = ts.createProgram(fileNames, options, host);
    prog.emit();
}

console.log("Starting...");

// Remove dist
require("rimraf").sync("./dist");

// Build CommonJS builds
console.log("CommonJS Builds...");
console.log("  Development");
PRODUCTION = false;
compile(files, Object.assign({}, options, {
    outDir: "./dist/cjs/dev",
    module: "commonjs"
}));
console.log("  Production");
PRODUCTION = true;
compile(files, Object.assign({}, options, {
    outDir: "./dist/cjs/prod"
}));

// Builds ES Modules builds
console.log("\nES Modules Builds...");
console.log("  Development");
PRODUCTION = false;
compile(files, Object.assign({}, options, {
    outDir: "./dist/esm/prod"
}));
console.log("  Production");
PRODUCTION = true;
compile(files, Object.assign({}, options, {
    outDir: "./dist/esm/prod"
}));

console.log("\nComplete\n");
