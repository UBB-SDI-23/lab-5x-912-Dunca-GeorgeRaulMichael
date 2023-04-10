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

        sql = f"ALTER TABLE dogs_dogowner DROP CONSTRAINT dogs_dogowner_dog_id_2fb6aa21_fk_dogs_dog_id;"
        file.write(sql + "\n")

        sql = f"ALTER TABLE dogs_dogowner DROP CONSTRAINT dogs_dogowner_owner_id_740a195f_fk_dogs_owner_id;"
        file.write(sql + "\n")

        sql = f"ALTER TABLE dogs_dogowner DROP CONSTRAINT dogs_toy_dog_id_a028f4a6_fk_dogs_dog_id;"
        file.write(sql + "\n")

        sql = f"DROP INDEX toy_price_idx;"
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

        print("Dogs done")

        for i in range(0, 1000000, 1000):
            data = []
            for j in range(i, i + 1000):
                toy_name=random.choice(toy_names)
                toy_material=random.choice(toy_materials)
                toy_colour=fake.color_name()
                toy_price=fake.random_int(min=1,max=1000)
                toy_dog=fake.random_int(min=1, max=1000000)
                text = fake.text(max_nb_chars=800)
                words = text.split(' ')
                if len(words) > 100:
                    words = words[:100]
                toy_description=' '.join(words)
                data.append(f"('{toy_name}', '{toy_material}', '{toy_colour}', '{toy_price}', '{toy_description}', '{toy_dog}')")
            sql = f"INSERT INTO dogs_toy (name, material, colour,price,descriptions,dog_id) VALUES {','.join(data)};"
            file.write(sql + "\n")

        print("Toys done")
        for i in range(0, 1000000, 1000):
            data=[]

            for j in range(i, i+1000):
                owner_first_name=fake.first_name()
                owner_last_name=fake.last_name()
                owner_email=fake.email()
                owner_city=fake.city()
                owner_date_of_birth=fake.date_of_birth(minimum_age =9)
                data.append(f"('{owner_first_name}', '{owner_last_name}', '{owner_email}', '{owner_city}', '{owner_date_of_birth}')")
            sql = f"INSERT INTO dogs_owner (first_name, last_name, email, city, date_of_birth) VALUES {','.join(data)};"
            file.write(sql + "\n")

        print("Owners done")

        pairs=set()
        nr=10000000

        for i in range(10000):
            if (i % 1000 == 0):
                print(f'Generated {i * 10000} records')

            dogowner_dog=fake.random_int(min=i * 100 + 1, max=(i + 1) * 100)
            data=[]
            for j in range(1000):
                dogowner_owner = fake.random_int(min=j * 1000 + 1, max=(j + 1) * 1000)

                dogowner_adoption_date = fake.date_between(start_date=dog_date_of_birth, end_date='today')
                dogowner_adoption_fee = fake.random_int(min=1,max=10000)
                data.append(f"('{dogowner_dog}', '{dogowner_owner}', '{dogowner_adoption_date}', '{dogowner_adoption_fee}')")

            sql = f"INSERT INTO dogs_dogowner (dog_id, owner_id, adoption_date, adoption_fee) VALUES {','.join(data)};"
            file.write(sql + "\n")

        sql = f"ALTER TABLE dogs_toy ADD CONSTRAINT dogs_toy_dog_id_a028f4a6_fk_dogs_dog_id FOREIGN KEY(dog_id) REFERENCES dogs_dog(id);"
        file.write(sql + "\n")

        sql = f"ALTER TABLE dogs_dogowner ADD CONSTRAINT dogs_dogowner_dog_id_2fb6aa21_fk_dogs_dog_id FOREIGN KEY(dog_id) REFERENCES dogs_dog(id);"
        file.write(sql + "\n")

        sql = f"ALTER TABLE dogs_dogowner ADD CONSTRAINT dogs_dogowner_owner_id_740a195f_fk_dogs_owner_id FOREIGN KEY(owner_id) REFERENCES dogs_owner(id);"
        file.write(sql + "\n")

        sql = f"CREATE INDEX toy_price_idx ON dogs_toy(price);"
        file.write(sql + "\n")