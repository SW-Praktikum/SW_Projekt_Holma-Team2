from abc import ABC, abstractmethod
from contextlib import AbstractContextManager

import mysql.connector


class Mapper(AbstractContextManager, ABC):

    def __init__(self):
        self._connection = None

    def __enter__(self):
        """
        Hier exestiert bisher nur der connect zur lokalen DB.
        """

        self._connection = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="root",
            database="holma"
        )
        return self

    def __exit__(self, exc_type, value, traceback):
        self._connection.close()

    @abstractmethod
    def find_all(self):
        pass

    @abstractmethod
    def find_by_id(self, id):
        pass

    @abstractmethod
    def find_by_name(self, name):
        pass

    @abstractmethod
    def insert(self, object):
        pass

    @abstractmethod
    def update(self, object):
        pass

    @abstractmethod
    def delete(self, object):
        pass
