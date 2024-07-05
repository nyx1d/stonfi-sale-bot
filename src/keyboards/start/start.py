from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup

def menu():
    return InlineKeyboardMarkup().add(InlineKeyboardButton(text="Available options", callback_data="menu"))
                                     
def start_menu():
    keyboard = InlineKeyboardMarkup(row_width=2)
    buttons = [InlineKeyboardButton(text="Buy jetton", callback_data="buy_jetton"),
               #InlineKeyboardButton(text="Sell jetton", callback_data="sell_jetton"),
               InlineKeyboardButton(text="Disconnect wallet", callback_data="disconnect")]

    keyboard.add(*buttons)

    return keyboard

def connect_buttons():
    return InlineKeyboardMarkup().add(InlineKeyboardButton(text="Tonkeeper", callback_data="tonkeeper_button")).add(InlineKeyboardButton(text="TonHub", callback_data="tonhub_button"))
