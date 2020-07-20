from bo.BusinessObject import BusinessObject

class Retailer(BusinessObject):
    def __init__(self):
        """Einkaufsstelle, die später in einem Listeneintrag
        referenziert wird."""

        super().__init__()
        self._count = 0

    def __str__(self):
        return "Retailer: {} {}, created: {}, " \
               "last changed: {}".format(self.get_id(),
                                         self.get_name(),
                                         self.get_creation_date(),
                                         self.get_last_updated())

    def get_count(self):
        return self._count

    def set_count(self, count):
        self._count = count

    @staticmethod
    def from_dict(dictionary=dict()):
        retailer = Retailer()
        retailer.set_id(dictionary["id"])
        retailer.set_name(dictionary["name"])
        retailer.set_count(dictionary["count"])
        return retailer

    @staticmethod
    def from_tuples(tuples=list()):
        result = []
        for (retailer_id, name, creation_date, last_update) in tuples:
            retailer = Retailer()
            retailer.set_id(retailer_id)
            retailer.set_name(name)
            retailer.set_creation_date(creation_date)
            retailer.set_last_updated(last_update)
            result.append(retailer)
        return result