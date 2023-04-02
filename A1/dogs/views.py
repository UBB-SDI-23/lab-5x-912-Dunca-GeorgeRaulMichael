from django.db.models import Avg, Count
from django.http import Http404
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .models import Dog, Owner, DogOwner
from .models import Toy
from .serializers import ToySerializer, ToySerializerDetails, DogsSerializerDetails, OwnerSerializer, \
    DogOwnerSerializer, OwnerSerializerDetails
from .serializers import DogsSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.filters import SearchFilter,OrderingFilter


# get all the dogs
# serialize them
# return response

class DogsList(APIView):

    @extend_schema(request=None,responses=DogsSerializer)
    def get(self,request):
        dogs = Dog.objects.all()
        serializer = DogsSerializer(dogs, many=True)
        return Response(serializer.data)

    @extend_schema(request=None,responses=DogsSerializer)
    def post(self,request):
        serializer = DogsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DogsDetails(APIView):
    def get_object(self,id):
        try:
         return Dog.objects.get(pk=id)
        except Dog.DoesNotExist:
            raise Http404

    @extend_schema(request=None,responses=DogsSerializerDetails)
    def get(self,request,id):
        dog=self.get_object(id)

        #toys=Toy.objects.filter(dogs=dog)
        serializer = DogsSerializerDetails(dog)

        return Response(serializer.data)

    @extend_schema(request=None,responses=DogsSerializerDetails)
    def put(self,request,id):
        dog = self.get_object(id)
        serializer = DogsSerializer(dog, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(request=None,responses=DogsSerializerDetails)
    def delete(self,request,id):
        dog = self.get_object(id)
        dog.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




class ToysList(APIView):
    @extend_schema(request=None,responses=ToySerializer)
    def get(self,request):
        toys = Toy.objects.all()
        price = self.request.query_params.get('price')
        if price is not None:
            toys = toys.filter(price__gt=price)
        serializer = ToySerializer(toys, many=True)

        return Response(serializer.data)

    @extend_schema(request=None,responses=ToySerializer)
    def post(self,request):
        serializer = ToySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class ToysDetails(APIView):
    def get_object(self, id):
        try:
            return  Toy.objects.get(pk=id)
        except Toy.DoesNotExist:
            raise Http404

    @extend_schema(request=None,responses=ToySerializerDetails)
    def get(self,request,id):
        toy=self.get_object(id)
        serializer = ToySerializerDetails(toy)
        return Response(serializer.data)

    @extend_schema(request=None,responses=ToySerializerDetails)
    def put(self,request,id):
        toy = self.get_object(id)
        serializer = ToySerializer(toy, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(request=None,responses=ToySerializerDetails)
    def delete(self, request, id):
        toy = self.get_object(id)
        toy.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OwnersList(APIView):
    @extend_schema(request=None,responses=OwnerSerializer)
    def get(self,request):
        owners = Owner.objects.all()
        serializer = OwnerSerializer(owners, many=True)
        return Response(serializer.data)

    @extend_schema(request=None,responses=OwnerSerializer)
    def post(self,request):
        serializer = OwnerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OwnersDetails(APIView):
    def get_object(self, id):
        try:
            return  Owner.objects.get(pk=id)
        except Owner.DoesNotExist:
            raise Http404

    @extend_schema(request=None,responses=OwnerSerializerDetails)
    def get(self,request,id):
        owner=self.get_object(id)
        serializer = OwnerSerializerDetails(owner)
        return Response(serializer.data)

    @extend_schema(request=None,responses=OwnerSerializerDetails)
    def put(self,request,id):
        owner = self.get_object(id)
        serializer = OwnerSerializer(owner, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(request=None,responses=OwnerSerializerDetails)
    def delete(self, request, id):
        owner = self.get_object(id)
        owner.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DogOwnersList(APIView):

    @extend_schema(request=None,responses=DogOwnerSerializer)
    def get(self,request):
        dogowners = DogOwner.objects.all()
        serializer = DogOwnerSerializer(dogowners, many=True)
        return Response(serializer.data)

    @extend_schema(request=None,responses=DogOwnerSerializer)
    def post(self,request):
        serializer = DogOwnerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class DogOwnersDetails(APIView):

    def get_object(self,id_dog,id_owner):
        try:
            return  DogOwner.objects.get(dog=id_dog,owner=id_owner)
        except Owner.DoesNotExist:
            raise Http404

    @extend_schema(request=None,responses=DogOwnerSerializer)
    def get(self,request, id_dog,id_owner):
        dogowner = self.get_object(id_dog,id_owner)
        serializer = DogOwnerSerializer(dogowner)
        return Response(serializer.data)

    @extend_schema(request=None,responses=DogOwnerSerializer)
    def put(self, request, id_dog,id_owner):
        dogowner = self.get_object(id_dog,id_owner)
        serializer = DogOwnerSerializer(dogowner, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(request=None,responses=DogOwnerSerializer)
    def delete(self, request, id_dog,id_owner):
        dogowner = self.get_object(id_dog,id_owner)
        dogowner.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DogsOrderedByToyPrice(APIView):

    @extend_schema(request=None,responses=DogsSerializer)
    def get(self,request):
        dogs = Dog.objects.annotate(avg_price=Avg('toys__price')).order_by('avg_price')
        serializer = DogsSerializer(dogs, many=True)

        return Response(serializer.data)


class DogsOrderedByToysPossessed(APIView):

    @extend_schema(request=None,responses=DogsSerializer)
    def get(self,request):
       #owners=Owner.objects.annotate(cnt=Count('dogs')-1)
        dogs=Dog.objects.annotate(nr_of_owners=Count('owners')).order_by('nr_of_owners')
        serializer = DogsSerializer(dogs, many=True)

        return Response(serializer.data)

class BulkAddOwnerstoDog(APIView):

    @extend_schema(request=None,responses=DogOwnerSerializer)
    def post(self, request, dog_id):
        # Retrieve the author with the specified ID
        dog = Dog.objects.get(id=dog_id)

        # Deserialize the data in the request body into a list of new books
        serializer = DogOwnerSerializer(data=request.data, many=True)
        #print(request.data)
        for i in request.data:
            i['dog']=dog_id
        #print(request.data)
        serializer.is_valid(raise_exception=True)


        new_owners = serializer.save()

        dog.owners.add(*new_owners)
        return Response(serializer.data)

