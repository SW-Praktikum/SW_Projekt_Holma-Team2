import time
import uuid


class BasisClass(object):
    def __init__(self, name=""):
        """Basisklasse, die in allen anderen Klassen übernommen wird.

        :param name: Name des Objekts
        """
        self._name = name
        self._id = uuid.uuid4()
        self._creation_date = int(time.time() * 1000)

    def __str__(self):
        return self._name

    def get_name(self):
        return self._name

    def get_id(self):
        return self._id

    def get_creation_date(self):
        return self._creation_date

    def set_name(self, name):
        self._name = name


class Article(BasisClass):
    def __init__(self, name, group):
        """Artikel, der für eine Gruppe erstellt wird.

        :param name: Name des Artikels
        :param group: Group-Objekt, dem der Artikel zugeordnet ist
        """
        super().__init__(name)
        self._group = group

    def get_group(self):
        return self._group

    def delete(self):
        self._group.delete_article(self)


class Group(BasisClass):
    def __init__(self, name, owner):
        """Gruppe, der Nutzer und Einkaufslisten hinzugefügt, oder entfernt werden. Eine Gruppe
        verfügt über Standardartikel, die bei der Erstellung von Einkaufslisten (wahlweise)
        hinzugefügt werden.

        :param name: Name der Gruppe
        :param owner: Person-Objekt, Ersteller der Gruppe
        """
        super().__init__(name)
        self._owner = owner
        self._members = []
        self._articles = []
        self._shoppinglists = []
        self._standardarticles = []

    def get_owner(self):
        return self._owner

    def get_members(self):
        return self._members

    def get_articles(self):
        return self._articles

    def get_shoppinglists(self):
        return self._shoppinglists

    def get_standardarticles(self):
        return self._standardarticles

    def get_amout_of_member(self):
        return len(self._members)

    def get_amout_of_shoppinglists(self):
        return len(self._shoppinglists)

    def get_amout_of_standardarticles(self):
        return len(self._standardarticles)

    def add_member(self, member):
        self._members.append(member)
        member.add_group(self)

    def add_article(self, name):
        article = Article(name, self)
        self._articles.append(article)
        return article

    def add_shoppinglist(self, name, add_standardarticles=False):
        shoppinglist = Shoppinglist(name, self, add_standardarticles)
        self._shoppinglists.append(shoppinglist)
        return shoppinglist

    def add_standardarticle(self, article, amount=1, unit="", purchasing_person=None, retailer=None):
        self._standardarticles.append(ListEntry(self, article, amount, unit, purchasing_person, retailer))

    def delete_member(self, member):
        self._members.remove(member)
        member.delete_group(self)

    def delete_shoppinglist(self, shoppinglist):
        self._shoppinglists.remove(shoppinglist)

    def delete_standardarticle(self, standardarticle):
        self._standardarticles.remove(standardarticle)

    def delete(self):
        """Datenbank-Funktion"""
        pass

    # def search_member(self, email):
    #    for member in self._members:
    #        if member.get_email() == email:
    #            return member
    #    return None

    # def invite_member(self, email):
    #    pass

    # def search_shoppinglist(self, name):
    #    results = []
    #    for shoppinglist in self._shoppinglists:
    #        if name in shoppinglist.get_name()
    #            results.append(shoppinglist)
    #    return results


class Shoppinglist(BasisClass):
    def __init__(self, name, group, add_standardarticles=False):
        """Eine Einkaufsliste ist Teil *einer* Gruppe. Es können Listeinträge eingefügt werden - wahlweise auch
        Standardartikel. Für das UI gibt es Funktionen, um die Anzahl aller/erledigten Einträge einzusehen.

        :param name: Name der Liste
        :param group: Group-Objekt, dem die Liste angehört
        """
        super().__init__(name)
        self._group = group
        self._list_entries = []
        if add_standardarticles:
            self.add_standardarticles()

    def get_group(self):
        return self._group

    def get_list_entries(self):
        return self._list_entries

    def get_list_entries_checked(self):
        list_entries_checked = []
        for eintrag in self._list_entries:
            if eintrag.is_checked():
                list_entries_checked.append(eintrag)
        return list_entries_checked

    def get_amout_of_list_entries(self):
        return len(self._list_entries)

    def get_amout_of_list_entries_checked(self):
        return len(self.get_list_entries_checked())

    def add_list_entry(self, article, amount=1, unit="", purchasing_person=None, retailer=None):
        list_entry = ListEntry(self, article, amount, unit, purchasing_person, retailer)
        self._list_entries.append(list_entry)
        return list_entry

    def add_standardarticles(self):
        for standardarticle in self._group.get_standardarticles():
            article = standardarticle.get_article()
            amount = standardarticle.get_amount()
            unit = standardarticle.get_unit()
            purchasing_person = standardarticle.get_purchasing_person()
            retailer = standardarticle.get_retailer()
            self.add_list_entry(article, amount, unit, purchasing_person, retailer)

    def delete_list_entry(self, list_entry):
        self._list_entries.remove(list_entry)

    def delete(self):
        self._group.delete_shoppinglist(self)


class ListEntry(BasisClass):
    def __init__(self, list, article, amount=1, unit="", purchasing_person=None, retailer=None, standardarticle=False):
        """Ein Listeneintrag ist ein Eintrag in der Einkaufsliste, der sämtliche Informationen zum Artikel und der
        Zuordnung enthält. Ein Listeneintrag kann auch ein "Standardartikel" sein.

        :param list: List-Objekt, das den Eintrag beinhaltet
        :param article: Artikel-Objekt, Artikel des Eintrags
        :param amount: Anzahl des Artikels
        :param unit: Einheit des Artikels
        :param purchasing_person: Person-Objekt, das den Einkauf tätigen soll
        :param retailer: Retailer-Objekt, in dem der Artikel gekauft werden soll
        :param standardarticle: Angabe, ob es sich um einen Standardartikel handelt odern icht
        """
        super().__init__()
        self._list = list
        self._article = article
        self._amount = amount
        self._unit = unit
        self._retailer = retailer
        self._purchasing_person = purchasing_person
        self._checked = False
        self._standardarticle = standardarticle

    def __str__(self):
        return "- {}: {} {}, Beauftragt: {}, Ort: {}, Erledigt: {}".format(self._article.get_name(), self._amount,
                                                                           self._unit,
                                                                           self._purchasing_person.get_name(),
                                                                           self._retailer.get_name(), self._checked)

    def get_article(self):
        return self._article

    def get_amount(self):
        return self._amount

    def get_unit(self):
        return self._unit

    def get_purchasing_person(self):
        return self._purchasing_person

    def get_retailer(self):
        return self._retailer

    def set_article(self, article):
        self._article = article

    def set_amount(self, amount):
        self._amount = amount

    def set_unit(self, unit):
        self._unit = unit

    def set_purchasing_person(self, purchasing_person):
        self._purchasing_person = purchasing_person

    def set_retailer(self, retailer):
        self._retailer = retailer

    def check(self):
        self._checked = True

    def is_checked(self):
        return self._checked

    def is_standardarticle(self):
        return self._standardarticle

    def delete(self):
        self._list.delete_list_entry(self)


class Retailer(BasisClass):
    def __init__(self, name):
        """Einkaufsstelle, die später in einem Listeneintrag referenziert wird

        :param name: Name der Einkaufsstelle
        """
        super().__init__(name)


class Person(BasisClass):
    def __init__(self, name, email):
        """Person, die auf dem Portal angemeldet ist.

        :param name: Anzeigename
        :param email: Mail des Google-Accounts
        """
        super().__init__(name)
        self._email = email
        self._groups = []

    def get_email(self):
        return self._email

    def get_groups(self):
        return self._groups

    def add_group(self, group):
        self._groups.append(group)

    def leave_group(self, group):
        group.delete_person(self)
        self._groups.remove(group)

    def create_group(self, name):
        group = Group(name, self)
        group.add_member(self)
        self._groups.append(group)
        return group

    def delete(self):
        for group in self._groups:
            group.delete_person(self)

    # def set_email(self, email):
    #    pass


class User(Person):
    def __init__(self, name, email):
        super().__init__(name, email)


# Familie
vater = Person("Michael", "michael@gmail.com")
mutter = Person("Iris", "iris@gmail.com")
kind1 = Person("Tim", "tim@gmail.com")
kind2 = Person("Pia", "pia@gmail.com")

# Einkaufsstätten der Umgebung
baecker = Retailer("Bäckerei Hofmann")
edeka = Retailer("Edeka Heimsheim")
aldi = Retailer("Aldi Rutesheim")

# Vater erstellt für die Familie eine Einkaufsliste und fügt die restlichen Gruppenmitglieder hinzu
familie = vater.create_group("Familie")
familie.add_member(mutter)
familie.add_member(kind1)
familie.add_member(kind2)
print("Gruppe:", familie.get_name())
print("Teilnehmer:", ", ".join([person.get_name() for person in familie.get_members()]))

# Die Familie braucht jede Woche Brot und Milch, wofür sie Standardartikel anlegen
brot = familie.add_article("Brot")
milch = familie.add_article("Milch")
familie.add_standardarticle(article=brot, amount=3, unit="Stk", purchasing_person=vater, retailer=baecker)
familie.add_standardarticle(article=milch, amount=500, unit="ml", purchasing_person=vater, retailer=aldi)
print("Standardartikel:", ", ".join([article.get_article().get_name() for article in familie.get_standardarticles()]))

# Für die Wocheneinkäufe und die anstehende Neujahrsparty werden Einkaufslisten erstellt
# den Wocheneinkäufen werden die Standardartikel angefügt
wocheneinkauf = familie.add_shoppinglist(name="Wocheneinkauf", add_standardarticles=True)
silvesterparty = familie.add_shoppinglist("Silvesterparty")

# An Silvester möchte die Familie Pizza machen und benötigt dazu noch Mehl und Tomaten
mehl = familie.add_article("Mehl")
tomaten = familie.add_article("Tomaten")
silvesterparty.add_list_entry(article=mehl, amount=2, unit="kg", purchasing_person=vater, retailer=edeka)
silvesterparty.add_list_entry(article=tomaten, amount=6, unit="Stk", purchasing_person=vater, retailer=edeka)
print("Gespeicherte Artikel der Familie:", ", ".join([article.get_name() for article in familie.get_articles()]))
print("")
print("Einkaufslisten der Familie")
for shoppinglist in familie.get_shoppinglists():
    print(shoppinglist)
    for list_entry in shoppinglist.get_list_entries():
        print(list_entry)

# Der Vater geht einkaufen und bekommt alles, bis auf die Tomaten
print("")
print("Vor dem Einkauf:")
print("Wocheneinkauf {}/{} erledigt".format(wocheneinkauf.get_amout_of_list_entries_checked(),
                                            wocheneinkauf.get_amout_of_list_entries()))
print("Silvesterparty {}/{} erledigt".format(silvesterparty.get_amout_of_list_entries_checked(),
                                             silvesterparty.get_amout_of_list_entries()))
for list_entry in wocheneinkauf.get_list_entries():
    list_entry.check()
for list_entry in silvesterparty.get_list_entries():
    if list_entry.get_article().get_name() != "Tomaten":
        list_entry.check()
print("")
print("Nach dem Einkauf:")
print("Wocheneinkauf {}/{} erledigt".format(wocheneinkauf.get_amout_of_list_entries_checked(),
                                            wocheneinkauf.get_amout_of_list_entries()))
print("Silvesterparty {}/{} erledigt".format(silvesterparty.get_amout_of_list_entries_checked(),
                                             silvesterparty.get_amout_of_list_entries()))
