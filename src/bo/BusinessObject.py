from abc import ABC
from datetime import datetime


class BusinessObject(ABC):
    def __init__(self):
        """Basisklasse, die in allen anderen Klassen übernommen wird."""
        self._id = 0
        self._name = ""
        self._creation_date = datetime.now().isoformat()
        self._last_updated = self._creation_date

    def __str__(self):
        return str(self._id)

    def get_name(self):
        """Auslesen des Namens"""
        return self._name

    def get_id(self):
        """Auslesen der ID"""
        return self._id

    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self._creation_date

    def get_last_updated(self):
        """Auslesen des Datums der letzten Änderung"""
        return self._last_updated

    def set_name(self, name):
        """Setzen des Namens"""
        self._name = name

    def set_id(self, value):
        """Setzen der ID"""
        self._id = value

    def set_creation_date(self, creation_date):
        """Setzen des Erstelldatums"""
        self._creation_date = creation_date

    def set_last_updated(self, last_updated):
        """Setzen des Datums der letzten Änderung"""
        self._last_updated = last_updated

    @staticmethod
    def date_format(date_string):
        if date_string is not None:
            return datetime.fromisoformat(date_string.replace("Z", ""))
        return None