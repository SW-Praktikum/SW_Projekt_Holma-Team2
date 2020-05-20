# Python PEP8 Cheatsheet

_Hinweis: Es gibt oftmals nicht nur eine richtige Lösung, dennoch sollten wir einheitlich arbeiten. Ich schreibe das mal jetzt so, wir können das aber immer noch anpassen. Quelle: https://www.python.org/dev/peps/pep-0008_

## Layout
(Tendenziell eher nebensächlich) In pyCharm gibt es eine Funktion, die Python-Dateien automatisch an das PEP8-Layout anpasst: `Rechtsklick auf Datei > Reformat Code > Optimize Imports & Cleanup Code`
```python
# ....................................................................|......|
""" Maximal 79 Zeichen pro Zeile!
Die Länge von Docstrings oder Kommentaren sollte eine Zeile nicht mehr 
als 72 Zeichen enthalten """

# Ein Import pro Zeile, jedoch können mehrere Funktionen eines Moduls
# in einer Zeile importiert werden
import os
import re

from requests import Session, Request

# Zwei Zeilen Abstand zwischen Top-Level-Funktionen und Klassen
var = False


def top_level_funktion(top, level):
    """Docstring-Titel immer direkt in der ersten Zeile
        
    :param top: Beschreibung des Parameters "top"
    :param level: Beschreibung des Parameters "level"
    :return: Beschreibung des Ergebnisses der Funktion
    """
    return top + level

# Eine Zeile Abstand zwischen Funktionen in Klassen
class Klasse(object):
    def __init__(self):
        pass

    def klassen_funktion(self):
        pass
```

## Naming

**Variablen** und **Parameter** sollten **eindeutig** und ausreichend **verständlich** benannt werden. 

```python
# Variablen klein und getrennt
pi_gerundet = 3.14
radius = 100


# Funktionsnamen klein und getrennt
# Funktionsparameter klein und getrennt (wenn nötig)
def kreisumfang_berechnen(pi, r):
    return 2 * pi * r


# Klassen in CamelCase
class DasIstEineKlasse(object):
    def __init__(self):
        # lokale Variablen
        lokal = "Variable nur innerhalb der Funktion aufrufbar"
        # öffentliche Variablen
        self.der = "Inhalt dieser Variablen ist öffentlich"
        # vererbbare Variablen
        self._die = "Variable ist vererbbar"
        # private Variablen
        self.__das = "Variable nur innerhalb der Klasseninstanz"

    @classmethod
    def bsp_klassenmethode(cls):
        pass

```
 
## Sonstiges
```python
# Anführungsstriche: " sind meist leserlicher als '
print("Hello World!") 

# Formattierungs-Strings
s1 = "{} World!".format("Hello")

# Bei mehrfacher Verwendung eines Parameters: Benennung der Parameters
# durch eindeutige, verständliche Vereinfachung
s2 = "{h} {w}! This {w} is beautiful!".format(h="Hello", w="World")
```