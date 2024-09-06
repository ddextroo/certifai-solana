/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/certifai.json`.
 */
export type Certifai = {
  "address": "4ZV9Raw5ZQy2pJpUqiHRr1DMWw2fr4J7yfJjus8gAtGK",
  "metadata": {
    "name": "certifai",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createEntry",
      "discriminator": [
        248,
        207,
        142,
        242,
        66,
        162,
        150,
        16
      ],
      "accounts": [
        {
          "name": "userEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "emailAddress"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "firstName",
          "type": "string"
        },
        {
          "name": "lastName",
          "type": "string"
        },
        {
          "name": "emailAddress",
          "type": "string"
        },
        {
          "name": "schoolName",
          "type": "string"
        },
        {
          "name": "userRole",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteEntry",
      "discriminator": [
        227,
        198,
        83,
        191,
        70,
        23,
        194,
        58
      ],
      "accounts": [
        {
          "name": "userEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "emailAddress"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "emailAddress",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateEntry",
      "discriminator": [
        70,
        47,
        181,
        2,
        1,
        40,
        2,
        92
      ],
      "accounts": [
        {
          "name": "userEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "emailAddress"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "firstName",
          "type": "string"
        },
        {
          "name": "lastName",
          "type": "string"
        },
        {
          "name": "emailAddress",
          "type": "string"
        },
        {
          "name": "schoolName",
          "type": "string"
        },
        {
          "name": "userRole",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userEntryState",
      "discriminator": [
        130,
        11,
        33,
        100,
        128,
        234,
        153,
        229
      ]
    }
  ],
  "types": [
    {
      "name": "userEntryState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "firstName",
            "type": "string"
          },
          {
            "name": "lastName",
            "type": "string"
          },
          {
            "name": "emailAddress",
            "type": "string"
          },
          {
            "name": "schoolName",
            "type": "string"
          },
          {
            "name": "userRole",
            "type": "string"
          }
        ]
      }
    }
  ]
};
