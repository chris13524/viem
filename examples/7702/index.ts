import { createWalletClient, http } from 'viem'
import { anvil } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import { eip7702Actions } from 'viem/experimental'

// Generated with https://www.ethereumaddressgenerator.com/
export const account = privateKeyToAccount('0xe205ab858df9ebd5a90b48c55002b680ab26da33285e8207b71b7f47489ccd7d')
console.log(account.address)
// cast rpc anvil_setBalance 0xd0eE455725599bF032bfE9da1dA3923DeC2918C3 10000000000000000

// FIX by bumping the nonce: cast rpc anvil_setNonce 0xd0eE455725599bF032bfE9da1dA3923DeC2918C3 1

export const walletClient = createWalletClient({
    account,
    chain: anvil,
    transport: http(),
}).extend(eip7702Actions())


import { getContract, parseEther } from 'viem'
import { abi, contractAddress } from './contract'

// 1. Set up a Contract Instance pointing to our Account.
const batchCallInvoker = getContract({
    abi,
    address: walletClient.account.address,
    client: walletClient,
})

// 2. Authorize injection of the Contract's bytecode into our Account.
const authorization = await walletClient.signAuthorization({
    contractAddress,
})

// 3. Invoke the Contract's `execute` function to perform batch calls.
const hash = await batchCallInvoker.write.execute([[{
    data: '0x',
    to: '0xcb98643b8786950F0461f3B0edf99D88F274574D',
    value: parseEther('0.001'),
}, {
    data: '0x',
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.002'),
}]], {
    authorizationList: [authorization],
    //                  ↑ 4. Pass the Authorization as an option.
})

export default hash;
