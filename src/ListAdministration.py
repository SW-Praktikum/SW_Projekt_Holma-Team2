from bo.Article import Article
from bo.Group import Group
from bo.ListEntry import ListEntry
from bo.Retailer import Retailer
from bo.ShoppingList import ShoppingList
from bo.User import User


class Administration():

    # Useren

    def get_all_users(self):
        # with UserMapper() as mapper:
        #    return mapper.find_all()
        pass

    def get_user_by_id(self, user_id):
        # with UserMapper() as mapper:
        #    return mapper.find_by_id(user.get_id())
        pass

    def get_groups_by_user_id(self, user_id):
        # with GroupMapper() as mapper:
        #    return mapper.find_by_member_id(user.get_id())
        pass

    def get_list_entries_by_user_id(self, user_id):
        # with GroupMapper() as mapper:
        #    return mapper.find_by_member_id(user.get_id())
        pass

    def create_user(self, user):
        # user = User()
        # user.set_id(1)
        # user.set_name(name)
        # user.set_email(email)
        # user.set_google_id(google_id)
        # with UserMapper() as mapper:
        #   mapper.insert(user)
        pass

    def delete_user(self, user_id):
        # with UserMapper() as mapper:
        #   groups = self.get_groups_of_user(user)
        #   if not (groups is None):
        #       for group in groups:
        #           group.delete_member(user)
        #   mapper.delete(user)
        pass

    def save_user(self, user):
        # with UserMapper() as mapper:
        #   mapper.update(user)
        pass

    # Gruppe

    def get_all_groups(self):
        pass

    def get_group_by_id(self, group_id):
        pass

    def get_members_by_group_id(self, group_id):
        pass

    def get_articles_by_group_id(self, group_id):
        pass

    def get_shopping_lists_by_group_id(self, group_id):
        pass

    def get_standardarticles_by_group_id(self, group_id):
        pass

    def add_member_to_group(self, group_id, user_id):
        pass

    def delete_member_from_group(self, group_id, user_id):
        pass

    def add_article_to_group(self, group_id, article_id):
        pass

    def remove_article_from_group(self, group_id, article_id):
        pass

    def create_shopping_list(self, group_id, name):
        shopping_list = ShoppingList()
        shopping_list.set_id(1)
        shopping_list.set_name(name)
        shopping_list.set_group(group_id)

    def remove_shopping_list_from_group(self, group_id, shopping_list_id):
        pass

    def add_standardarticle_to_group(self, group_id, list_entry_id):
        pass

    def remove_standardarticle_from_group(self, group_id, list_entry_id):
        pass

    def create_group(self, group):
        # with GroupMapper() as mapper:
        #    return mapper.insert(group)
        pass

    def delete_group(self, group_id):
        # with GroupMapper() as mapper:
        #    group_id = group.get_id()
        #    members = self.get_members_by_group_id(group_id)
        #    for member in members:
        #        self.delete_group_from_user(group, member)
        #    shopping_lists = self.get_shopping_lists_by_group_id(group_id)
        #    for shopping_list in shopping_lists:
        #        self.delelte_shopping_list(shopping_list)
        #    mapper.delte(group)
        pass

    def save_group(self, group):
        # with GroupMapper() as mapper:
        #   mapper.update(group)
        pass

    # def get_amout_of_shopping_lists_by_group_id(self, group_id):
    #    return len(self.get_shopping_lists_by_group_id(group_id))

    # def get_amout_of_standardarticles_by_group_id(self, group_id):
    #    return len(self.get_standardarticles_by_group_id(group_id))

    # Artikel

    def get_article_by_id(self, article_id):
        pass

    def create_article(self, article):
        # with ArticleMapper() as mapper:
        #   return mapper.insert(article)
        pass

    def delete_article(self, article_id):
        pass

    def save_article(self, article):
        pass

    # Listeintrag

    def get_list_entry_by_id(self, list_entry_id):
        pass

    def create_list_entry(self, list_entry):

        pass

    def delete_list_entry(self, list_entry_id):
        pass

    def save_list_entry(self, list_entry):
        pass

    # Einkaufsliste

    def get_shopping_list_by_id(self, shopping_list_id):
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

    def add_shopping_list(self, shopping_list):
        pass

    def delete_shopping_list(self, shopping_list_id):
        pass

    def save_shopping_list(self, shopping_list):
        pass

    # def get_amount_of_list_entries_by_shopping_list_id(self, shopping_list_id):
    #    return len(self.get_list_entries_by_shopping_list_id(shopping_list_id))

    # def get_amount_of_list_entries_checked_by_shopping_list_id(self, shopping_list_id):
    #    return len(self.get_list_entries_checked_by_shopping_list_id(shopping_list_id))
