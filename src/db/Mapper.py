from abc import ABC, abstractmethod
from contextlib import AbstractContextManager

import mysql.connector
import os


class Mapper(AbstractContextManager, ABC):

    def __init__(self):
        self._connection = None

    def __enter__(self):
        if os.getenv('GAE_ENV', '').startswith('standard'):
            self._connection = self._connection = mysql.connector.connect(
                unix_socket='/cloudsql/holma-sw-praktikum:europe-west3:holma-db',
                user="root",
                passwd="root",
                database="holma"
                )
        else:
            self._connection = self._connection = mysql.connector.connect(
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
