from abc import ABC
from datetime import datetime


class BusinessObject(ABC):
    def __init__(self):
        """Basisklasse, die in allen anderen Klassen übernommen wird."""
        self._id = 0
        self._name = ""
        self._creation_date = datetime.now()
        self._last_updated = self._creation_date

    def __str__(self):
        return str(self._id)

    def get_name(self):
        return self._name

    def get_id(self):
        return self._id

    def get_creation_date(self):
        return self._creation_date

    def get_last_updated(self):
        return self._last_updated

    def set_name(self, name):
        self._name = name

    def set_id(self, value):
        self._id = value

    def set_creation_date(self, creation_date):
        self._creation_date = creation_date

    def set_last_updated(self, last_updated):
        self._last_updated = last_updated
