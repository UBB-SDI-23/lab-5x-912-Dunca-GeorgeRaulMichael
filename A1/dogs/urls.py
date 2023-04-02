"""dogs URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from drf_spectacular.views import SpectacularAPIView,SpectacularSwaggerView

from dogs import  views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('dogs/',views.DogsList.as_view()),
    path('dogs/<int:id>',views.DogsDetails.as_view()),
    path('toys/', views.ToysList.as_view()),
    path('toys/<int:id>', views.ToysDetails.as_view()),
    path('owners/', views.OwnersList.as_view()),
    path('owners/<int:id>', views.OwnersDetails.as_view()),
    path('dogowners/', views.DogOwnersList.as_view()),
    path('dogs/<int:dog_id>/owners',views.BulkAddOwnerstoDog.as_view()),
    path('dogowners/<int:id_dog>/<int:id_owner>', views.DogOwnersDetails.as_view()),
    path('dogs/avg-by-toy-price', views.DogsOrderedByToyPrice.as_view()),
    path('dogs/nr-of-owners', views.DogsOrderedByToysPossessed.as_view()),
    path('api/schema/', SpectacularAPIView.as_view(),name="schema"),
    path('api/schema/docs/',SpectacularSwaggerView.as_view(url_name="schema")),
]



