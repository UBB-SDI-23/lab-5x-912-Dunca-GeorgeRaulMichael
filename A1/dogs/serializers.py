import re
from datetime import date


from rest_framework import serializers
from .models import Dog, Owner, DogOwner
from .models import Toy


#python -> json

class DogsSerializer(serializers.ModelSerializer):
    avg_price = serializers.FloatField(read_only=True)
    nr_of_owners = serializers.IntegerField(read_only=True)
    class Meta:
        model=Dog
        fields=['id','name','breed','colour','is_healthy','date_of_birth','avg_price','nr_of_owners']

    def validate_date_of_birth(self, value):
        min_date = date(2010, 1, 1)
        if value < min_date:
            raise serializers.ValidationError(f"The date_of_birth must be higher than {min_date}!")
        return value
    def validate_name(self, value):

        if len(value)<=2:
            raise serializers.ValidationError(f"The name must have at least 3 characters!")
        return value

class ToySerializer(serializers.ModelSerializer):
    nr_of_toys = serializers.IntegerField(read_only=True)
    class Meta:
        model=Toy
        fields=['id','name','dog','material','colour','price','descriptions','nr_of_toys']

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be greater than zero.")
        return value

class OwnerSerializer(serializers.ModelSerializer):
    nr_of_dogs = serializers.IntegerField(read_only=True)
    class Meta:
        model=Owner
        fields=['id','first_name','last_name','email','city','date_of_birth','nr_of_dogs']

    def validate_date_of_birth(self, value):
        max_date = date(2016, 1, 1)
        if value > max_date:
            raise serializers.ValidationError(f"The date_of_birth must be lower than {max_date}.")
        return value

    def validate_email(self, value):
        # Define the regular expression pattern
        pattern = r"^.+@.+\..+$"


        # Use the re module to check if the string matches the pattern
        if not re.match(pattern, value):
            raise serializers.ValidationError(f"The email must be a valid one!")
        return value

class DogOwnerSerializer(serializers.ModelSerializer):
    dog = serializers.PrimaryKeyRelatedField(queryset=Dog.objects.all())
    owner = serializers.PrimaryKeyRelatedField(queryset=Owner.objects.all())
    class Meta:
        model = DogOwner
        fields = ['dog', 'owner','adoption_date','adoption_fee']
        #depth=1



class DogOwnerSerializerForDogs(serializers.ModelSerializer):
    owner=OwnerSerializer(read_only=True)
    #dog=DogsSerializer(read_only=True)
    class Meta:
        model = DogOwner
        fields = [ 'owner','adoption_date','adoption_fee']
        #depth=1

class DogOwnerSerializerForOwners(serializers.ModelSerializer):
    #owner=OwnerSerializer(read_only=True)
    dog=DogsSerializer(read_only=True)
    class Meta:
        model = DogOwner
        fields = [ 'dog','adoption_date','adoption_fee']
        #depth=1

class DogsSerializerDetails(serializers.ModelSerializer):
    toys=ToySerializer(many=True)
    owners=DogOwnerSerializerForDogs(many=True)
    class Meta:
        model=Dog
        fields=['id','name','breed','colour','is_healthy','date_of_birth','toys','owners']

    def validate_date_of_birth(self, value):
        min_date = date(2010, 1, 1)
        if value < min_date:
            raise serializers.ValidationError(f"The date_of_birth must be higher than {min_date}.")
        return value

    def validate_name(self, value):

        if len(value)<=2:
            raise serializers.ValidationError(f"The name must have at least 3 characters!")
        return value

class ToySerializerDetails(serializers.ModelSerializer):
    class Meta:
        model=Toy
        fields=['id','name','dog','material','colour','price','descriptions']
        depth=1

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be greater than zero.")
        return value



class OwnerSerializerDetails(serializers.ModelSerializer):
    dogs=DogOwnerSerializerForOwners(many=True)
    class Meta:
        model = Owner
        fields=['id','first_name','last_name','email','city','date_of_birth','dogs']

    def validate_date_of_birth(self, value):
        max_date = date(2016, 1, 1)
        if value > max_date:
            raise serializers.ValidationError(f"The date_of_birth must be lower than {max_date}.")
        return value

    def validate_email(self, value):
        # Define the regular expression pattern
        pattern = r"^.+@.+\..+$"

        # Use the re module to check if the string matches the pattern
        if not re.match(pattern, value):
            raise serializers.ValidationError(f"The email must be a valid one!")
        return value

class DogOwnersSerializerDetails(serializers.ModelSerializer):
    dog=DogsSerializer()
    owner=OwnerSerializer()
    class Meta:
        model = DogOwner
        fields = ['dog', 'owner', 'adoption_date', 'adoption_fee']

