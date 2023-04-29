from django.contrib.auth.models import User
from django.http import Http404
from drf_spectacular.utils import extend_schema
from rest_framework import status

from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Avg, Count
from rest_framework_simplejwt.views import TokenObtainPairView

from dogs.models import Owner, UserProfile
from dogs.serializers import UserRegistationSerializer, UserProfileSerializer


class RegistrationView(APIView):
    permission_classes = [AllowAny]
    @extend_schema(request=None,responses=UserRegistationSerializer)
    def post(self,request):
        serializer = UserRegistationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            #user=serializer.save()
            #UserProfile.objects.create(user_id=user.id)
            return Response({"Message": "User created successfully",
                "User":
                serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class LoginView(TokenObtainPairView):
#     permission_classes = [AllowAny]

class UserDetails(APIView):
    def get_object(self, id):
        try:
            return  UserProfile.objects.get(user_id=id)
        except UserProfile.DoesNotExist:
            raise Http404
    @extend_schema(request=None, responses=UserProfileSerializer)
    def get(self, request,id):
        user = self.get_object(id)
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
