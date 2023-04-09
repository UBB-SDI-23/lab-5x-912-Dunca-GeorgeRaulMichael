import os
import random
from datetime import date, timedelta

import django


#os.environ.setdefault('DEFAULT_SETTINGS_MODULE','dogs.settings')

#django.setup()


#from dogs.models import Dog
from faker.providers import date_time
from psycopg2._psycopg import cursor
from psycopg2.extras import execute_values

if __name__=='__main__':
    from faker import Faker

    fake = Faker()
    fake.add_provider(date_time)
    dog_breeds = ['Labrador', 'Corgi', 'Golden Retriever', 'French Bulldog', 'Bulldog', 'Poodle',
                  'Beagle', 'Rottweiler', 'Pug', 'Boxer','Shiba Inu','Husky','Chihuahua','Dalmatian']

    toy_names = ['Ball', 'Disc', 'Rope', 'Bone', 'Chicken', 'Teddy bear']
    toy_materials = ['Plastic', 'Wood', 'Metal', 'Fabric', 'Leather', 'Fur','Rubber']

    batch_size = 1000
    with open('dogs.sql', 'w') as file:

        sql = f"TRUNCATE TABLE dogs_dogowner RESTART IDENTITY CASCADE;"
        file.write(sql + "\n")
        sql = f"TRUNCATE TABLE dogs_owner RESTART IDENTITY CASCADE;"
        file.write(sql + "\n")
        sql = f"TRUNCATE TABLE dogs_dog RESTART IDENTITY CASCADE;"
        file.write(sql + "\n")
        sql = f"TRUNCATE TABLE dogs_toy RESTART IDENTITY CASCADE;"
        file.write(sql + "\n")

        for i in range(0, 1000000, 1000):
            data = []
            for j in range(i, i + 1000):
                dog_name = fake.first_name()
                dog_breed = random.choice(dog_breeds)
                dog_color = fake.color_name()
                dog_is_healthy=random.choice([True, False])
                dog_date_of_birth = fake.date_between(start_date='-12y', end_date='today')
                data.append(f"('{dog_name}', '{dog_breed}', '{dog_color}', '{dog_is_healthy}', '{dog_date_of_birth}')")
            sql = f"INSERT INTO dogs_dog (name, breed, colour,is_healthy,date_of_birth) VALUES {','.join(data)};"
            file.write(sql + "\n")

        for i in range(0, 1000000, 1000):
            data = []
            for j in range(i, i + 1000):
                toy_name=random.choice(toy_names)
                toy_material=random.choice(toy_materials)
                toy_colour=fake.color_name()
                toy_price=fake.random_int(min=1,max=1000)
                toy_dog=fake.random_int(min=1, max=1000000)
                data.append(f"('{toy_name}', '{toy_material}', '{toy_colour}', '{toy_price}', '{toy_dog}')")
            sql = f"INSERT INTO dogs_toy (name, material, colour,price,dog_id) VALUES {','.join(data)};"
            file.write(sql + "\n")


        for i in range(0, 1000000, 1000):
            data=[]
            for j in range(i, i+1000):
                owner_first_name=fake.first_name()
                owner_last_name=fake.last_name()
                owner_email=fake.email()
                owner_city=fake.city()
                owner_date_of_birth=fake.date_of_birth(minimum_age=9)
                data.append(f"('{owner_first_name}', '{owner_last_name}', '{owner_email}', '{owner_city}', '{owner_date_of_birth}')")
            sql = f"INSERT INTO dogs_owner (first_name, last_name, email, city, date_of_birth) VALUES {','.join(data)};"
            file.write(sql + "\n")

        dog_ids = list(range(1, 1000001))
        owners_ids = list(range(1, 1000001))
        random.shuffle(dog_ids)
        random.shuffle(owners_ids)

        pairs=set()
        nr=10000000

        while nr>0:
            data=[]
            for i in range(batch_size):
                dogowner_dog= fake.random_int(min=1, max=1000000)
                dogowner_owner = fake.random_int(min=1, max=1000000)
                if (dogowner_dog,dogowner_owner) not in pairs:
                    pairs.add((dogowner_dog,dogowner_owner))
                    nr-=1
                    dogowner_adoption_date = fake.date_between(start_date=dog_date_of_birth, end_date='today')
                    dogowner_adoption_fee = fake.random_int(min=1,max=10000)
                    data.append(f"('{dogowner_dog}', '{dogowner_owner}', '{dogowner_adoption_date}', '{dogowner_adoption_fee}')")
            sql = f"INSERT INTO dogs_dogowner (dog_id, owner_id, adoption_date, adoption_fee) VALUES {','.join(data)};"
            file.write(sql + "\n")


        sql = f"CREATE INDEX toy_price_idx ON dogs_toy(price);"
        file.write(sql + "\n")