from bo.ShoppingList import ShoppingList


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

    def get_user_by_name(self, name):
        pass

    def get_groups_by_user_id(self, user_id):
        # with GroupMapper() as mapper:
        #    return mapper.find_by_member_id(user.get_id())
        pass

    def get_list_entries_by_user_id(self, user_id):
        # with GroupMapper() as mapper:
        #    return mapper.find_by_member_id(user.get_id())
        pass

    def create_user(self, name, email, google_id):
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

    def get_groups_by_name(self, name):
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

    def remove_shopping_list_from_group(self, group_id, shopping_list_id):
        pass

    def add_standardarticle_to_group(self, group_id, list_entry_id):
        pass

    def remove_standardarticle_from_group(self, group_id, list_entry_id):
        pass

    def create_group(self, name, owner_id):
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

    # Artikel

    def get_article_by_id(self, article_id):
        pass

    def get_article_by_name(self, name):
        pass

    def create_article(self, name, group_id):
        # with ArticleMapper() as mapper:
        #   return mapper.insert(article)
        pass

    def delete_article(self, article_id):
        pass

    def save_article(self, article):
        pass

    # Listeintrag

    def get_all_list_entries(self):
        pass

    def get_list_entry_by_id(self, list_entry_id):
        pass

    def create_list_entry(self, article_id, amount, unit, retailer_id, purchasing_user_id, shopping_list_id):

        pass

    def delete_list_entry(self, list_entry_id):
        pass

    def save_list_entry(self, list_entry):
        pass

    # Einkaufsliste

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

    def add_list_entry_to_shopping_list(self, shopping_list_id, list_entry_id):
        pass

    def delete_list_entry_from_shopping_list(self, shopping_list_id, list_entry_id):
        pass

    def create_shopping_list(self, name, group_id):
        shopping_list = ShoppingList()
        shopping_list.set_id(1)
        shopping_list.set_name(name)
        shopping_list.set_group(group_id)
        return shopping_list

    def delete_shopping_list(self, shopping_list_id):
        pass

    def save_shopping_list(self, shopping_list):
        pass

    # Retailer

    def get_all_retailers(self):
        pass

    def get_retailer_by_id(self, retailer_id):
        pass

    def get_retailers_by_name(self, name):
        pass

    def create_retailer(self, name):
        pass

    def delete_retailer(self, retailer_id):
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
