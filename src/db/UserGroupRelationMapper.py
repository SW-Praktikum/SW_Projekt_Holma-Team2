from bo.Group import Group
from bo.User import User
from db.Mapper import Mapper


class UserGroupRelationMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        pass

    def find_by_name(self, name):
        pass

    def find_by_id(self, id):
        pass

    def find_groups_by_user_id(self, user_id):
        cursor = self._connection.cursor()
        command = "SELECT user_group_relation.group_id, holma.group.name, " \
                  "holma.group.creation_date, holma.group.owner, holma.group.last_updated " \
                  "FROM user_group_relation INNER JOIN holma.group ON user_group_relation.group_id=group.group_id " \
                  "WHERE user_group_relation.user_id ={}".format(user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Group.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_users_by_group_id(self, group_id):
        cursor = self._connection.cursor()
        command = "SELECT user_group_relation.user_id, " \
                  "user.name, user.creation_date, user.email, user.google_id, user.last_updated " \
                  "FROM user_group_relation INNER JOIN user ON user_group_relation.user_id=user.user_id " \
                  "WHERE user_group_relation.group_id ={}".format(group_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = User.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def add_user_to_group(self, group, user):
        cursor = self._connection.cursor()
        command = "INSERT INTO holma.user_group_relation (group_id, user_id) VALUES ({}, {})".format(group.get_id(),
                                                                                                     user.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def remove_user_from_group(self, group, user):
        cursor = self._connection.cursor()
        command = "DELETE FROM holma.user_group_relation WHERE group_id={} and user_id={}".format(group.get_id(),
                                                                                                  user.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_user_relations(self, user):
        cursor = self._connection.cursor()
        command = "DELETE FROM holma.user_group_relation WHERE user_id={}".format(user.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_group_relations(self, group):
        cursor = self._connection.cursor()
        command = "DELETE FROM holma.user_group_relation WHERE group_id={}".format(group.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if __name__ == "__main__":
    with UserGroupRelationMapper() as mapper:
        print("All groups where user #28 is part of:")
        groups = mapper.find_groups_by_user_id(28)
        for group in groups:
            print(group)

        print("All users in group #1:")
        users = mapper.find_users_by_group_id(1)
        for user in users:
            print(user)
