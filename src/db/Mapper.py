import mysql.connector
from abc import ABC, abstractmethod
from contextlib import AbstractContextManager


class Mapper (AbstractContextManager, ABC):

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

        print(type(self._connection))

        return self

    def __exit__(self, exc_type, value, traceback):
        self._connection.close()

    @abstractmethod
    def find_all(self):
        pass

    """
    Weitere Methoden folgen. Teste momentan noch mit dem Insert in den jeweiligen Mapper-Klassen herum.
    """

# mycursor.execute("CREATE TABLE Person (name VARCHAR(50), email NVARCHAR(255), creation_date TIME, personID int PRIMARY KEY AUTO_INCREMENT)")

# sql1 = "INSERT INTO person (name, email) VALUES (%s, %s)"
# data1 = ("Dominik", "dk108@hdm-stuttgart.de")

# mycursor.execute(sql1, data1)
# db.commit()


