from bo.Retailer import Retailer
from db.Mapper import Mapper


class RetailerMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.retailer"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Retailer.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.retailer WHERE retailer_id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Retailer.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        if len(result) == 0:
            return None
        return result[0]

    def find_by_name(self, name):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.retailer WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Retailer.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, retailer):
        cursor = self._connection.cursor()
        command = "INSERT INTO holma.retailer (retailer_id, name, creation_date, last_updated) VALUES (%s,%s,%s," \
                  "%s)"
        data = (retailer.get_id(),
                retailer.get_name(),
                retailer.get_creation_date(),
                retailer.get_last_updated())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        retailer.set_id(cursor.lastrowid)
        return retailer

    def update(self, retailer):
        cursor = self._connection.cursor()
        command = "UPDATE holma.retailer SET name=%s, last_updated=%s  WHERE retailer_id=%s"
        data = (retailer.get_name(), retailer.get_last_updated(), retailer.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return retailer

    def delete(self, retailer):
        cursor = self._connection.cursor()
        command = "DELETE FROM holma.retailer WHERE retailer_id={}".format(retailer.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if __name__ == "__main__":
    with RetailerMapper() as mapper:
        result = mapper.find_all()
        for retailer in result:
            print(retailer)
