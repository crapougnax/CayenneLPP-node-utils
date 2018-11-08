# cpgx-cayennelpp

Node module to encode and decode Cayenne Low Power Payload

## Usage

```javascript

import { LPPEncoder } from  'cpgx-cayennelpp'

const encoder = new LPPEncoder()
encoder.addTemperature(99, 33.0)
const pl = encoder.getPayload().toString('base64')
```

```javascript

import { LPPDecoder } from  'cpgx-cayennelpp'

const decoder = new LPPEncoder(buffer)
decoder.decode()
const temperature1 = decoder.getChannel(1).temperature
```

## Test

```bash
npm test
```
