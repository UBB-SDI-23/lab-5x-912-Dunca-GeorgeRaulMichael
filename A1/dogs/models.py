from django.db import models
from django.db.models import UniqueConstraint


class Dog(models.Model):
    name=models.CharField(max_length=50)
    breed=models.CharField(max_length=100)
    colour= models.CharField(max_length=50)
    is_healthy=models.BooleanField()
    date_of_birth=models.DateField()
    #owners = models.ManyToManyField('Owner', through='DogOwner')

    def __str__(self):
        return f"{self.name} {self.breed}"

class Toy(models.Model):
    name=models.CharField(max_length=50)
    material=models.CharField(max_length=100)
    colour= models.CharField(max_length=50)
    price=models.IntegerField()
    dog=models.ForeignKey(Dog,on_delete=models.CASCADE,related_name='toys')
    def __str__(self):
        return f"{self.name}"

class Owner(models.Model):
    first_name=models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email=models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    dogs_m2m=models.ManyToManyField(Dog,through='DogOwner')
    def __str__(self):
        return f"{self.first_name}"

class DogOwner(models.Model):
    dog=models.ForeignKey(Dog,on_delete=models.CASCADE,related_name='owners')
    owner=models.ForeignKey(Owner,on_delete=models.CASCADE,related_name='dogs')
    adoption_date=models.DateField()
    adoption_fee=models.IntegerField()

    #class Meta:
    #    unique_together = (('dog', 'owner'),)


