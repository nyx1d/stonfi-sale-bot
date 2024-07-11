from aiogram import types
from aiogram.dispatcher import FSMContext
from db import check_user
from keyboards import connect_buttons, start_menu


async def menu(call: types.CallbackQuery, state: FSMContext):
    await state.finish()

    if not check_user(call.from_user.id):
        await call.message.answer(text="Choose how to connect wallet",
                             reply_markup=connect_buttons())
        return

    await call.message.answer((f"Ready to work"),
                          reply_markup=start_menu(), disable_web_page_preview=True)
