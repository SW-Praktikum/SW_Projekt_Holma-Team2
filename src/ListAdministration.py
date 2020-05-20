from bo.Article import Article
from bo.Group import Group
from bo.ListEntry import ListEntry
from bo.Retailer import Retailer
from bo.ShoppingList import ShoppingList

class Administration():

    # Personen

    def get_all_persons(self):
        #with PersonMapper() as mapper:
        #    return mapper.find_all()
        pass

    def get_person_by_id(self, person):
        #with PersonMapper() as mapper:
        #    return mapper.find_by_id(person.get_id())
        pass

    def get_groups_of_person(self, person):
        #with GroupMapper() as mapper:
        #    return mapper.find_by_member_id(person.get_id())
        pass

    def add_group_to_person(self, group, person):
        #with PersonMapper() as mapper:
        #    self.add_member_to_group(group, person)
        #    mapper.add_group(group.get_id(), person.get_id())
        pass

    def delete_group_from_person(self, group, person):
        #with PersonMapper() as mapper:
        #    self.delete_member_from_group(group, person)
        #    mapper.leave_group(group.get_id(), person.get_id())
        pass

    def create_person(self, name, email, google_id):
        #person = Person()
        #person.set_id(1)
        #person.set_name(name)
        #person.set_email(email)
        #person.set_google_id(google_id)
        #with PersonMapper() as mapper:
        #   mapper.insert(person)
        pass

    def delete_person(self, person):
        #with PersonMapper() as mapper:
        #   groups = self.get_groups_of_person(person)
        #   if not (groups is None):
        #       for group in groups:
        #           group.delete_member(person)
        #   mapper.delete(person)
        pass

    def save_person(self, person):
        #with PersonMapper() as mapper:
        #   mapper.update(person)
        pass


    # Gruppe

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
        #with GroupMapper() as mapper:
        #   self.add_group_to_person(group)
        #   return mapper.find_by_id(group.get_id())
        pass

    def delete_member_from_group(self, group, person):
        #with GroupMember() as mapper:
        #    self.delete_group_from_person(group)
        #    return mapper.delete_person(group.get_id(), person.get_id())
        pass

    def add_article_to_group(self, group, article):
        pass

    def remove_article_from_group(self, group, article):
        pass

    def add_shopping_list_to_group(self, group, shopping_list):
        pass

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
        #with GroupMapper() as mapper:
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
        #with GroupMapper() as mapper:
        #   mapper.update(group)
        pass


    # Article

    def create_article(self, name, group):
        #article = Article()
        #article.set_id(1)
        #article.set_name(name)
        #article.set_group(group)
        #with ArticleMapper() as mapper:
        #   return mapper.insert(article)
        pass

    def delete_article(self, article):
        pass

    def save_article(self, article):
        pass



# def search_member(self, email):
#    for member in self._members:
#        if member.get_email() == email:
#            return member
#    return None

# def invite_member(self, email):
#    pass

# def search_shopping_list(self, name):
#    results = []
#    for shopping_list in self._shopping_lists:
#        if name in shopping_list.get_name()
#            results.append(shopping_list)
#    return results