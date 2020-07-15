from datetime import datetime

from bo.Article import Article
from bo.Group import Group
from bo.ListEntry import ListEntry
from bo.ShoppingList import ShoppingList
from bo.User import User
from bo.Retailer import Retailer
from db.ArticleMapper import ArticleMapper
from db.GroupMapper import GroupMapper
from db.ListEntryMapper import ListEntryMapper
from db.RetailerMapper import RetailerMapper
from db.ShoppingListMapper import ShoppingListMapper
from db.UserGroupRelationsMapper import UserGroupRelationsMapper
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

    def get_user_by_google_id(self, google_id):
        with UserMapper() as mapper:
            return mapper.find_by_google_id(google_id)

    def get_groups_by_user_id(self, user_id):
        with UserGroupRelationsMapper() as mapper:
            return mapper.find_groups_by_user_id(user_id)

    def get_list_entries_by_user_id(self, user_id):
        with ListEntryMapper() as mapper:
            list_entries = mapper.find_by_purchasing_user(user_id)
        return [self.complete_list_entry(le) for le in list_entries]

    def create_user(self, name, email, google_id):
        user = User()
        user.set_id(0)
        user.set_name(name)
        user.set_email(email)
        user.set_google_id(google_id)
        with UserMapper() as mapper:
            return mapper.insert(user)

    def delete_user(self, user):
        with UserGroupRelationsMapper() as mapper:
            print("delete relation")
            mapper.delete_user_relations(user)

        with ListEntryMapper() as mapper:
            mapper.delete_purchasing_user(user)

        with GroupMapper() as mapper:
            print("delete group")
            mapper.delete_owner(user)

        with UserMapper() as mapper:
            print("delete user")
            mapper.delete(user)

    def save_user(self, user):
        user.set_last_updated(datetime.now())
        with UserMapper() as mapper:
            return mapper.update(user)

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
        with UserGroupRelationsMapper() as mapper:
            return mapper.find_users_by_group_id(group_id)

    def get_articles_by_group_id(self, group_id):
        with ArticleMapper() as mapper:
            return mapper.find_by_group(group_id)

    def get_shopping_lists_by_group_id(self, group_id):
        with ShoppingListMapper() as mapper:
            return mapper.find_by_group(group_id)

    def get_standardarticles_by_group_id(self, group_id):
        with ListEntryMapper() as mapper:
            list_entries = mapper.find_standardarticles_by_group_id(group_id)
        return [self.complete_list_entry(le) for le in list_entries]

    def add_member_to_group(self, group, user):
        with UserGroupRelationsMapper() as mapper:
            mapper.add_user_to_group(group, user)

    def remove_member_from_group(self, group, user):
        with GroupMapper() as mapper:
            mapper.delete_owner(user, group)

        with UserGroupRelationsMapper() as mapper:
            mapper.remove_user_from_group(group, user)

    def add_standardarticle_to_group(self, list_entry, group):
        with ListEntryMapper() as mapper:
            list_entry.set_id(0)
            list_entry.set_standardarticle(True)
            list_entry.set_purchasing_user(None)
            list_entry.set_shopping_list(None)
            list_entry.set_checked(False)
            standardarticle = mapper.insert(list_entry)

            mapper.insert_standardarticle(standardarticle, group)

    def delete_standardarticle(self, list_entry, group):
        with ListEntryMapper() as mapper:
            mapper.delete_standardarticle(list_entry, group)

            mapper.delete(list_entry)

    def create_group(self, name, user_id):
        group = Group()
        group.set_id(0)
        group.set_name(name)
        group.set_owner(user_id)
        with GroupMapper() as mapper:
            return mapper.insert(group)

    def delete_group(self, group):
        with UserGroupRelationsMapper() as mapper:
            mapper.delete_group_relations(group)

        with ListEntryMapper() as mapper:
            mapper.delete_standardarticle_by_group(group)

        with ShoppingListMapper() as mapper:
            mapper.delete_by_group(group)

        with ArticleMapper() as mapper:
            mapper.delete_by_group(group)

        with GroupMapper() as mapper:
            mapper.delete(group)

    def save_group(self, group):
        group.set_last_updated(datetime.now())
        with GroupMapper() as mapper:
            return mapper.update(group)

    """eventuell reichen die delete-methoden der objekte selbst
    def add_article_to_group(self, group, article):
        pass
    def remove_article_from_group(self, group, article):
        pass
    def remove_shopping_list_from_group(self, group, shopping_list):
        pass"""

    """Artikel"""

    def get_article_by_id(self, article_id):
        with ArticleMapper() as mapper:
            return mapper.find_by_id(article_id)

    def get_article_by_name(self, name):
        with ArticleMapper() as mapper:
            return mapper.find_by_name(name)

    def create_article(self, name, group_id):
        article = Article()
        article.set_id(0),
        article.set_name(name),
        article.set_group(group_id)
        with ArticleMapper() as mapper:
            return mapper.insert(article)

    def delete_article(self, article_id):
        with ListEntryMapper() as mapper:
            mapper.delete_by_article(article_id)

        with ArticleMapper() as mapper:
            mapper.delete(article_id)

    def save_article(self, article):
        article.set_last_updated(datetime.now())
        with ArticleMapper() as mapper:
            return mapper.update(article)

    """Listentry"""
    def complete_list_entry(self, list_entry):
        article_id = list_entry.get_article()
        shopping_list_id = list_entry.get_shopping_list()
        retailer_id = list_entry.get_retailer()
        purchasing_user_id = list_entry.get_purchasing_user()

        if article_id is not None:
            article = self.get_article_by_id(article_id)
            list_entry.set_article_name(article.get_name())

        if shopping_list_id is not None:
            shopping_list = self.get_shopping_list_by_id(shopping_list_id)
            list_entry.set_shopping_list_name(shopping_list.get_name())

        if retailer_id is not None:
            retailer = self.get_retailer_by_id(retailer_id)
            list_entry.set_retailer_name(retailer.get_name())

        if purchasing_user_id is not None:
            purchasing_user = self.get_user_by_id(purchasing_user_id)
            list_entry.set_purchasing_user_name(purchasing_user.get_name())

        return list_entry

    def get_all_list_entries(self):
        with ListEntryMapper() as mapper:
            list_entries = mapper.find_all()
        return [self.complete_list_entry(le) for le in list_entries]

    def get_list_entry_by_id(self, list_entry_id):
        with ListEntryMapper() as mapper:
            return self.complete_list_entry(mapper.find_by_id(list_entry_id))

    def create_list_entry(self, name, amount, article_id, unit, purchasing_user_id, 
                          retailer_id, shopping_list_id):
        list_entry = ListEntry()
        list_entry.set_id(0),
        list_entry.set_name(name),
        list_entry.set_purchasing_user(purchasing_user_id),
        list_entry.set_amount(amount),
        list_entry.set_article(article_id),
        list_entry.set_unit(unit),
        list_entry.set_retailer(retailer_id),
        list_entry.set_shopping_list(shopping_list_id)
        with ListEntryMapper() as mapper:
            return mapper.insert(list_entry)

    def delete_list_entry(self, list_entry):
        with ListEntryMapper() as mapper:
            mapper.delete(list_entry)

    def save_list_entry(self, list_entry):
        list_entry.set_last_updated(datetime.now())
        with ListEntryMapper() as mapper:
            return mapper.update(list_entry)

    def get_list_entries_by_retailer_id(self, retailer_id):
        with ListEntryMapper() as mapper:
            list_entries = mapper.find_by_retailer(retailer_id)
        return [self.complete_list_entry(le) for le in list_entries]

    def get_list_entries_by_article_id(self, article_id):
        with ListEntryMapper() as mapper:
            list_entries = mapper.find_list_entries_by_article(article_id)
        return [self.complete_list_entry(le) for le in list_entries]

    def get_list_entries_by_shopping_list_id(self, shopping_list_id):
        with ListEntryMapper() as mapper:
            list_entries =  mapper.find_list_entries_by_shopping_list_id(
                shopping_list_id)
        return [self.complete_list_entry(le) for le in list_entries]

    def get_list_entries_checked_by_shopping_list_id(self, shopping_list_id):
        with ListEntryMapper() as mapper:
            list_entries =  mapper.find_list_entries_checked_by_shopping_list_id(
                shopping_list_id)
        return [self.complete_list_entry(le) for le in list_entries]
    
    """Einkaufsliste"""

    def get_shopping_list_by_id(self, shopping_list_id):
        with ShoppingListMapper() as mapper:
            return mapper.find_by_id(shopping_list_id)

    def get_shopping_list_by_name(self, name):
        with ShoppingListMapper() as mapper:
            return mapper.find_by_name(name)

    def create_shopping_list(self, name, group_id):
        shopping_list = ShoppingList()
        shopping_list.set_id(0)
        shopping_list.set_name(name)
        shopping_list.set_group(group_id)
        with ShoppingListMapper() as mapper:
            return mapper.insert(shopping_list)

    def delete_shopping_list(self, shopping_list):
        with ListEntryMapper() as mapper:
            mapper.delete_by_shopping_list(shopping_list)

        with ShoppingListMapper() as mapper:
            mapper.delete(shopping_list)

    def save_shopping_list(self, shopping_list):
        shopping_list.set_last_updated(datetime.now())
        with ShoppingListMapper() as mapper:
            return mapper.update(shopping_list)

    def add_standardarticle_to_shopping_list(self, group_id, shopping_list_id):
        with ListEntryMapper() as mapper:
            standardarticles = mapper.find_standardarticles_by_group(group_id)

            for standardarticle in standardarticles:
                standardarticle.set_id(0)
                standardarticle.set_shopping_list(shopping_list_id)
                mapper.insert(standardarticle)


    """Retailer"""

    def get_all_retailers(self):
        with RetailerMapper() as mapper:
            return mapper.find_all()

    def get_retailer_by_id(self, retailer_id):
        with RetailerMapper() as mapper:
            return mapper.find_by_id(retailer_id)

    def get_retailers_by_name(self, name):
        with RetailerMapper() as mapper:
            return mapper.find_by_name(name)



    """Statistik Client"""


class StatisticAdministration(Administration):
    def __init__(self):
        super().__init__()

    def get_all_shoppinlists(self):
        with ShoppingListMapper() as mapper:
            return mapper.find_all()

    def get_all_articles(self):
        with ArticleMapper() as mapper:
            return mapper.find_all()

    def get_all_list_entries(self):
        # hier fehlt die complete_list_entry-Methode!
        with ListEntryMapper() as mapper:
            return mapper.find_all()

    def get_list_entries_in_time_period(self, from_date, to_date):
        with ListEntryMapper() as mapper:
            return mapper.find_list_entries_in_time_periode(from_date, to_date)

