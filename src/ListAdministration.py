from bo.Article import Article
from bo.Group import Group
from bo.ListEntry import ListEntry
from bo.Person import Person
from bo.Retailer import Retailer
from bo.ShoppingList import ShoppingList


class Administration():

    # Personen

    def get_all_persons(self):
        # with PersonMapper() as mapper:
        #    return mapper.find_all()
        pass

    def get_person_by_id(self, person):
        # with PersonMapper() as mapper:
        #    return mapper.find_by_id(person.get_id())
        pass

    def get_groups_of_person(self, person):
        # with GroupMapper() as mapper:
        #    return mapper.find_by_member_id(person.get_id())
        pass

    def add_group_to_person(self, group, person):
        # with PersonMapper() as mapper:
        #    self.add_member_to_group(group, person)
        #    mapper.add_group(group.get_id(), person.get_id())
        pass

    def delete_group_from_person(self, group, person):
        # with PersonMapper() as mapper:
        #    self.delete_member_from_group(group, person)
        #    mapper.leave_group(group.get_id(), person.get_id())
        pass

    def create_person(self, name, email, google_id):
        # person = Person()
        # person.set_id(1)
        # person.set_name(name)
        # person.set_email(email)
        # person.set_google_id(google_id)
        # with PersonMapper() as mapper:
        #   mapper.insert(person)
        pass

    def delete_person(self, person):
        # with PersonMapper() as mapper:
        #   groups = self.get_groups_of_person(person)
        #   if not (groups is None):
        #       for group in groups:
        #           group.delete_member(person)
        #   mapper.delete(person)
        pass

    def save_person(self, person):
        # with PersonMapper() as mapper:
        #   mapper.update(person)
        pass



    # Gruppe

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

    def get_amout_of_shopping_lists_by_group_id(self, group_id):
        return len(self.get_shopping_lists_by_group_id(group_id))

    def get_amout_of_standardarticles_by_group_id(self, group_id):
        return len(self.get_standardarticles_by_group_id(group_id))

    def add_member_to_group(self, group, person):
        # with GroupMapper() as mapper:
        #   self.add_group_to_person(group)
        #   return mapper.find_by_id(group.get_id())
        pass

    def delete_member_from_group(self, group, person):
        # with GroupMember() as mapper:
        #    self.delete_group_from_person(group)
        #    return mapper.delete_person(group.get_id(), person.get_id())
        pass

    def add_article_to_group(self, group, article):
        pass

    def remove_article_from_group(self, group, article):
        pass

    def create_shopping_list(self, group, name):
        shopping_list = ShoppingList()
        shopping_list.set_id(1)
        shopping_list.set_name(name)
        shopping_list.set_group(group.get_id())

    def remove_shopping_list_from_group(self, group, shopping_list):
        pass

    def add_standardarticle_to_group(self, group, list_entry):
        pass

    def remove_standardarticle_from_group(self, group, list_entry):
        pass

    def create_group(self, name, owner):
        # group = Group()
        # group.set_id(1)
        # group.set_name(name)
        # group.set_owner(owner)
        # with GroupMapper() as mapper:
        #    return mapper.insert(group)
        pass

    def delete_group(self, group):
        # with GroupMapper() as mapper:
        #    group_id = group.get_id()
        #    members = self.get_members_by_group_id(group_id)
        #    for member in members:
        #        self.delete_group_from_person(group, member)
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

    def create_article(self, name, group):
        # article = Article()
        # article.set_id(1)
        # article.set_name(name)
        # article.set_group(group)
        # with ArticleMapper() as mapper:
        #   return mapper.insert(article)
        pass

    def delete_article(self, article):
        pass

    def save_article(self, article):
        pass



    # Listeintrag

    def get_list_entry_by_id(self, list_entry_id):
        pass

    def create_list_entry(self, list, article, amount, unit, retailer, purchasing_person, is_checked,
                          is_standardarticle):
        list_entry = ListEntry()
        list_entry.set_id(1)
        list_entry.set_name(article.get_name())
        list_entry.set_article(article)
        list_entry.set_amount(amount)
        list_entry.set_unit(unit)
        list_entry.set_retailer(retailer.get_id())
        list_entry.set_purchasing_person(purchasing_person.get_id())
        list_entry.set_list(list.get_id())
        list_entry.set_checked(is_checked)
        list_entry.set_standardarticle(is_standardarticle)

    def delete_list_entry(self, list_entry):
        pass

    def save_list_entry(self, list_entry):
        pass



    # Einkaufsliste

    def get_shopping_list_by_id(self, shopping_list_id):
        pass

    def get_shopping_list_by_group_id_and_name(self, group_id, name):
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

    def get_amount_of_list_entries_by_shopping_list_id(self, shopping_list_id):
        return len(self.get_list_entries_by_shopping_list_id(shopping_list_id))

    def get_amount_of_list_entries_checked_by_shopping_list_id(self, shopping_list_id):
        return len(self.get_list_entries_checked_by_shopping_list_id(shopping_list_id))

    def add_list_entry(self, list, list_entry):
        pass

    def delete_shopping_list(self, shopping_list):
        pass

    def save_shopping_list(self, shopping_list):
        pass

