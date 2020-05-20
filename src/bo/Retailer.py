from bo.BusinessObject import BusinessObject

class Retailer(BusinessObject):
    def __init__(self):
        """Einkaufsstelle, die später in einem Listeneintrag referenziert wird."""
        super().__init__()

    def from_dict(self, dictionary=dict()):
        retailer = Retailer()
        retailer.set_id(dictionary["id"])
        retailer.set_name(dictionary["name"])
        return retailer