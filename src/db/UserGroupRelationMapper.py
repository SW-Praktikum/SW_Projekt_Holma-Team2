from bo.Group import Group
from bo.User import User
from db.Mapper import Mapper


class UserGroupRelationMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_groups_by_user_id(self, user_id):
        cursor = self._connection.cursor()
        command = "SELECT user_group_relation.group_id, user_group_relation.user_id, " \
                  "holma.group.name, holma.group.creation_date, holma.group.owner, holma.group.last_updated " \
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
        command = "SELECT user_group_relation.group_id, user_group_relation.user_id, " \
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
        pass

    def remove_user_from_group(self, group, user):
        pass

    def delete_user_relations(self, user):
        pass

    def delete_group_relations(self, group):
        pass


if __name__ == "__main__":
    with UserGroupRelationMapper() as mapper:
        print("All groups where User #28 is part of:")
        groups = mapper.find_groups_by_user_id(28)
        for group in groups:
            print(group)

        print("All users in group #1:")
        users = mapper.find_users_by_group_id(1)
        for user in users:
            print(user)
