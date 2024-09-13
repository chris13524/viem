export const abi = [
    {
        "type": "function",
        "name": "execute",
        "inputs": [
            {
                "name": "calls",
                "type": "tuple[]",
                "components": [
                    {
                        "name": "data",
                        "type": "bytes",
                    },
                    {
                        "name": "to",
                        "type": "address",
                    },
                    {
                        "name": "value",
                        "type": "uint256",
                    }
                ]
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
] as const

export const contractAddress = '0x6482485cf03Dd08406CDFBB7f9c362045747f235'
