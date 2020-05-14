import time
import uuid


class BasisClass(object):
    def __init__(self, name=""):
        self._id = uuid.uuid4()
        self._timestamp = int(time.time() * 1000)
        self._name = name

    def get_id(self):
        return self._id

    def get_name(self):
        return self._name

    def get_timestamp(self):
        return self._timestamp

    def set_name(self, name):
        self._name = name


class Article(BasisClass):
    def __init__(self, name, unit):
        super().__init__(name)
        self._unit = unit

    def get_unit(self):
        return self._unit

    def set_unit(self, unit):
        self._unit = unit

    # def delete_article(self):
    #     pass


class Group(BasisClass):
    def __init__(self, name):
        super().__init__(name)
        self._persons = []
        self._shoppinglists = []
        self._standardarticles = []

    def add_person(self, person):
        self._persons.append(person)
        person.add_group(self)

    def add_shoppinglist(self, name):
        liste = Shoppinglist(name, self)
        self._shoppinglists.append(liste)
        return liste

    def add_standardarticle(self, article, amount, purchasing_person, retailer):
        standardarticle = ListEntry(article, amount, purchasing_person, retailer)
        self._standardarticles.append(standardarticle)
        return standardarticle

    def delete_group(self):
        pass

    def delete_person(self, person):
        self._persons.remove(person)
        person.delete_group(self)

    def delete_shoppinglist(self, shoppinglist):
        self._shoppinglists.remove(shoppinglist)

    def delete_standardarticle(self, standardarticle):
        self._standardarticles.remove(standardarticle)

    def get_amout_of_persons(self):
        return len(self._persons)

    def get_amout_of_shoppinglists(self):
        return len(self._shoppinglists)

    def get_amout_of_standardarticles(self):
        return len(self._standardarticles)

    def get_persons(self):
        return self._persons

    def get_shoppinglists(self):
        return self._shoppinglists

    def get_standardarticles(self):
        return self._standardarticles

    # def search_member(self):
    #    pass


class Shoppinglist(BasisClass):
    def __init__(self, name, group):
        super().__init__(name)
        self._group = group
        self._list_entries = []

    def add_list_entry(self, article, amount, purchasing_person, retailer):
        list_entry = ListEntry(article, amount, purchasing_person, retailer)
        self._list_entries.append(list_entry)

    def add_all_standardarticles(self):
        for standardarticle in self._group.get_standardarticles():
            article = standardarticle.get_article()
            amount = standardarticle.get_amount()
            purchasing_person = standardarticle.get_purchasing_person()
            retailer = standardarticle.get_retailer()
            self.add_list_entry(article, amount, purchasing_person, retailer)

    def delete_list_entry(self, list_entry):
        self._list_entries.remove(list_entry)

    def get_amout_of_list_entries(self):
        return len(self._list_entries)

    def get_amout_of_list_entries_marked(self):
        return len(self.get_list_entries_marked())

    def get_group(self):
        return self._group

    def get_list_entries(self):
        return self._list_entries

    def get_list_entries_marked(self):
        list_entries_marked = []
        for eintrag in self._list_entries:
            if eintrag.is_marked():
                list_entries_marked.append(eintrag)
        return list_entries_marked

    # def set_group(self, group):
    #     self._group = group


class ListEntry(BasisClass):
    def __init__(self, article, amount, purchasing_person, retailer):
        super().__init__(article.get_name())
        self._article = article
        self._amount = amount
        self._retailer = retailer
        self._purchasing_person = purchasing_person
        self._marked = False

    def get_amount(self):
        return self._amount

    def get_article(self):
        return self._article

    def get_purchasing_person(self):
        return self._purchasing_person

    def get_retailer(self):
        return self._retailer

    def set_article(self, article):
        self._article = article

    def set_amount(self, amount):
        self._amount = amount

    def set_purchasing_person(self, purchasing_person):
        self._purchasing_person = purchasing_person

    def set_retailer(self, retailer):
        self._retailer = retailer

    def mark(self):
        self._marked = True

    def unmark(self):
        self._marked = False

    def is_marked(self):
        return self._marked


class Retailer(BasisClass):
    def __init__(self, name):
        super().__init__(name)


class Person(BasisClass):
    def __init__(self, name, email):
        super().__init__(name)
        self._email = email
        self._groups = []

    def add_group(self, group):
        self._groups.append(group)

    def delete_account(self):
        for group in self._groups:
            self.delete_group(group)

    def delete_group(self, group):
        group.delete_person(self)
        self._groups.remove(group)

    def get_email(self):
        return self._email

    def get_groups(self):
        return self._groups


class User(Person):
    def __init__(self, name, email):
        super().__init__(name, email)


familie = Group("Familie")

vater = Person("Michael", "michael@gmail.com")
mutter = Person("Iris", "iris@gmail.com")
kind1 = Person("Tim", "tim@gmail.com")
kind2 = Person("Pia", "pia@gmail.com")

familie.add_person(vater)
familie.add_person(mutter)
familie.add_person(kind1)
familie.add_person(kind2)

wocheneinkauf = familie.add_shoppinglist("Wocheneinkauf")
silvesterparty = familie.add_shoppinglist("Silvesterparty")

baecker = Retailer("Bäckerei Hofmann")
edeka = Retailer("Edeka Heimsheim")
aldi = Retailer("Aldi Rutesheim")

brot = Article("Brot", "Stk")
mehl = Article("Mehl", "g")
tomaten = Article("Tomaten", "Stk")
milch = Article("Milch", "ml")

familie.add_standardarticle(article=brot, amount=3, purchasing_person=vater, retailer=baecker)
familie.add_standardarticle(article=milch, amount=500, purchasing_person=vater, retailer=baecker)

print("Gruppe:", familie.get_name())
print("Teilnehmer:", ", ".join([person.get_name() for person in familie.get_persons()]))
print("Einkaufslisten:", ", ".join([liste.get_name() for liste in familie.get_shoppinglists()]))
print("Standardartikel:", ", ".join([article.get_name() for article in familie.get_standardarticles()]))

wocheneinkauf.add_all_standardarticles()
wocheneinkauf.get_list_entries()[1].set_mark()
for liste in familie.get_shoppinglists():
    print(liste.get_name() + ":", liste.get_amout_of_list_entries(), liste.get_amout_of_list_entries_marked())
