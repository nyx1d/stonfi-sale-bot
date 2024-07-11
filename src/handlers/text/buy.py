from aiogram import types
from aiogram.dispatcher import FSMContext
from pytonconnect import TonConnect
from pytonconnect.storage import FileStorage
from pytoniq import LiteBalancer
from keyboards import menu
from db import get_user_address
from config import CONNECT_URL, network_config
import time
from tonsdk.utils import bytes_to_b64str, to_nano
from stonfi import RouterV1, PTON_V1_ADDRESS, JettonRoot
from pytonapi import Tonapi, AsyncTonapi
from tonsdk.boc import begin_cell
from tonsdk.contract.wallet import Wallets, WalletVersionEnum


def get_raw_address(address):
    client = Tonapi(api_key='AFSG42B6LBDRWYIAAAAOHE7ZWT3RFMQ4FMPAKTFZIUO76B6N23SXSPVDMCFM4VA6LKKEIUY')
    account = client.accounts.parse_address(address)
    return account.raw_form


async def get_ton_swap_amount(message: types.Message, state: FSMContext):
    await state.update_data(jetton_address=message.text)

    storage = FileStorage(f"connections/{message.from_user.id}.json")
    connector = TonConnect(CONNECT_URL, storage)

    try:
        is_connected = await connector.restore_connection()
        if not is_connected:
            print("Not connected")
            return

        stonfi = RouterV1()

        transaction = {
            "valid_until": (int(time.time()) + 900) * 1000,
            "messages": []
        }

        user_address = get_user_address(message.from_user.id)
        data = await state.get_data()

        TON = PTON_V1_ADDRESS
        JETTON = data["jetton_address"]
        RAWJETTONADDRESS = get_raw_address(JETTON)
        
        provider = LiteBalancer.from_config(config=network_config)

        try:
        
            await provider.start_up()
            
            swap_params = await stonfi.build_swap_ton_to_jetton_tx_params(
                user_wallet_address=user_address,
                ask_jetton_address=JETTON,
                offer_amount=int(float(0.01) * 1e9),
                min_ask_amount=1,
                provider=provider,
                proxy_ton_address=TON
            )
    
             
        
            transaction["messages"].append(
                {
                    "address": str(swap_params['to']),
                    "amount": str(swap_params['amount']),
                    "payload": bytes_to_b64str(swap_params['payload'].to_boc())
                }
            )

            await message.answer("Transaction sent",
                                reply_markup=menu())
            print('Transaction SENT')
    
            await connector.send_transaction(transaction)
            
            await provider.close_all()       
        
        except Exception as e:
            await message.answer(f"Ошибка: {e}",
                                reply_markup=menu())

    except Exception as e:
        await message.answer(f"Ошибка: {e}",
                                reply_markup=menu())
    
    await state.finish()
