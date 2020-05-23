from abc import ABC
import time


class BusinessObject(ABC):
    def __init__(self):
        """Basisklasse, die in allen anderen Klassen übernommen wird."""
        self._id = 0
        self._name = ""
        self._creation_date = time.time()

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