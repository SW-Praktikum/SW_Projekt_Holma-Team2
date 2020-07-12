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

    def find_by_id(self, article_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.article " \
                  "WHERE article_id={}".format(article_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Article.from_tuples(tuples)
        
        self._connection.commit()
        cursor.close()
        return result

    def find_by_name(self, name):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.article WHERE name LIKE '{}' " \
                  "ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Article.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_group(self, group_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.article " \
                  "WHERE group_id={}".format(group_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Article.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, article):
        cursor = self._connection.cursor()
        command = "INSERT INTO holma.article (article_id, creation_date, " \
                  "group_id, last_updated, name) VALUES (%s, %s, %s, %s, %s)"

        data = (article.get_id(),
                article.get_creation_date(),
                article.get_group(),
                article.get_last_updated(),
                article.get_name())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        article.set_id(cursor.lastrowid)
        return article

    def update(self, article):
        cursor = self._connection.cursor()
        command = "UPDATE holma.article SET name=%s, group_id=%s, " \
                  "last_updated=%s WHERE article_id=%s"
        data = (article.get_name(),
                article.get_group(),
                article.get_last_updated(),
                article.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return article

    def delete(self, article_id):
        cursor = self._connection.cursor()

        command = "DELETE FROM holma.article " \
                  "WHERE article_id={}".format(article_id)
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_by_group(self, group):
        cursor = self._connection.cursor()

        command = "DELETE FROM holma.article " \
                  "WHERE group_id={}".format(group.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

if __name__ == "__main__":
    with ArticleMapper() as mapper:
        result = mapper.find_all()
        for article in result:
            print(article)
