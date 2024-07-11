"""
You'll need a library for message construction,
such as tonsdk. Below is an example code you can use.
To use the tonsdk library, make sure to install it using pip:

pip install tonsdk
"""

import asyncio

from tonsdk.boc import begin_cell

from pytonapi import AsyncTonapi
from tonsdk.utils import bytes_to_b64str, to_nano
from tonsdk.contract.wallet import Wallets, WalletVersionEnum

# Tonapi Key
API_KEY = "AFSG42B6LBDRWYIAAAAOHE7ZWT3RFMQ4FMPAKTFZIUO76B6N23SXSPVDMCFM4VA6LKKEIUY"

# Wallet Mnemonics
MNEMONICS = "include trash judge peanut wreck always portion found example man orange dial trial carry carbon outer situate share advice fold weasel scorpion practice home"

# Destination Address
DESTINATION_ADDRESS = "EQD10aHFdztP_YTakItyudXgjI7WRTdOSpKNqSXpV3agop5H"


async def main():
    # Initialize AsyncTonapi with the provided API key and set it to use the testnet or mainnet
    tonapi = AsyncTonapi(api_key=API_KEY, is_testnet=True)

    # Create a wallet from the provided mnemonics
    mnemonics_list = MNEMONICS.split(" ")
    _mnemonics, _pub_k, _priv_k, wallet = Wallets.from_mnemonics(
        mnemonics_list,
        WalletVersionEnum.v4r2,  # Set the version of the wallet
        0,
    )

    # Get the sequence number of the wallet's current state
    method_result = await tonapi.blockchain.execute_get_method(
        wallet.address.to_string(False), "seqno"
    )
    seqno = int(method_result.decoded.get("state", 0))

    # Prepare a transfer message to the destination address with the specified amount and sequence number
    transfer_amount = to_nano(float("0.01"), 'ton')

    # Create the comment payload
    payload = begin_cell().store_uint(0, 32).store_string("Hello World!").end_cell()

    query = wallet.create_transfer_message(
        to_addr=DESTINATION_ADDRESS,
        amount=transfer_amount,
        payload=payload,
        seqno=seqno,
    )

    # Convert the message to Base64 and send it through the Tonapi blockchain
    message_boc = bytes_to_b64str(query["message"].to_boc(False))
    data = {'boc': message_boc}
    await tonapi.blockchain.send_message(data)