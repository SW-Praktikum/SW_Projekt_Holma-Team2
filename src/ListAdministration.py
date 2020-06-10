from datetime import datetime

from bo.Group import Group
from bo.ShoppingList import ShoppingList
from bo.User import User
from db.GroupMapper import GroupMapper
from db.UserGroupRelationsMapper import UserGroupRelationMapper
from db.UserMapper import UserMapper


class Administration():
    """User"""

    def get_all_users(self):
        with UserMapper() as mapper:
            return mapper.find_all()

    def get_user_by_name(self, name):
        with UserMapper() as mapper:
            return mapper.find_by_name(name)

    def get_user_by_id(self, user_id):
        with UserMapper() as mapper:
            return mapper.find_by_id(user_id)

    def get_groups_by_user_id(self, user_id):
        with UserGroupRelationMapper() as mapper:
            return mapper.find_groups_by_user_id(user_id)

    def get_list_entries_by_user_id(self, user_id):
        # with GroupMapper() as mapper:
        #    return mapper.find_by_member_id(user.get_id())
        pass

    def create_user(self, name, email, google_id):
        user = User()
        user.set_id(0)
        user.set_name(name)
        user.set_email(email)
        user.set_google_id(google_id)
        with UserMapper() as mapper:
            mapper.insert(user)

    def delete_user(self, user):
        with UserGroupRelationMapper() as mapper:
            mapper.delete_user_relations(user.get_id())

        with UserMapper() as mapper:
            mapper.delete(user)

    def save_user(self, user):
        user.set_last_updated(datetime.now())
        with UserMapper() as mapper:
            mapper.update(user)

    """Gruppe"""

    def get_all_groups(self):
        with GroupMapper() as mapper:
            return mapper.find_all()

    def get_group_by_id(self, group_id):
        with GroupMapper() as mapper:
            return mapper.find_by_id(group_id)

    def get_groups_by_name(self, name):
        with GroupMapper() as mapper:
            return mapper.find_by_name(name)

    def get_members_by_group_id(self, group_id):
        with UserGroupRelationMapper() as mapper:
            return mapper.find_users_by_group_id(group_id)

    def get_articles_by_group_id(self, group_id):
        pass

    def get_shopping_lists_by_group_id(self, group_id):
        pass

    def get_standardarticles_by_group_id(self, group_id):
        pass

    def add_member_to_group(self, group, user):
        with UserGroupRelationMapper() as mapper:
            mapper.add_user_to_group(group, user)
        pass

    def remove_member_from_group(self, group, user):
        with UserGroupRelationMapper() as mapper:
            mapper.remove_user_from_group(group, user)

    def add_standardarticle_to_group(self, group, list_entry):
        pass

    def remove_standardarticle_from_group(self, group, list_entry):
        pass

    def create_group(self, name, user_id):
        group = Group()
        group.set_id(0)
        group.set_name(name)
        group.set_owner(user_id)
        with GroupMapper() as mapper:
            return mapper.insert(group)

    def delete_group(self, group):
        with UserGroupRelationMapper() as mapper:
            mapper.delete_group_relations(group)

        with GroupMapper() as mapper:
            mapper.delete(group)

    def save_group(self, group):
        group.set_last_updated(datetime.now())
        with GroupMapper() as mapper:
            mapper.update(group)

    """ eventuell reichen die delete-methoden der objekte selbst"

    def add_article_to_group(self, group, article):
        pass

    def remove_article_from_group(self, group, article):
        pass

    def remove_shopping_list_from_group(self, group, shopping_list):
        pass

    """

    """Artikel"""

    def get_article_by_id(self, article_id):
        pass

    def get_article_by_name(self, name):
        pass

    def create_article(self, name, group_id):
        # with ArticleMapper() as mapper:
        #   return mapper.insert(article)
        pass

    def delete_article(self, article):
        pass

    def save_article(self, article):
        pass

    """Listeintrag"""

    def get_all_list_entries(self):
        pass

    def get_list_entry_by_id(self, list_entry_id):
        pass

    def create_list_entry(self, article_id, amount, unit, retailer_id, purchasing_user_id, shopping_list_id):

        pass

    def delete_list_entry(self, list_entry):
        pass

    def save_list_entry(self, list_entry):
        pass

    """Einkaufsliste"""

    def get_shopping_list_by_id(self, shopping_list_id):
        pass

    def get_shopping_list_by_name(self, name):
        pass

    def get_list_entries_by_shopping_list_id(self, shopping_list_id):
        pass

    def get_list_entries_checked_by_shopping_list_id(self, shopping_list_id):
        list_entries_checked = []
        list_entries = self.get_list_entries_by_shopping_list_id(shopping_list_id)
        for list_entry in list_entries:
            if list_entry.is_checked():
                list_entries_checked.append(list_entry)
        return list_entries_checked

    def add_list_entry_to_shopping_list(self, shopping_list, list_entry):
        pass

    def delete_list_entry_from_shopping_list(self, shopping_list, list_entry):
        pass

    def create_shopping_list(self, name, group_id):
        shopping_list = ShoppingList()
        shopping_list.set_id(1)
        shopping_list.set_name(name)
        shopping_list.set_group(group_id)
        return shopping_list

    def delete_shopping_list(self, shopping_list):
        pass

    def save_shopping_list(self, shopping_list):
        pass

    """Retailer"""

    def get_all_retailers(self):
        pass

    def get_retailer_by_id(self, retailer_id):
        pass

    def get_retailers_by_name(self, name):
        pass

    def create_retailer(self, name):
        pass

    def delete_retailer(self, retailer):
        pass

    def save_retailer(self, retailer):
        pass


class StatisticAdministration(object):
    def __init__(self):
        pass

    def get_all_articles(self):
        pass

    def get_all_list_entries(self):
        pass

    def get_list_entries_by_retailer_id(self, retailer_id):
        pass

    def get_list_entries_in_time_period(self, start_date, end_date):
        pass

    def get_list_entries_by_article_id(self, article_id):
        pass
