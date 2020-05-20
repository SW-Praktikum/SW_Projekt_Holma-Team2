from abc import ABC
import time
import random


class BusinessObject(ABC):
    def __init__(self):
        """Basisklasse, die in allen anderen Klassen übernommen wird."""
        self._name = ""
        self._id = random.randint(1, 1000)
        self._creation_date = int(time.time())

    def __str__(self):
        return str(self._id)

    def get_name(self):
        return self._name

    def get_id(self):
        return self._id

    def get_creation_date(self):
        return self._creation_date

    def set_name(self, name):
        self._name = name

    def set_id(self, value):
        self._id = value