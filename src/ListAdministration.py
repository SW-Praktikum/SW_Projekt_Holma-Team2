from datetime import datetime

from bo.Article import Article
from bo.Group import Group
from bo.ListEntry import ListEntry
from bo.ShoppingList import ShoppingList
from bo.User import User
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
        """Alle User der Datenbank abfragen

        :return: Liste mit Usern
        """

        with UserMapper() as mapper:
            return mapper.find_all()

    def get_user_by_name(self, name: str):
        """User anhand eines Namen finden

        :param name: Name
        :return: Liste mit Usern
        """

        with UserMapper() as mapper:
            return mapper.find_by_name(name)

    def get_user_by_id(self, user_id: int):
        """User anhand der ID finden

        :param user_id: ID des Users
        :return: User-Objekt
        """
        with UserMapper() as mapper:
            return mapper.find_by_id(user_id)

    def get_user_by_google_id(self, google_id: str):
        """User anhand der GoogleID Finden

        :param google_id: GoogleID des Users
        :return: User-Objekt
        """

        with UserMapper() as mapper:
            return mapper.find_by_google_id(google_id)

    def get_groups_by_user_id(self, user_id: int):
        """Gruppen eines Users anhand seiner ID ausgeben

        :param user_id: ID des Users
        :return: Liste mit Gruppen
        """

        with UserGroupRelationsMapper() as mapper:
            return mapper.find_groups_by_user_id(user_id)

    def get_list_entries_by_user_id(self, user_id: int,
                                    include_archived=False):
        """Listeneinträge eines Users anhand seiner ID ausgeben

        :param user_id: ID des Users
        :param include_archived: Angabe, ob Archiv auch abgefragt wird
        :return: Liste mit Listeneinträgen
        """
        shopping_lists = []
        if include_archived == False:
            shopping_lists = self.get_all_archived_shopping_lists()
        with ListEntryMapper() as mapper:
            return mapper.find_by_purchasing_user(user_id,
                                                          shopping_lists)

    def create_user(self, name: str, email: str, google_id: str):
        """User anlegen

        :param name: Name des Users
        :param email: E-Mail des Users
        :param google_id: GoogleID des Users
        :return: User-Objekt
        """
        user = User()
        user.set_id(0)
        user.set_name(name)
        user.set_email(email)
        user.set_google_id(google_id)
        with UserMapper() as mapper:
            return mapper.insert(user)

    def delete_user(self, user):
        """User löschen

        :param user: User-Objekt
        :return:
        """
        with UserGroupRelationsMapper() as mapper:
            mapper.delete_user_relations(user)

        with ListEntryMapper() as mapper:
            mapper.delete_purchasing_user(user)

        with GroupMapper() as mapper:
            mapper.delete_owner(user)

        with UserMapper() as mapper:
            mapper.delete(user)

    def save_user(self, user):
        """User updaten

        :param user: User-Objekt
        :return: Aktualisiertes User-Objekt
        """
        user.set_last_updated(datetime.now())
        with UserMapper() as mapper:
            return mapper.update(user)

    """Gruppe"""

    def get_all_groups(self):
        """Alle Gruppen der Datenbank abfragen

        :return: Liste mit Gruppen
        """
        with GroupMapper() as mapper:
            return mapper.find_all()

    def get_group_by_id(self, group_id: int):
        """Gruppe anhand ihrer ID ausgeben

        :param group_id: ID der Gruppe
        :return: Gruppen-Objekt
        """
        with GroupMapper() as mapper:
            return mapper.find_by_id(group_id)

    def get_groups_by_name(self, name: str):
        """Gruppen anhand ihres Namens finden

        :param name: Name
        :return: Liste mit Gruppen
        """
        with GroupMapper() as mapper:
            return mapper.find_by_name(name)

    def get_members_by_group_id(self, group_id: int):
        """Gruppenmitglieder anhand der ID der Gruppe ausgeben

        :param group_id: ID der Gruppe
        :return: Liste mit Usern
        """
        with UserGroupRelationsMapper() as mapper:
            return mapper.find_users_by_group_id(group_id)

    def get_articles_by_group_id(self, group_id: int):
        """Artikel der Gruppe anhand ihrer ID ausgeben

        :param group_id: ID der Gruppe
        :return: Liste mit Artikeln
        """
        with ArticleMapper() as mapper:
            return mapper.find_by_group(group_id)

    def get_shopping_lists_by_group_id(self, group_id: int):
        """Einkaufslisten der Gruppe anhand ihrer ID ausgeben

        :param group_id: ID der Gruppe
        :return: Liste mit Einkaufslisten
        """
        with ShoppingListMapper() as mapper:
            return mapper.find_by_group(group_id)

    def get_standardarticles_by_group_id(self, group_id: int):
        """Standardartikel der Gruppe anhand ihrer ID ausgeben

        :param group_id: ID der Gruppe
        :return: Liste mit Standardartikeln (Listeneinträge)
        """
        with ListEntryMapper() as mapper:
            return mapper.find_standardarticles_by_group_id(group_id)

    def add_member_to_group(self, group: Group, user: User):
        """User zu einer Gruppe hinzufügen

        :param group: Gruppen-Objekt
        :param user: User-Objekt
        :return:
        """
        with UserGroupRelationsMapper() as mapper:
            mapper.add_user_to_group(group, user)

    def remove_member_from_group(self, group: Group, user: User):
        """User von einer Gruppe entfernen und allen zugehörigen
        Beziehungen lösen

        :param group: Gruppen-Objekt
        :param user: User-Objekt
        :return:
        """
        with GroupMapper() as mapper:
            mapper.delete_owner(user, group)

        with ShoppingListMapper() as mapper:
            shopping_lists = mapper.find_by_group(group)

            with ListEntryMapper() as mapper:
                for shopping_list in shopping_lists:
                    mapper.delete_purchasing_user(user, shopping_list)

        with UserGroupRelationsMapper() as mapper:
            mapper.remove_user_from_group(group, user)

    def add_standardarticle_to_group(self, list_entry: ListEntry,
                                     group: Group):
        """Standardartikel zur Gruppe hinzufügen

        :param list_entry: Listeneintrag-Objekt
        :param group: Gruppen-Objekt
        :return:
        """
        with ListEntryMapper() as mapper:
            list_entry.set_id(0)
            list_entry.set_standardarticle(True)
            list_entry.set_purchasing_user(None)
            list_entry.set_shopping_list(None)
            list_entry.set_checked(False)
            standardarticle = mapper.insert(list_entry)

            mapper.insert_standardarticle(standardarticle, group)

    def delete_standardarticle(self, list_entry: ListEntry, group: Group):
        """Standardartikel von einer Gruppe entfernen

        :param list_entry: Listeneintrag-Objekt
        :param group: Gruppen-Objekt
        :return:
        """
        with ListEntryMapper() as mapper:
            mapper.delete_standardarticle(list_entry, group)
            mapper.delete(list_entry)

    def create_group(self, name: str, user_id: int):
        """Gruppe erstellen

        :param name: Name
        :param user_id: ID des Erstellers
        :return: Gruppen-Objekt
        """
        group = Group()
        group.set_id(0)
        group.set_name(name)
        group.set_owner(user_id)
        with GroupMapper() as mapper:
            return mapper.insert(group)

    def delete_group(self, group: Group):
        """Gruppe und zugehörige Beziehungen löschen

        :param group: Gruppen-Objekt
        :return:
        """

        # User löschen
        with UserGroupRelationsMapper() as mapper:
            mapper.delete_group_relations(group)

        # Standardartikel löschen
        with ListEntryMapper() as mapper:
            mapper.delete_standardarticle_by_group(group)

        # Shoppinglists löschen
        with ShoppingListMapper() as shopping_list_mapper:
            shopping_lists = shopping_list_mapper.find_by_group(group)

            # Listeineinträge anhand der ShoppingLists löschen
            with ListEntryMapper() as mapper:
                for shopping_list in shopping_lists:
                    mapper.delete_by_shopping_list(shopping_list)

            shopping_list_mapper.delete_by_group(group)

        # Artikel löschen
        with ArticleMapper() as article_mapper:
            articles = article_mapper.find_by_group(group.get_id())

            # Übrige Listeneinträge nach Artikel löschen
            with ListEntryMapper() as mapper:
                for article in articles:
                    mapper.delete_by_article(article)

            article_mapper.delete_by_group(group)

        # Gruppe löschen
        with GroupMapper() as mapper:
            mapper.delete(group)

    def save_group(self, group: Group):
        """Gruppe aktualisieren

        :param group: Gruppen-Objekt
        :return: Aktualisiertes Gruppen-Objekt
        """
        group.set_last_updated(datetime.now())
        with GroupMapper() as mapper:
            return mapper.update(group)

    """Artikel"""

    def get_article_by_id(self, article_id: int):
        """Artikel anhand der ID ausgeben

        :param article_id: ID des Artikels
        :return: Artikel-Objekt
        """
        with ArticleMapper() as mapper:
            return mapper.find_by_id(article_id)

    def get_article_by_name(self, name: str):
        """Artikel anhand ihres Namens ausgeben

        :param name: Name
        :return: Liste mit Artikeln
        """
        with ArticleMapper() as mapper:
            return mapper.find_by_name(name)

    def create_article(self, name: str, group_id: int):
        """Artikel erstellen

        :param name: Name
        :param group_id: ID der zugehörigen Gruppe
        :return: Artikel-Objekt
        """
        article = Article()
        article.set_id(0),
        article.set_name(name),
        article.set_group(group_id)
        with ArticleMapper() as mapper:
            return mapper.insert(article)

    def delete_article(self, article_id: int):
        """Artikel und zugehörige Beziehungen löschen

        :param article_id:
        :return:
        """
        article = self.get_article_by_id(article_id)

        # Standardartikel löschen
        with ListEntryMapper() as mapper:
            group = self.get_group_by_id(article.get_group())
            mapper.delete_standardarticle_by_group(group)

        # Listeneinträge mit Artikel löschen
        with ListEntryMapper() as mapper:
            mapper.delete_by_article(article)

        # Artikel löschen
        with ArticleMapper() as mapper:
            mapper.delete(article_id)

    def save_article(self, article):
        """Artikel aktualisieren

        :param article: Artikel-Objekt
        :return: Aktualisiertes Artikel-Objekt
        """
        article.set_last_updated(datetime.now())
        with ArticleMapper() as mapper:
            return mapper.update(article)

    """Listentry"""


    def get_all_list_entries(self):
        """Alle Listeneinträge der Datenbank ausgeben

        :return: Liste mit Listeneinträgen
        """
        with ListEntryMapper() as mapper:
            return mapper.find_all()


    def get_list_entry_by_id(self, list_entry_id: int):
        """Listeneintrag anhand seiner ID ausgeben

        :param list_entry_id: ID des Listeneintrags
        :return: Listeneintrag-Objekt
        """
        with ListEntryMapper() as mapper:
            return mapper.find_by_id(list_entry_id)

    def create_list_entry(self, name: str, amount, article_id: int, unit: str,
                          purchasing_user_id: int, retailer_id: int,
                          shopping_list_id: int, is_standardarticle: bool):
        """Listeneintrag erstellen

        :param name: Name
        :param amount: Anzahl
        :param article_id: ID des Artikels
        :param unit: Einheit
        :param purchasing_user_id: ID des Einkäufers
        :param retailer_id: ID des Retailers
        :param shopping_list_id: ID der Einkaufsliste
        :param is_standardarticle: Information, ob es ein
        Standardartikel ist
        :return: Listeneintrag-Objekt
        """
        shopping_list = self.get_shopping_list_by_id(shopping_list_id)
        self.save_shopping_list(shopping_list)
        list_entry = ListEntry()
        list_entry.set_id(0),
        list_entry.set_name(name),
        list_entry.set_purchasing_user(purchasing_user_id),
        list_entry.set_amount(amount),
        list_entry.set_article(article_id),
        list_entry.set_unit(unit),
        list_entry.set_retailer(retailer_id),
        list_entry.set_shopping_list(shopping_list_id)
        list_entry.set_standardarticle(is_standardarticle)
        with ListEntryMapper() as mapper:
            return mapper.insert(list_entry)

    def delete_list_entry(self, list_entry: ListEntry):
        """Listeneintrag löschen

        :param list_entry: Listeneintrag-Objekt
        :return:
        """
        shopping_list = self.get_shopping_list_by_id(list_entry.get_shopping_list())
        self.save_shopping_list(shopping_list)
        with ListEntryMapper() as mapper:
            mapper.delete(list_entry)

    def save_list_entry(self, list_entry: ListEntry):
        """Listeneintrag aktualisieren

        :param list_entry: Listeneintrag-Objekt
        :return: Aktualisiertes Listeneintrag-Objekt
        """
        shopping_list = self.get_shopping_list_by_id(list_entry.get_shopping_list())
        self.save_shopping_list(shopping_list)
        list_entry.set_last_updated(datetime.now())
        with ListEntryMapper() as mapper:
            return mapper.update(list_entry)

    def get_list_entries_by_retailer_id(self, retailer_id: int):
        """Listeneinträge anhand der ID des Retailers ausgeben

        :param retailer_id: ID des Retailers
        :return: Liste mit Listeneintrag-Objekten
        """
        with ListEntryMapper() as mapper:
            return mapper.find_by_retailer(retailer_id)


    def get_list_entries_by_article_id(self, article_id: int):
        """Listeneinträge anhand der ID des Artikels ausgeben

        :param article_id: ID des Artikels
        :return: Liste mit Listeneintrag-Objekten
        """
        with ListEntryMapper() as mapper:
            return mapper.find_list_entries_by_article(article_id)


    def get_list_entries_by_shopping_list_id(self, shopping_list_id: int):
        """Listeneinträge anhand der ID der Einkaufsliste ausgeben

        :param shopping_list_id: ID der Einkaufsliste
        :return: Liste mit Listeneintrag-Objekten
        """
        with ListEntryMapper() as mapper:
            return mapper.find_list_entries_by_shopping_list_id(
                shopping_list_id)


    def get_checked_list_entries_by_shopping_list_id(self,
                                                     shopping_list_id: int):
        """Abgehakte Listeneinträge anhand der ID der Einkaufsliste
         ausgeben

        :param shopping_list_id: ID der Einkaufsliste
        :return: Liste mit Listeneintrag-Objekten
        """
        with ListEntryMapper() as mapper:
            return mapper.find_checked_list_entries_by_shopping_list_id(
                shopping_list_id)


    """Einkaufsliste"""

    def get_shopping_list_by_id(self, shopping_list_id: int):
        """Einkaufsliste anhand ihrer ID ausgeben

        :param shopping_list_id: ID der Einkaufsliste
        :return: Einkaufslisten-Objekt
        """
        with ShoppingListMapper() as mapper:
            return mapper.find_by_id(shopping_list_id)

    def get_shopping_list_by_name(self, name: str):
        """Einkaufslisten anhand ihres Namens ausgeben

        :param name: Name
        :return: Einkaufslisten-Objekte
        """
        with ShoppingListMapper() as mapper:
            return mapper.find_by_name(name)

    def create_shopping_list(self, name: str, group_id: int):
        """Einkaufsliste erstellen

        :param name:
        :param group_id:
        :return: Einkaufslisten-Objekt
        """
        shopping_list = ShoppingList()
        shopping_list.set_id(0)
        shopping_list.set_name(name)
        shopping_list.set_group(group_id)
        with ShoppingListMapper() as mapper:
            return mapper.insert(shopping_list)

    def delete_shopping_list(self, shopping_list: ShoppingList):
        """Einkaufsliste und zugehörige Beziehungen löschen

        :param shopping_list: Einkaufslisten-Objekt
        :return:
        """
        with ListEntryMapper() as mapper:
            group = self.get_group_by_id(shopping_list.get_group())
            mapper.delete_standardarticle_by_group(group)
            mapper.delete_by_shopping_list(shopping_list)

        with ShoppingListMapper() as mapper:
            mapper.delete(shopping_list)

    def archive_shopping_list(self, shopping_list: ShoppingList):
        """Einkaufsliste archivieren

        :param shopping_list: Einkaufslisten-Objekt
        :return: Archiviertes Einkaufslisten-Objekt
        """
        shopping_list.set_archived(True)
        with ShoppingListMapper() as mapper:
            return mapper.update(shopping_list)

    def get_all_archived_shopping_lists(self):
        """Alle archivierten Einkaufslisten der Datenbank ausgeben

        :return: Liste mit Einkaufslisten
        """
        with ShoppingListMapper() as mapper:
            return mapper.find_all_archived()

    def save_shopping_list(self, shopping_list: ShoppingList):
        """Einkaufsliste aktualisieren

        :param shopping_list: Einkaufslisten-Objekt
        :return: Aktualisierte Einkaufsliste
        """
        shopping_list.set_last_updated(datetime.now())
        with ShoppingListMapper() as mapper:
            return mapper.update(shopping_list)

    def add_standardarticle_to_shopping_list(self, group: Group,
                                             shopping_list: ShoppingList):
        """Alle Standardartikel einer Gruppe zu einer Einkaufsliste
        hinzufügen

        :param group: Gruppen-Objekt
        :param shopping_list: Einkaufslisten-Objekt
        :return:
        """
        with ListEntryMapper() as mapper:
            standardarticles = mapper.find_standardarticles_by_group_id(
                group.get_id())

            for standardarticle in standardarticles:
                standardarticle.set_id(0)
                standardarticle.set_shopping_list(shopping_list.get_id())
                mapper.insert(standardarticle)

    """Retailer"""

    def get_all_retailers(self):
        """Alle Retailer der Datenbank ausgeben

        :return: Liste mit Retailern
        """
        with RetailerMapper() as mapper:
            return mapper.find_all()

    def get_retailer_by_id(self, retailer_id: int):
        """Retailer anhand seiner ID ausgeben

        :param retailer_id: ID des Retailers
        :return: Retailer-Objekt
        """
        with RetailerMapper() as mapper:
            return mapper.find_by_id(retailer_id)

    def get_retailers_by_name(self, name):
        """Retailer anhand ihres Namens ausgeben

        :param name: Name
        :return: Liste mit Retailern
        """
        with RetailerMapper() as mapper:
            return mapper.find_by_name(name)

    """Statistik Client"""


class StatisticAdministration(Administration):
    def __init__(self):
        super().__init__()

    def get_all_shopping_lists(self):
        """Alle Einkaufslisten der Datenbank ausgeben

        :return: Liste mit Einkaufslisten
        """
        with ShoppingListMapper() as mapper:
            return mapper.find_all()

    def get_all_articles(self):
        """Alle Artikel der Datenbank ausgeben

        :return: Liste mit Artikeln
        """
        with ArticleMapper() as mapper:
            return mapper.find_all()

    def get_list_entries_by_group(self, group: Group):
        """Alle Listeneinträge einer Gruppe ausgeben

        :param group: Gruppen-Objekt
        :return: Liste mit Listeneinträgen
        """
        with ShoppingListMapper() as mapper:
            shopping_lists = mapper.find_by_group(group)

        list_entries = []
        for shopping_list in shopping_lists:
            with ListEntryMapper() as mapper:
                list_entries += mapper.find_list_entries_by_shopping_list_id(shopping_list)
        return list_entries

    def get_list_entries_in_time_period(self, from_date: datetime,
                                        to_date: datetime):
        """Listeneinträge ausgeben, die in einem Zeitintervall gekauft
        (checked) wurden

        :param from_date: Ab-Datum
        :param to_date: Bis-Datum
        :return: Liste Mit Listeneinträgen
        """
        with ListEntryMapper() as mapper:
            return mapper.find_list_entries_in_time_periode(from_date, to_date)
    

    def get_article_count_by_group(self, group: Group):
        """Artikel einer Gruppe absteigend sortiert nach der
        Kaufhäufigkeit ausgeben

        :param group: Gruppen-Objekt
        :return: Liste mit Artikeln
        """
        with ArticleMapper() as mapper:
            return mapper.find_most_frequent_articles_by_group(group)

    def get_retailer_count_by_user(self, user: User):
        """Retailer-Häufigkeit anhand eines Nutzers ausgeben

        :param user: User-Objekt
        :return: Liste mit Retailern
        """
        with RetailerMapper() as mapper:
            return mapper.find_most_frequent_retailers(user)
