from bo.Article import Article
from db.Mapper import Mapper


class ArticleMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.article"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Article.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.article WHERE article_id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Article.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.article WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Article.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_group(self, group_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.article WHERE group_id={}".format(group_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Article.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result


    def insert(self, article):
        cursor = self._connection.cursor()
        command = "INSERT INTO holma.article (article_id, name, creation_date, group, last_updated) VALUES ({},{},{},{},{})"
        data = (article.get_id(),
                article.get_name(),
                article.get_creation_date(),
                article.get_group(),
                article.get_last_updated())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        article.set_id(cursor.lastrowid)
        return article

    def update(self, article):

        cursor = self._connection.cursor()
        command = "UPDATE holma.article SET name={}, group={}, last_updated={}  WHERE article_id={}"
        data = (article.get_name(),
                article.get_group(),
                article.get_last_updated(),
                article.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return article

    def delete(self, article):

        cursor = self._connection.cursor()

        command = "DELETE FROM holma.article WHERE article_id={}".format(article.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if __name__ == "__main__":
    with ArticleMapper() as mapper:
        result = mapper.find_by_group(1)
        for article in result:
            print(article)



