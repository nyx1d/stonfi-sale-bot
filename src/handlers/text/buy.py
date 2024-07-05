from aiogram import types
from aiogram.dispatcher import FSMContext
from pytonconnect import TonConnect
from pytonconnect.storage import FileStorage
from pytoniq import LiteBalancer
from keyboards import menu
from db import get_user_address
from config import CONNECT_URL, network_config
import TonTools
import toncenter
from pytoniq_core import Address
import requests

import time
from tonsdk.utils import bytes_to_b64str
from stonfi import RouterV1, PTON_V1_ADDRESS

async def get_buy_jetton_address(message: types.Message, state: FSMContext):
    await state.update_data(jetton_address=message.text)
    await message.answer("Routing address - 0, Ton Swap Amount - 0.01 TON")
    await state.set_state("get_ton_swap_amount")

async def get_buy_routing_address(message: types.Message, state: FSMContext):
    await state.update_data(routing_address=0)
    await message.answer("Ton Swap Amount - 0.01 TON")
    await state.set_state("get_ton_swap_amount")

async def get_raw_address(userFriendlyAddress):
    return userFriendlyAddress.to_str(is_user_friendly=False)

async def get_ton_swap_amount(message: types.Message, state: FSMContext):
    storage = FileStorage(f"connections/{message.from_user.id}.json")
    connector = TonConnect(CONNECT_URL, storage)

    try:
        is_connected = await connector.restore_connection()
        if not is_connected:
            print("Not connected")
            return

        #client = TonCenterClient(api_key)
        stonfi = RouterV1()

        transaction = {
            "valid_until": (int(time.time()) + 900) * 1000,
            "messages": []
        }

        user_address = get_user_address(message.from_user.id)
        data = await state.get_data()

        TON = PTON_V1_ADDRESS
        JETTON = data["jetton_address"]

        # do check for jetton address sum
        BASE_URL = 'https://api.ston.fi/v1/pools/' + JETTON
        response = requests.get(BASE_URL)
        print(response.json())

        provider = LiteBalancer.from_config(config=network_config, trust_level=2, timeout=15)
        await provider.start_up()
            
        swap_params = await stonfi.build_swap_ton_to_jetton_tx_params(
            user_wallet_address=user_address,
            ask_jetton_address=JETTON,
            offer_amount=int(float(0.01) * 1e9),
            min_ask_amount=1,
            provider=provider,
            proxy_ton_address=TON
        )
            
        await provider.close_all()        
        
        transaction["messages"].append(
            {
                "address": str(swap_params['to']),
                "amount": str(swap_params['amount']),
                "payload": bytes_to_b64str(swap_params['payload'].to_boc())
            }
        )

        await message.answer("Confirm transaction")

        await connector.send_transaction(transaction)
        await message.answer("Success!",
                                reply_markup=menu())

    except Exception as e:
        await message.answer(f"Error: {e}",
                                reply_markup=menu())
    
    await state.finish()
