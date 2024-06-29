from redis import Redis

from ._interface import IStorage


class RedisStorage(IStorage):

    _redis: Redis
    _id: int

    def __init__(self, redis: Redis, id: int):
        self._redis = redis
        self._id = id

    async def set_item(self, key: str, value: str):
        self._redis.set(key + self._id, value)

    async def get_item(self, key: str, default_value: str = None):
        return self._redis.get(key + self._id) or default_value

    async def remove_item(self, key: str):
        self._redis.delete(key + self._id)
