from aiogram import types
from aiogram.dispatcher import FSMContext
from pytonconnect import TonConnect
from pytonconnect.storage import FileStorage
from pytoniq import LiteBalancer
from keyboards import menu
from db import get_user_address
from config import CONNECT_URL, network_config
import time
from tonsdk.utils import bytes_to_b64str
from dedust import Asset, Factory, PoolType, SwapParams, VaultNative, SwapStep
from stonfi import JettonRoot, JettonWallet, RouterV1, PoolV1, pTON_V1, ROUTER_V1_ADDRESS, PTON_V1_ADDRESS, LP_ACCOUNT_V1_ADDRESS


async def get_buy_jetton_address(message: types.Message, state: FSMContext):
    await state.update_data(jetton_address=message.text)
    await message.answer("Введите адрес роутинг жетона(0 - если без роутинг адреса)",
                         reply_markup=menu())
    await state.set_state("get_buy_routing_address")

async def get_buy_routing_address(message: types.Message, state: FSMContext):
    await state.update_data(routing_address=message.text)
    await message.answer("Введите сумму обмена(в TON)",
                         reply_markup=menu())
    await state.set_state("get_ton_swap_amount")

async def get_ton_swap_amount(message: types.Message, state: FSMContext):
    storage = FileStorage(f"connections/{message.from_user.id}.json")
    connector = TonConnect(CONNECT_URL, storage)

    try:
        is_connected = await connector.restore_connection()
        if not is_connected:
            print("Not connected")
            return

        transaction = {
            "valid_until": (int(time.time()) + 900) * 1000,
            "messages": []
        }

        user_address = get_user_address(message.from_user.id)
        data = await state.get_data()


##################################################################################


        TON = PTON_V1_ADDRESS
        JETTON = JettonWallet(data["jetton_address"])

        swap_params = SwapParams(deadline=int(time.time() + 900 * 5),
                                recipient_address=user_address)
        _next = None
        provider = LiteBalancer.from_config(config=network_config)
        await provider.start_up()

        
        pool = await RouterV1.get_pool(self=RouterV1, jetton0=TON, jetton1=JETTON, provider=provider)
        await provider.close_all()


##################################################################################

        swap_body = VaultNative.create_swap_payload(amount=int(float(message.text) * 1e9),
                                                    pool_address=pool.address,
                                                    swap_params=swap_params,
                                                    _next=_next)

        #swap_body1 = RouterV1._build_swap(offer_amount=int(float(message.text) * 1e9),
        #                                  poo)

        transaction["messages"].append(
            {
                "address": "EQB3ncyBUTjZUA5EnFKR5_EnOMI9V1tTEAAPaiU71gc4TiUt",
                "amount": str(int((float(message.text) + 0.25)*1e9)),
                "payload": bytes_to_b64str(swap_body.to_boc(False))
            }
        )

        await message.answer("Теперь подтверди транзакцию")

        await connector.send_transaction(transaction)
        await message.answer("Успех!",
                                reply_markup=menu())

    except Exception as e:
        await message.answer(f"Ошибка: {e}",
                                reply_markup=menu())
    
    await state.finish()
