from aiogram import types
from db import check_user
from keyboards import connect_buttons, start_menu
import json


async def start(message: types.Message):
    if message.chat.type != "private":
        return

    if not check_user(message.from_user.id):
        await message.answer(text="Choose your wallet",
                             reply_markup=connect_buttons())
        return

    await message.answer((f"Ready to work."),
                          reply_markup=start_menu(), disable_web_page_preview=True)
