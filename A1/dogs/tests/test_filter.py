import json
import random
from unittest import TestCase, mock
from unittest.mock import MagicMock, patch

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.test import APITestCase, APIClient, APIRequestFactory
from rest_framework import status
from dogs.models import Dog, Toy
from dogs.serializers import DogsSerializer, ToySerializer
from dogs.views import ToysList




class FilterTest(APITestCase):

    @classmethod
    def setUpTestData(self):
        dog1=Dog.objects.create(name='Rex',breed='Pug',colour='Brown',is_healthy='True',date_of_birth='2020-07-15')
        number_of_toys = 30
        self.nr=0
        self.expected_data=[]
        for toy_id in range(number_of_toys):
            price=random.randint(5,50);
            toy=Toy.objects.create(name=f"Ball_{toy_id}",material='Rubber',colour='Red',dog=dog1,price=price)
            if price>10:
                self.nr+=1
                self.expected_data.append(toy)


    def test_count_correctly_returned(self):
        response = self.client.get("/toys/?price=10")
        expected_data_json = ToySerializer(self.expected_data, many=True).data
        self.assertEqual(len(response.data),self.nr)
        self.assertEqual(response.data, expected_data_json)


