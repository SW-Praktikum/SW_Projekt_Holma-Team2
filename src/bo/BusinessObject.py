from abc import ABC
from datetime import datetime

class BusinessObject(ABC):
    def __init__(self):
        """Basisklasse, die in allen anderen Klassen übernommen wird."""
        self._id = 0
        self._name = ""
        self._creation_date = datetime.now()
        self._last_changed = None

    def __str__(self):
        return str(self._id)

    def get_name(self):
        return self._name

    def get_id(self):
        return self._id

    def get_creation_date(self):
        return self._creation_date

    def get_last_changed(self):
        return self._last_changed

    def set_name(self, name):
        self._name = name

    def set_id(self, value):
        self._id = value

    def set_last_updated(self, last_changed):
        self._last_changed = last_changed