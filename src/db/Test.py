from bo.User import User
from db.UserMapper import UserMapper
from ListAdministration import Administration
from db.UserGroupRelationsMapper import UserGroupRelationsMapper

"""user1 = User()

user1.set_name("Dominik")
user1.set_google_id(123)
user1.set_email("D@gmx.de")
user1.set_id(36)
print(user1)

with UserMapper() as mapper:
    result = mapper.delete(user1)
"""

adm = Administration()

User1 = adm.get_user_by_id(29)
User2 = adm.get_user_by_id(30)
User3 = adm.get_user_by_id(31)
Gruppe3 = adm.get_group_by_id(1)
Gruppe4 = adm.get_group_by_id(3)
Gruppe5 = adm.get_group_by_id(2)

"""print(Gruppe5)
Gruppe5.set_owner(29)
print(Gruppe5)
adm.save_group(Gruppe5)
print(Gruppe5)"""

print(User1.to_dict(User1))
print(User2.to_dict(User2))
print(User3.to_dict(User3))
print(Gruppe3.to_dict(Gruppe3))
print(Gruppe4.to_dict(Gruppe4))
print(Gruppe5.to_dict(Gruppe5))

"""with UserGroupRelationsMapper() as mapper:
    result = mapper.add_user_to_group(Gruppe5, User1)
"""
