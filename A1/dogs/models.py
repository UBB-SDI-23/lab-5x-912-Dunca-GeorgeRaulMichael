from django.contrib.auth.models import AbstractUser, User
from django.db import models
from django.db.models import UniqueConstraint
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser


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
    descriptions=models.CharField(max_length=10000,default="Default Description")
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


# class CustomUserManager(BaseUserManager):
#     def create_user(self,uame,passwd,**extra_fields):
#
#
#         user=self.model(
#             username=uame,
#             **extra_fields
#         )
#         user.set_password(passwd)
#         user.save()
#
#         return user
#     def create_superuser(self,uname,passwd,**extra_fields):
#         extra_fields.setdefault("is_staff",True)
#         extra_fields.setdefault("is_superuser",True)
#
#         if extra_fields.get("is_staff") is not True:
#             raise ValueError("Superuser has to have is_staff being True")
#         if extra_fields.get("is_superuser") is not True:
#             raise ValueError("Superuser has to have is_superuser being True")
#         return self.create_user(uname,passwd,**extra_fields)
#
#
# class User(AbstractUser):
#     username = models.CharField(max_length=50,unique=True)
#     objects = CustomUserManager()
#
#     USERNAME_FIELD = username
#     REQUIRED_FIELDS = ['username']
#
#     def __str__(self):
#         return self.username

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password, **extra_fields):
        """
        Creates and saves a User with the given username and password.
        """
        if not username:
            raise ValueError('The Username field must be set')

        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        print(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given username and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, password, **extra_fields)
# class User(AbstractBaseUser):
#     username=models.CharField(max_length=50)
#     password=models.CharField(max_length=50)
#     USERNAME_FIELD = 'username'
#     REQUIRED_FIELDS = ['username','password']
#     objects = CustomUserManager()
class UserProfile(models.Model):
    #user = models.OneToOneField(User, on_delete=models.CASCADE,default=None)
    bio=models.CharField(max_length=10000)
    birthday=models.DateField(null=True)
    email=models.CharField(max_length=50)
    country=models.CharField(max_length=50)
    gender=models.CharField(max_length=50)