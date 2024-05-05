import random


def generateRandomReasons(longitud):
    # Definir las opciones como strings
    opciones = ["ocio", "cultural", "familiar"]

    # Definir pesos para cada opción
    # Por ejemplo, el ocio tiene un 50% de probabilidad, cultural un 30%, y familiar un 20%
    pesos = [0.5, 0.3, 0.2]  # La suma de todos los pesos debe ser 1.0 o proporcional

    # Generar una lista aleatoria de 10 elementos usando los pesos definidos
    lista_aleatoria = random.choices(opciones, pesos, k=longitud)

    return lista_aleatoria

    print("Lista aleatoria con valores de ocio, cultural y familiar:")
    print(lista_aleatoria)