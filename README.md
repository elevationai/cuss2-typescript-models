# CUSS2 TypeScript Models

TypeScript models generated from the CUSS2 OpenAPI specification.

## Overview

This library provides TypeScript types and interfaces generated from the CUSS2
OpenAPI specification, enabling type-safe development when working with CUSS2
APIs.

## Installation

```bash
deno add jsr:@cuss/cuss2-typescript-models
```

## Usage

```typescript
import {
  type AgreementTextType,
  type AssociationDataItemType,
  type BiometricProviderMessage,
} from "@cuss/cuss2-typescript-models";

// Use the generated types in your code
const message: BiometricProviderMessage = {
  biometricFunctionType: "ENROLL",
  // ...
};
```

## Development

### Prerequisites

- Deno 1.40+ installed
- Node.js (for npx @hey-api/openapi-ts)

### Building

Generate TypeScript models from the OpenAPI spec:

```bash
deno task build
```

This command:

1. Runs `npx @hey-api/openapi-ts` to generate types from `CUSS2-API.yaml`
2. Automatically removes unwanted `Cuss2*Domain` prefixes
3. Handles duplicate type definitions
4. Outputs clean types to `src/types.gen.ts`

### Cleaning

Remove generated files:

```bash
deno task clean
```

## Generated Files

- `src/types.gen.ts` - Main TypeScript definitions (auto-generated and cleaned)
- `src/index.ts` - Re-exports from types.gen.ts (auto-generated)
- `mod.ts` - Main library export

## Build Process

The build script automatically:

- Generates TypeScript models using `@hey-api/openapi-ts`
- Removes all `Cuss2*Domain` prefixes from type names
- Comments out duplicate type definitions to prevent conflicts
- Ensures clean, usable TypeScript types

## License

MIT
