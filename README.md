# ts-result-type
Result type - inspired by Rust's Result type

This `Result` module offers a mechanism for error handling using the `Result` type, an effective pattern popular in languages like Rust. This module introduces two main constructs, `Ok` and `Err`, for expressive error handling without exceptions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [License](#license)

## Installation

```
npm install ts-result-type
```

```
pnpm add ts-result-type
```

```
yarn add ts-result-type
```

## Usage

To represent a successful computation:

```typescript
import type { Result } from 'ts-result-type'
import { Ok, Err } from 'ts-result-type'

const result = Ok(5)
console.log(result.isOk) // true
```

**Examples:**

- **match**: Process the value if it's an `Ok`.

```typescript
const result = Ok(5)
const output = result.match(value => value * 2, _ => 0)
console.log(output) // 10
```

- **getValueOrDefault**: Get the contained value or a default.

```typescript
const result = Ok(5)
console.log(result.getValueOrDefault(10)) // 5
```

- **getValueOrCompute**: Get the contained value or a default.

```typescript
const result: Result<number, string> = Err("400")
console.log(result.getValueOrCompute(err => +err)) // 400
```

- **map**: Transform the value inside an `Ok`.

```typescript
const result = Ok(5)
const transformed = result.map(value => value.toString())
console.log(transformed.match(val => val, _ => "")) // "5"
```

- **mapErr**: Transform the error inside an `Err`.

```typescript
const errorResult = Err('Error!')
const transformed = errorResult.mapErr(error => error.length)
console.log(transformed.match(_ => 0, errorLength => errorLength)) // 6
```

## Testing

To run tests:

```
npm run test
```

## License

This project is licensed under the MIT License. See [LICENSE.md](path_to_license.md) for more details.